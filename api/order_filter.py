# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: order_filter.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Order

# SET response_error a response_ok



class OrderFilterResource(MasterResource):


    # Get orders filtered by book or library
    def get(self):
        if not (self.is_logged() and (self.is_admin() or self.is_distributor())):
            return self.response_error("Unauthorised action!", "")

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

        return self.response_ok(array)




