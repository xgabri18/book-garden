from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Order

class OrderResource(MasterResource):

    # Return list of all existing orders from all libraries
    # Can be done by Admin and Distributor (librarian sees orders ONLY of his Library)
    def get(self,id = None):
        if not (session['user_type'] == 5 or session['user_type'] == 3):
            return "nenenene"

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

    # Place new order
    # Can be done by Admin and Librarian
    def post(self,id = None):
        if not (session['user_type'] == 5 or session['user_type'] == 4):
            return "nenenene"

        library_id   = request.form.get("library_id")  # TODO aj toto sa da zistit z knihovnika ale admin by sa zas zvlast musel riesit
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

    # Delete any order
    # Can be done by Admin (Librarian can delete orders of his Library)
    def delete(self,id):
        if not session['user_type'] == 5:
            return "nenenene"
        Order.query.filter_by(id=id).delete()
        db.session.commit()

    # TODO transformacia Orderu do Stocku, pridat put
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
