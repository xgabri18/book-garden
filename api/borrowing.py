from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from datetime import datetime

from models.models import Reservation,Borrowing
# TODO ako sa bude riesit zaznam v tabulke pri vymazani stocku
# TODO resourcy pre knihovnika zvlast alebo sem?

# SET response_error a response_ok
# osetrene

class BorrowingResource(MasterResource):

    # Return list of all existing borrowings from all libraries
    # Can be done by Admin
    def get(self, id=None):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")

        if id is None:
            borrowing = Borrowing.query.all()

            array = []
            for row in borrowing:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return self.response_ok(array)

        else:
            borrowing = Borrowing.query.filter_by(id=id).all()

            if borrowing:
                borrowing = borrowing[0].__dict__
                del borrowing["_sa_instance_state"]

            return self.response_ok(borrowing)

    # Create a Borrowing manually in any library
    # Can be done by Admin
    def post(self, id=None):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")

        stock_id = request.form.get("stock_id")
        person_id = request.form.get("person_id")

        borrowing = Borrowing(stock_id        = stock_id,
                              person_id       = person_id)

        db.session.add(borrowing)
        db.session.commit()

        return self.response_ok("Committed to db")

    # Remove borrowing (user returned a book,...) in any library
    # Can be done by Admin
    def delete(self, id):  # TODO zmena stocku

        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")

        Borrowing.query.filter_by(id=id).delete()
        db.session.commit()

        return self.response_ok("Committed to db")

    # Changing fine or date when the book should be returned in any library
    # Can be done by Admin
    def put(self, id):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")

        borrowing = Borrowing.query.filter_by(id=id).first()

        if not borrowing:
            return self.response_error("Borrowing doesnt exist")

        borrowing.fine = request.form.get("fine")
        borrowing.date_returned = request.form.get("date_returned")

        # not relevant
        # if request.form.get("fine"):
        #     borrowing.fine = request.form.get("fine")
        # else:
        #     borrowing.date_returned = datetime.utcnow()

        db.session.commit()

        return self.response_ok("Committed to db")
