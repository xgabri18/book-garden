from flask_restful import Resource
from flask import jsonify,request
from shared_db import db

from models.models import Person

class PersonResource(Resource):
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


    def post(self,id= None):
        #osetrit ze mail uz je zadany
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


    def delete(self,id):
        Person.query.filter_by(id=id).delete()
        db.session.commit()


    def put(self,id):
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

