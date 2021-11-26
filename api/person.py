from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Person

# SET response_error a response_ok
# osetrene


class PersonResource(MasterResource):

    # TODO k tomuto treba debatu (profil alebo jak?/ admin?)
    def get(self,id = None):
        if id is None:
            person = Person.query.all()

            array = []
            for row in person:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return self.response_ok(array)

        else:
            person = Person.query.filter_by(id = id).all()

            if person:
                person = person[0].__dict__
                del person["_sa_instance_state"]

            return self.response_ok(person)

    # Register
    # Can be done if no session is active
    def post(self,id= None):
        if self.is_logged() and not self.is_admin():
            return self.response_error("Action not allowed for current session!")  # TODO co tu

        #osetrit ze mail uz je zadany + aj username
        email       = request.form.get("email")
        user_type   = request.form.get("user_type")
        username    = request.form.get("username")
        password    = request.form.get("password")
        name        = request.form.get("name")
        surname     = request.form.get("surname")
        library_id  = request.form.get("library_id")
        profiledesc = request.form.get("profiledesc")

        person = Person(email       = email,
                        user_type   = user_type,
                        username    = username,
                        password    = password,
                        name        = name,
                        surname     = surname,
                        library_id  = library_id,
                        profiledesc = profiledesc)

        db.session.add(person)
        db.session.commit()

        return self.response_ok("Committed to db")


    # Remove user
    # Can be done by Admin
    def delete(self, id):

        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")

        Person.query.filter_by(id=id).delete()
        db.session.commit()

        return self.response_ok("Committed to db")


    # Edit user
    # Can be done by Admin and User(can edit his info) TODO moze user editovat vsetko? (user_type urcite nope)
    def put(self, id):
        if not (self.is_logged() and (self.is_admin() or self.is_user(id))):  # is the right person logged //admin
            return self.response_error("Unauthorised action!")

        person = Person.query.filter_by(id=id).first()

        if not person:  # user non existent -> err?
            return self.response_error("Person doesnt exist")

        email       = request.form.get("email")
        user_type   = request.form.get("user_type")
        username    = request.form.get("username")
        password    = request.form.get("password")
        name        = request.form.get("name")
        surname     = request.form.get("surname")
        library_id  = request.form.get("library_id")
        profiledesc = request.form.get("profiledesc")

       #print(library_id)


        person.email       = email
        person.user_type   = user_type
        person.username    = username
        person.password    = password
        person.name        = name
        person.surname     = surname
        person.library_id  = library_id
        person.profiledesc = profiledesc

        db.session.commit()

        return self.response_ok("Committed to db")

