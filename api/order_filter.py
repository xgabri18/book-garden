from flask_restful import Resource
from flask import jsonify,request,session
from shared_db import db

from models.models import Order

class OrderFilterResource(Resource):


    # todo session
    def get(self,library_id = None):
        library_id      = request.args.get('library_id')
        booktitle_id    = request.args.get('booktitle_id')

        orders = Order.query

        if library_id is not None:
            orders = orders.filter_by(library_id = library_id)

        if booktitle_id is not None:
            orders = orders.filter_by(booktitle_id = booktitle_id)

        orders = orders.all()

        array = []
        for row in orders:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return jsonify(array)




