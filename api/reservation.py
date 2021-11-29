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
from sqlalchemy.exc import DBAPIError

from models.models import Reservation,Borrowing,Stock

# SET response_error a response_ok


class ReservationResource(MasterResource):

    # Return list of all existing reservations or a specific reservation
    # Can be done by Admin
    def get(self, id=None):
        if not (self.is_logged() and (self.is_admin() or self.is_librarian())):
            return self.response_error("Unauthorised action!", "")

        if id is None:
            if not self.is_admin():  # only admin can see anyone's info
                return self.response_error("Unauthorised action!", "")
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
                if self.is_librarian():  # check if librarian works in the library where he wants to change stuff
                    stock = Stock.query.filter_by(id=reservation[0].stock_id).first()
                    if stock:
                        if stock.library_id != self.librarian_in_which_lib(session['user_id']):
                            return self.response_error("Unauthorised action!", "")
                    else:
                        return self.response_ok(reservation)

                reservation = reservation[0].__dict__
                del reservation["_sa_instance_state"]

            return self.response_ok(reservation)

    # Create a reservation
    # Logged user can do
    def post(self, id=None):

        if not self.is_logged():
            return self.response_error("Unauthorised action!", "")


        stock_id = request.form.get("stock_id")
        if self.is_admin():  # admin can create a reservation for anyone
            person_id = request.form.get("person_id")
            if person_id == "" or (person_id is None):
                person_id = session['user_id']
        else:
            person_id = session['user_id']
        try:
            reservation = Reservation(stock_id        = stock_id,
                                      person_id       = person_id)

            db.session.add(reservation)
            db.session.commit()

        except DBAPIError as e:
            db.session.rollback()
            return self.response_error("Can't create a reservation, make sure You provide valid information!",
                                       str(e.__dict__.get('orig')))

        return self.response_ok("Committed to db")

    # Remove any reservation or yours
    # Can be done by Admin (User can remove only his reservation)
    def delete(self, id):  # TODO user and ?librarian? remove

        if not self.is_logged():
            return self.response_error("Unauthorised action!", "")

        reservation = Reservation.query.filter_by(id=id).first()
        if reservation:
            if not (self.is_admin() or self.is_user(reservation.person_id)):
                return self.response_error("Unauthorised action!", "")

        Reservation.query.filter_by(id=id).delete()  # should work - no cascade
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
