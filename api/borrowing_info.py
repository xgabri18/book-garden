# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: borrowing_info.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from sqlalchemy.exc import IntegrityError

from models.models import Borrowing,Stock,Person,Library,BookTitle

# SET response_error a response_ok


class BorrowingInfoResource(MasterResource):

    # Return list of all existing reservations
    # Can be done by Admin
    # todo session
    def get(self, id):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")

        try:
            reservation = Borrowing.query.filter_by(id=id).first().__dict__

            stock = Stock.query.filter_by(id = reservation["stock_id"]).first().__dict__

            lib_name = Library.query.with_entities(Library.name).filter_by(id = stock["library_id"]).all()
            book_title = BookTitle.query.with_entities(BookTitle.name).filter_by(id = stock["booktitle_id"]).all()

            person = Person.query.filter_by(id=reservation["person_id"]).first().__dict__

            name = person["name"]
            surname = person["surname"]

            return self.response_ok({"name" : name, "surname" : surname, "Library_name" : lib_name[0][0], "Book_title" : book_title[0][0] })

        except (sqlalchemy.exc.SQLAlchemyError, AttributeError) as e:
            return self.response_ok()


