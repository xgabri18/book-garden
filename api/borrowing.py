from flask_restful import Resource
from flask import jsonify,request
from shared_db import db
from datetime import datetime

from models.models import Reservation,Borrowing
# TODO ako sa bude riesit zaznam v tabulke pri vymazani stocku

class BorrowingResource(Resource):

    def get(self, id=None):
        if id is None:
            borrowing = Borrowing.query.all()

            array = []
            for row in borrowing:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return jsonify(array)

        else:
            borrowing = Borrowing.query.filter_by(id=id).all()

            if borrowing:
                borrowing = borrowing[0].__dict__
                del borrowing["_sa_instance_state"]

            return jsonify(borrowing)


    def post(self, id=None):  # TODO bude vzdy vznikat po rezervacii? alebo aj rucne
        stock_id = request.form.get("stock_id")
        person_id = request.form.get("person_id")

        borrowing = Borrowing(stock_id        = stock_id,
                              person_id       = person_id)

        db.session.add(borrowing)
        db.session.commit()


    def delete(self, id):
        Borrowing.query.filter_by(id=id).delete()
        db.session.commit()


    def put(self, id):  # book returned or fine added
        borrowing = Borrowing.query.filter_by(id=id).first()

        if not borrowing:
            return

        if request.form.get("fine"):
            borrowing.fine = request.form.get("fine")
        else:
            borrowing.date_returned = datetime.utcnow()

        db.session.commit()
