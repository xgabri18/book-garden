# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: library.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from sqlalchemy.exc import DBAPIError

from models.models import Library,BookTitle,Stock


# SET response_error a response_ok


class LibraryResource(MasterResource):

    # Get all libraries
    # Can be done by anyone
    def get(self,id = None):

        #get all libraries when ID is not specified
        if id is None:
            library = Library.query.all()

            array = []
            for row in library:
                row = row.__dict__
                del row["_sa_instance_state"]   #get rid of _sa_instance_state - __dict__ creates it
                array.append(row)

            return self.response_ok(array)

        else:
            library = Library.query.filter_by(id = id).all()

            if library:
                library = library[0].__dict__
                del library["_sa_instance_state"]

            return self.response_ok(library)

    # Adding a library into DB
    # Can be done by Admin
    def post(self,id = None):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!", "")

        name        = request.form.get("name")
        city        = request.form.get("city")
        street      = request.form.get("street")
        open_hours  = request.form.get("open_hours")
        description = request.form.get("description")

        try:
            library = Library(name        = name,
                              city        = city,
                              street      = street,
                              open_hours  = open_hours,
                              description = description)

            db.session.add(library)
            db.session.commit()

        except DBAPIError as e:
            db.session.rollback()
            return self.response_error("Database refused push!",
                                       str(e.__dict__.get('orig')))

        #autostock when added library
        booktitle = BookTitle.query.all()
        if not booktitle:
            return

        for row in booktitle:
            row = row.__dict__
            stock = Stock(library_id = library.id,booktitle_id = row["id"], amount = 0)
            db.session.add(stock)

        db.session.commit()

        return self.response_ok("Committed to db")


    # Removing a library from DB
    # Can be done by Admin
    def delete(self,id):

        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!", "")

        lib = Library.query.filter_by(id=id).first()
        if lib:
            db.session.delete(lib)  # required because of cascade
        db.session.commit()

        return self.response_ok("Committed to db")


    # Updating a library
    # Can be done by Admin
    def put(self,id):

        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!", "")

        library = Library.query.filter_by(id=id).first()

        if not library:
            return self.response_error("Library doesn't exist", "")

        name        = request.form.get("name")
        city        = request.form.get("city")
        street      = request.form.get("street")
        open_hours  = request.form.get("open_hours")
        description = request.form.get("description")

        try:
            library.name        = name
            library.city        = city
            library.street      = street
            library.open_hours  = open_hours
            library.description = description

            db.session.commit()

        except DBAPIError as e:
            db.session.rollback()
            return self.response_error("Database refused push! (some values, like name have 100 word limit!)",
                                       str(e.__dict__.get('orig')))

        return self.response_ok("Committed to db")



