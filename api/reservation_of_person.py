from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Reservation,Borrowing,Person


# gets list of users reservation
# todo session asi needed
class ReservationOfPersonRes(MasterResource):

    def get(self, identificator):

        if not session['user_id']:  # no session - no one is logged
            return "nenenene"


        if type(identificator) == int:
            person_id = identificator
            reservations = Reservation.query.filter_by(person_id = person_id).all()

        else:
            email = identificator
            person_id = Person.query.with_entities(Person.id).filter_by(email = email).all()
            #todo osetrit ze person exituje
            reservations = Reservation.query.filter_by(person_id = person_id[0][0]).all()

        #reservations = Reservation.query.filter(Reservation.person_id == person_id).all()
        if not (session['user_id'] == person_id or (session['user_type'] == 5 or session['user_type'] == 4)):  # is the right person logged // no librarian/admin
            return "nenenene"

        array = []
        for row in reservations:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return jsonify(array)



