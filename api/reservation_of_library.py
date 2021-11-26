from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Reservation,Stock

# SET response_error a response_ok
# osetrene

# gets list of users reservation
# todo session
class ReservationOfLibraryRes(MasterResource):

    def get(self, library_id):
        
        if not (self.is_logged() and (self.is_admin() or self.is_librarian())):
            return self.response_error("Unauthorised action!")

        if self.is_librarian():  # check if librarian works in the library where he wants to change stuff
            if library_id != self.librarian_in_which_lib(session['user_id']):
                return self.response_error("Unauthorised action!")

        # ziskanie pola stock id ktore su napojene na library
        # potom query na reservations ktore su napojene na tieto stocks


        #get id of stock of library - array of ids
        stock_id = Stock.query.with_entities(Stock.id).filter_by(library_id = library_id).all()

        stock_id_array = []
        for id in stock_id:
            stock_id_array.append(id[0])


        #big brain time query
        reservations = Reservation.query.filter(Reservation.stock_id.in_(stock_id_array)).all()

        array = []
        for row in reservations:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return self.response_ok(array)



