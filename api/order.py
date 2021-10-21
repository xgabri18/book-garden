from flask_restful import Resource
from flask import jsonify,request
from shared_db import db

from models.models import Order

class OrderResource(Resource):

    def get(self,id = None):
        if id is None:
            order = Order.query.all()

            array = []
            for row in order:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return jsonify(array)

        else:
            order = Order.query.filter_by(id = id).all()

            if order:
                order = order[0].__dict__
                del order["_sa_instance_state"]

            return jsonify(order)


    def post(self,id = None):
        library_id   = request.form.get("library_id")
        booktitle_id = request.form.get("booktitle_id")
        person_id    = request.form.get("person_id")  # TODO cez session?
        amount       = request.form.get("amount")
        note         = request.form.get("note")


        order = Order(library_id   = library_id,
                      booktitle_id = booktitle_id,
                      person_id    = person_id,
                      amount       = amount,
                      note         = note)

        db.session.add(order)
        db.session.commit()


    def delete(self,id):
        Order.query.filter_by(id=id).delete()
        db.session.commit()

    # TODO transformacia Orderu do Stocku
    # def put(self,id):
    #     stock = Stock.query.filter_by(id=id).first()
    #
    #     if not stock:
    #         return
    #
    #     library_id   = request.form.get("library_id")
    #     booktitle_id = request.form.get("booktitle_id")
    #     amount       = request.form.get("amount")
    #     availability = request.form.get("availability")
    #
    #     stock.library_id   = library_id
    #     stock.booktitle_id = booktitle_id
    #     stock.amount       = amount
    #     stock.availability = availability
    #
    #     db.session.commit()
