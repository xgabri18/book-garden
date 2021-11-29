# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: borrowing.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################
import sqlalchemy.exc

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from datetime import datetime, timedelta

from models.models import Reservation,Borrowing,Stock


# SET response_error a response_ok
# osetrene

class BorrowingResource(MasterResource):

    # Return list of all existing borrowings from all libraries or a specific borrowing
    # Can be done by Admin and librarian in his own lib
    def get(self, id=None):
        if not (self.is_logged() and (self.is_admin() or self.is_librarian())):
            return self.response_error("Unauthorised action!", "")

        if id is None:
            if not self.is_admin():  # only admin can see anyone's info
                return self.response_error("Unauthorised action!", "")
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
                if self.is_librarian():  # check if librarian works in the library where he wants to change stuff
                    stock = Stock.query.filter_by(id=borrowing[0].stock_id).first()
                    if stock:
                        if stock.library_id != self.librarian_in_which_lib(session['user_id']):
                            return self.response_error("Unauthorised action!", "")
                    else:
                        return self.response_ok(borrowing)

                borrowing = borrowing[0].__dict__
                del borrowing["_sa_instance_state"]

            return self.response_ok(borrowing)

    # Create a Borrowing manually in any library
    # Can be done by Admin
    def post(self, id=None):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!", "")

        stock_id = request.form.get("stock_id")
        if stock_id == "":
            stock_id = None
        person_id = request.form.get("person_id")
        if person_id == "":
            person_id = None
        try:
            borrowing = Borrowing(stock_id        = stock_id,
                                  person_id       = person_id)

            db.session.add(borrowing)
            db.session.commit()
        except sqlalchemy.exc.DBAPIError as e:
            db.session.rollback()
            return self.response_error("Database refused push, Person and Stock must exist!",
                                       str(e.__dict__.get('orig')))


        return self.response_ok("Committed to db")

    # Remove borrowing (user returned a book,...) in any library
    # Can be done by Admin and Librarian (in his/her library)
    def delete(self, id):

        if not (self.is_logged() and (self.is_admin() or self.is_librarian())):
            return self.response_error("Unauthorised action!", "")

        borrowing = Borrowing.query.filter_by(id=id).first()
        if not borrowing:
            return self.response_ok({})

        if self.is_librarian():  # check if librarian works in the library where he wants to change stuff
            stock = Stock.query.filter_by(id=borrowing.stock_id).first()
            if stock:
                if stock.library_id != self.librarian_in_which_lib(session['user_id']):
                    return self.response_error("Unauthorised action!", "")
            else:
                return self.response_ok({})

        try:
            stock = Stock.query.filter_by(id = borrowing.stock_id).first()
            stock.amount +=1
        except (sqlalchemy.exc.SQLAlchemyError, AttributeError):
            pass

        #print(borrowing.stock_id)
        borrowing = Borrowing.query.filter_by(id=id).first()
        if borrowing:
            db.session.delete(borrowing)
        db.session.commit()

        return self.response_ok("Committed to db")

    # Changing fine or date when the book should be returned in any library
    # Can be done by Admin
    def put(self, id):
        if not (self.is_logged() and (self.is_admin() or self.is_librarian())):
            return self.response_error("Unauthorised action!", "")

        borrowing = Borrowing.query.filter_by(id=id).first()

        if not borrowing:
            return self.response_error("Borrowing doesn't exist", "")

        if self.is_librarian():  # check if librarian works in the library where he wants to change stuff
            stock = Stock.query.filter_by(id=borrowing.stock_id).first()
            if stock:
                if stock.library_id != self.librarian_in_which_lib(session['user_id']):
                    return self.response_error("Unauthorised action!", "")


        fine = request.form.get("fine")
        if fine == "" or (fine is None):
            fine = 0
        if request.form.get("extend"):
            borrowing.date_returned += timedelta(days=30)

        borrowing.fine = fine



        db.session.commit()

        return self.response_ok("Committed to db")
