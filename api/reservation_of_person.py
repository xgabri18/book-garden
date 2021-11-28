# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: reservation_of_person.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from sqlalchemy.exc import SQLAlchemyError

from models.models import Reservation,Borrowing,Person

# SET response_error a response_ok



# gets list of users reservation
class ReservationOfPersonRes(MasterResource):

    # Get all reservations of a specific user
    def get(self, identificator):

        if type(identificator) == int:
            person_id = identificator
            reservations = Reservation.query.filter_by(person_id = person_id).all()

        else:

            email = identificator
            person_id = Person.query.with_entities(Person.id).filter_by(email = email).all()
            if not person_id:
                return self.response_error("Person doesnt exist", "")

            reservations = Reservation.query.filter_by(person_id = person_id[0][0]).all()



        #reservations = Reservation.query.filter(Reservation.person_id == person_id).all()
        if not (self.is_logged() and (self.is_admin() or self.is_user(person_id))):  # is the right person logged //librarian/admin
            return self.response_error("Unauthorised action!", "")

        array = []
        for row in reservations:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return self.response_ok(array)



