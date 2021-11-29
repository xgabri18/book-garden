# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: person.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from sqlalchemy.exc import DBAPIError

from models.models import Person

# SET response_error a response_ok



class PersonResource(MasterResource):

    # Get info about person
    # Admin (all) or User (only info about himself)
    def get(self,id = None):

        if not (self.is_logged() and (self.is_admin() or self.is_user(id)) or self.is_librarian()):
            return self.response_error("Unauthorised action!", "")

        if id is None:  # user can see his own information
            if not self.is_admin():  # only admin can see anyone's info
                return self.response_error("Unauthorised action!", "")
            person = Person.query.all()

            array = []
            for row in person:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return self.response_ok(array)

        else: # user can see his own information

            person = Person.query.filter_by(id = id).all()

            if person:
                person = person[0].__dict__
                del person["_sa_instance_state"]
                if self.is_librarian():
                    if person.get("password"):
                        del person["password"]

            return self.response_ok(person)

    # Register
    # Can be done if no session is active
    def post(self,id= None):
        if self.is_logged() and not self.is_admin():
            return self.response_error("Can not be done while logged in!", "")

        email       = request.form.get("email")
        if email == "":
            email = None
        if self.is_admin():
            user_type   = request.form.get("user_type")
            if user_type == "" or (user_type is None):
                user_type = 1
        else:
            user_type = 1
        username    = request.form.get("username")
        if username == "":
            username = None
        password    = request.form.get("password")
        if password == "":
            password = None
        name        = request.form.get("name")
        surname     = request.form.get("surname")
        if self.is_admin():
            library_id  = request.form.get("library_id")
            if library_id == "" or (user_type is None):
                library_id = None
        else:
            library_id = None
        profiledesc = request.form.get("profiledesc")

        try:
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

        except DBAPIError as e:
            db.session.rollback()
            return self.response_error("Email or Username already in use! / Not filled!",
                                       str(e.__dict__.get('orig')))

        return self.response_ok("Committed to db")


    # Remove user
    # Can be done by Admin
    def delete(self, id):

        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!", "")

        person = Person.query.filter_by(id=id).first()  # .delete() doesnt work -> doesnt cascade
        if person:
            db.session.delete(person)  # required because of cascade
        db.session.commit()

        return self.response_ok("Committed to db")


    # Edit user
    # Can be done by Admin and User(can edit his info)
    def put(self, id):
        if not (self.is_logged() and (self.is_admin() or self.is_user(id))):  # is the right person logged //admin
            return self.response_error("Unauthorised action!", "")

        person = Person.query.filter_by(id=id).first()

        if not person:  # user non existent -> err?
            return self.response_error("Person doesn't exist", "")

        email       = request.form.get("email")
        if email == "":
            email = None
        user_type   = request.form.get("user_type")
        if user_type == "":
            user_type = None
        username    = request.form.get("username")
        if username == "":
            username = None
        password    = request.form.get("password")
        if password == "":
            password = None
        name        = request.form.get("name")
        surname     = request.form.get("surname")
        library_id  = request.form.get("library_id")
        if library_id == "":
            library_id = None
        profiledesc = request.form.get("profiledesc")

       #print(library_id)

        try:
            if person.email != email:
                person.email       = email
            if self.is_admin():
                person.user_type   = user_type
            if person.username != username:
                person.username    = username
            if person.password != password:
                person.password    = password
            person.name        = name
            person.surname     = surname
            if self.is_admin():
                person.library_id  = library_id
            person.profiledesc = profiledesc

            db.session.commit()

        except DBAPIError as e:
            db.session.rollback()
            return self.response_error("Email or Username already in use! / Not filled or password missing!",
                                       str(e.__dict__.get('orig')))

        return self.response_ok("Committed to db")

