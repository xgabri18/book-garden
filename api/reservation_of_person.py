from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Reservation,Borrowing,Person


# gets list of users reservation
# todo session asi needed
class ReservationOfPersonRes(MasterResource):

    def get(self, identificator):


        if type(identificator) == int:
            person_id = identificator
            reservations = Reservation.query.filter_by(person_id = person_id).all()

        else:
            email = identificator
            person_id = Person.query.with_entities(Person.id).filter_by(email = email).all()
            #todo osetrit ze person exituje
            reservations = Reservation.query.filter_by(person_id = person_id[0][0]).all()

        #reservations = Reservation.query.filter(Reservation.person_id == person_id).all()
        if not (self.is_logged() and (self.is_admin() or self.is_user(person_id))):  # is the right person logged //librarian/admin
            return self.response_error("Unauthorised action!")

        array = []
        for row in reservations:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return jsonify(array)



