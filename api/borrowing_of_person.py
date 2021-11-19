from flask_restful import Resource
from flask import jsonify,request,session
from shared_db import db
from datetime import datetime

from models.models import Reservation,Borrowing,Person

# gets list of users borrowings
# todo session asi needed
# TODO knihovnik by nemal vidiet veci z inych kniznic (vidi len borrowings z jeho kniznice) - potom upravim session
class BorrowingOfPersonRes(Resource):

    # either person_id or persons e-mail
    def get(self, identificator):

        if not session['user_id']:  # no session - no one is logged
            return "nenenene"

        if type(identificator) == int:
            person_id = identificator
            borrowings = Borrowing.query.filter_by(person_id = person_id).all()

        else:
            email = identificator
            person_id = Person.query.with_entities(Person.id).filter_by(email = email).all()
            #todo osetrit ze person exituje
            borrowings = Borrowing.query.filter_by(person_id = person_id[0][0]).all()

        if not (session['user_id'] == person_id or (session['user_type'] == 5 or session['user_type'] == 4)):  # is the right person logged // no librarian/admin
            return "nenenene"


        array = []
        for row in borrowings:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return jsonify(array)
