from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from datetime import datetime

from models.models import Borrowing,Stock

# gets list of users borrowings
# todo session
class BorrowingOfLibraryRes(MasterResource):

    # either person_id or persons e-mail
    def get(self, library_id):
        #todo - moze to iba librarian - mozno aj admin?????
        # if not session['user_id']:  # no session - no one is logged
        #     return "nenenene"

        if not (self.is_logged() and (self.is_admin() or self.is_librarian())):
            return self.response_error("Unauthorised action!")
        # if self.is_librarian():
        #     # Kontrola ci librarian ziada veci zo svojej lib

        # ziskanie pola stock id ktore su napojene na library
        # potom query na borrowings ktore su napojene na tieto stocks
        # todo otestovat

        #get id of stock of library - array of ids
        stock_id = Stock.query.with_entities(Stock.id).filter_by(library_id = library_id).all()
        stock_id_array = []
        for id in stock_id:
            stock_id_array.append(id[0])

        #big brain time query
        borrowings = Borrowing.query.filter(Borrowing.stock_id.in_(stock_id_array)).all()

        array = []
        for row in borrowings:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return jsonify(array)
