# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: order_to_stock.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Order,Stock


class OrderConfirmRes(MasterResource):

    # Order was confirmed
    # Order->Stock
    # Can be done by Admin and Distributor
    def get(self, id):
        if not (self.is_logged() and (self.is_admin() or self.is_distributor())):
            return self.response_error("Unauthorised action!", "")

        order = Order.query.filter_by(id=id).first()
        library_id = order.library_id
        booktitle_id = order.booktitle_id
        if order:
            # Add stock
            stock = Stock.query.filter_by(library_id=library_id, booktitle_id=booktitle_id).first()  # should be unique
            if stock:
                if not stock.availability:
                    self.make_stock_availiable(stock)
                self.add_to_stock(stock.id, order.amount)

                # Delete order
                Order.query.filter_by(id=id).delete()
                db.session.commit()
                return self.response_ok({})

            else:
                return self.response_error("Not in DB!", "")

        else:
            return self.response_error("Not in DB!", "")
