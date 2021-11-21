from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Order

class OrderOfLibResource(MasterResource):

    #
    # todo session
    def get(self,library_id = None):
        # if not (session['user_type'] == 5 or session['user_type'] == 3):
        #     return "nenenene"

        orders = Order.query.filter_by(library_id = library_id).all()

        array = []
        for row in orders:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return jsonify(array)

