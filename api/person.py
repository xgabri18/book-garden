from flask_restful import Resource
from flask import jsonify,request,session
from shared_db import db

from models.models import Person

class PersonResource(Resource):

    # TODO k tomuto treba debatu (profil alebo jak?/ admin?)
    def get(self,id = None):
        if id is None:
            person = Person.query.all()

            array = []
            for row in person:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return jsonify(array)

        else:
            person = Person.query.filter_by(id = id).all()

            if person:
                person = person[0].__dict__
                del person["_sa_instance_state"]

            return jsonify(person)

    # Register
    # Can be done if no session is active
    def post(self,id= None):
        if session["user_id"]:
            return "nenene"

        #osetrit ze mail uz je zadany + aj username
        email     = request.form.get("email")
        user_type = request.form.get("user_type")
        username  = request.form.get("username")
        password  = request.form.get("password")
        name      = request.form.get("name")
        surname   = request.form.get("surname")


        person = Person(email     = email,
                        user_type = user_type,
                        username  = username,
                        password  = password,
                        name      = name,
                        surname   = surname)

        db.session.add(person)
        db.session.commit()

    # Remove user
    # Can be done by Admin
    def delete(self,id):
        if not session['user_type'] == 5:
            return "nenenene"
        Person.query.filter_by(id=id).delete()
        db.session.commit()

    # Edit user
    # Can be done by Admin and User(can edit his info) TODO moze user editovat vsetko? (user_type urcite nope)
    def put(self,id):
        if not (session['user_id'] == id or session['user_type'] == 5):  # is the right person logged // admin
            return "nenenene"

        person = Person.query.filter_by(id=id).first()

        if not person:
            return

        email     = request.form.get("email")
        user_type = request.form.get("user_type")
        username  = request.form.get("username")
        password  = request.form.get("password")
        name      = request.form.get("name")
        surname   = request.form.get("surname")


        person.email     = email
        person.user_type = user_type
        person.username  = username
        person.password  = password
        person.name      = name
        person.surname   = surname

        db.session.commit()
