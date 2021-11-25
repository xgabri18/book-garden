from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from datetime import datetime

from models.models import Reservation,Borrowing,Person

# gets list of users borrowings
# todo session asi needed
# TODO knihovnik by nemal vidiet veci z inych kniznic (vidi len borrowings z jeho kniznice) - potom upravim session
class BorrowingOfPersonRes(MasterResource):

    # either person_id or persons e-mail
    def get(self, identificator):

        if type(identificator) == int:
            person_id = identificator
            borrowings = Borrowing.query.filter_by(person_id = person_id).all()

        else:
            email = identificator
            person_id = Person.query.with_entities(Person.id).filter_by(email = email).all()
            #todo osetrit ze person exituje
            borrowings = Borrowing.query.filter_by(person_id = person_id[0][0]).all()

        if not (self.is_logged() and (self.is_admin() or self.is_user(person_id))):  # is the right person logged //librarian/admin
            return self.response_error("Unauthorised action!")


        array = []
        for row in borrowings:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return jsonify(array)
