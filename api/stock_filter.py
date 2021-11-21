from flask_restful import Resource
from flask import jsonify,request,session
from shared_db import db

from models.models import Stock

class StockResource(Resource):

    # Get all stocks
    # Can be used by Admin
    def get(self,id = None):
        if not session['user_type'] == 5:
            return "nenenene"

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

