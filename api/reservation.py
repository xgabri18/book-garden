# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: reservation.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from sqlalchemy.exc import IntegrityError

from models.models import Reservation,Borrowing

# SET response_error a response_ok


class ReservationResource(MasterResource):

    # Return list of all existing reservations
    # Can be done by Admin
    def get(self, id=None):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")

        if id is None:
            reservation = Reservation.query.all()

            array = []
            for row in reservation:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return self.response_ok(array)

        else:
            reservation = Reservation.query.filter_by(id=id).all()

            if reservation:
                reservation = reservation[0].__dict__
                del reservation["_sa_instance_state"]

            return self.response_ok(reservation)

    # Create a reservation
    # Logged user can do
    def post(self, id=None):  # TODO tu sa bude asi person_id zistovat zo session?
        # TODO rezervacia rovnakej knihy

        if not self.is_logged():
            return self.response_error("Unauthorised action!")

        stock_id = request.form.get("stock_id")
        person_id = request.form.get("person_id")

        try:
            reservation = Reservation(stock_id        = stock_id,
                                      person_id       = person_id)

            db.session.add(reservation)
            db.session.commit()

        except IntegrityError as e:  # uniqueness control
            db.session.rollback()
            return self.response_error(e.orig.diag.message_detail)

        return self.response_ok("Committed to db")

    # Remove any reservation or yours
    # Can be done by Admin (User can remove only his reservation)
    def delete(self, id):  # TODO user and ?librarian? remove

        if not self.is_logged():
            return self.response_error("Unauthorised action!")

        reservation = Reservation.query.filter_by(id=id).first()
        if not (self.is_admin() or self.is_user(reservation.person_id)):
            return self.response_error("Unauthorised action!")

        Reservation.query.filter_by(id=id).delete()
        db.session.commit()

        return self.response_ok("Committed to db")


    # def put(self, id):  # update - does it make sense to update reservation?
    #     reservation = Reservation.query.filter_by(id=id).first()
    #
    #     if not reservation:
    #         return
    #
    #     stock_id = request.form.get("stock_id")
    #     person_id = request.form.get("person_id")
    #
    #     reservation.stock_id = stock_id
    #     reservation.person_id = person_id
    #
    #     db.session.commit()
