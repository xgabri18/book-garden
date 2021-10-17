from flask_restful import Resource
from flask import jsonify,request
from shared_db import db

from models.models import Stock

class StockResource(Resource):
    def get(self,id = None):
        if id is None:
            stock = Stock.query.all()

            array = []
            for row in stock:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return jsonify(array)

        else:
            stock = Stock.query.filter_by(id = id).all()

            if stock:
                stock = stock[0].__dict__
                del stock["_sa_instance_state"]

            return jsonify(stock)


    def post(self,id = None):
        library_id   = request.form.get("library_id")
        booktitle_id = request.form.get("booktitle_id")
        amount       = request.form.get("amount")
        availability = request.form.get("availability")


        stock = Stock(library_id   = library_id,
                      booktitle_id = booktitle_id,
                      amount       = amount,
                      availability = availability)

        db.session.add(stock)
        db.session.commit()


    def delete(self,id):
        Stock.query.filter_by(id=id).delete()
        db.session.commit()


    def put(self,id):
        stock = Stock.query.filter_by(id=id).first()

        if not stock:
            return

        library_id   = request.form.get("library_id")
        booktitle_id = request.form.get("booktitle_id")
        amount       = request.form.get("amount")
        availability = request.form.get("availability")

        stock.library_id   = library_id
        stock.booktitle_id = booktitle_id
        stock.amount       = amount
        stock.availability = availability

        db.session.commit()


