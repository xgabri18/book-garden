from flask_restful import Resource
from flask import jsonify,request
from shared_db import db

from models.models import Reservation,Borrowing


class ReservationResource(Resource):

    def get(self, id=None):
        if id is None:
            reservation = Reservation.query.all()

            array = []
            for row in reservation:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return jsonify(array)

        else:
            reservation = Reservation.query.filter_by(id=id).all()

            if reservation:
                reservation = reservation[0].__dict__
                del reservation["_sa_instance_state"]

            return jsonify(reservation)


    def post(self, id=None):  # TODO tu sa bude asi person_id zistovat zo session?
        stock_id = request.form.get("stock_id")
        person_id = request.form.get("person_id")

        reservation = Reservation(stock_id        = stock_id,
                                  person_id       = person_id)

        db.session.add(reservation)
        db.session.commit()


    def delete(self, id):  # TODO premeni rezervaciu na pozicku potom delete ... asi do PUT (rez. sa moze vymazat aj len tak)
        # reservation = Reservation.query.filter_by(id=id).first()
        # person_id = reservation.person_id
        # stock_id = reservation.stock_id
        # db.session.add(Borrowing(stock_id=stock_id, person_id=person_id))
        Reservation.query.filter_by(id=id).delete()
        db.session.commit()


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
