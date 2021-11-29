# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: reservation_info.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################
import sqlalchemy.exc

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from sqlalchemy.exc import IntegrityError

from models.models import Reservation,Stock,Person,Library,BookTitle

# SET response_error a response_ok


class ReservationInfoResource(MasterResource):

    # Return list of all existing reservations
    # Can be done by Admin
    def get(self,id):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!", "debug")

        try:
            final = []
            res = Reservation.query.filter_by(library_id = id).all()

            for reservation in res:
                #print(reservation)
                reservation = reservation.__dict__
                stock = Stock.query.filter_by(id = reservation["stock_id"]).first().__dict__

                lib_name = Library.query.with_entities(Library.name).filter_by(id = stock["library_id"]).first()
                book_title = BookTitle.query.with_entities(BookTitle.name).filter_by(id = stock["booktitle_id"]).first()

                person = Person.query.filter_by(id=reservation["person_id"]).first().__dict__

                name = person["name"]
                surname = person["surname"]

                del reservation["_sa_instance_state"]
                reservation["name"] = name
                reservation["surname"] = surname
                reservation["Library_name"] = lib_name[0][0]
                reservation["Book_title"] =  book_title[0][0]

                final.append(reservation)

            return self.response_ok(final)

        except (sqlalchemy.exc.SQLAlchemyError, AttributeError) as e:
            return self.response_error("Error",str(e))



