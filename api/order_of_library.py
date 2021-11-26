from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Order

# SET response_error a response_ok
# osetrene

class OrderOfLibResource(MasterResource):


    def get(self,library_id = None):
        if not (self.is_logged() and (self.is_admin() or self.is_librarian()) or self.is_distributor()):
            return self.response_error("Action not allowed for current session!")


        orders = Order.query.filter_by(library_id = library_id).all()

        array = []
        for row in orders:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return self.response_ok(array)

