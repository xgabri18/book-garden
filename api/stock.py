# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: stock.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from sqlalchemy.exc import DBAPIError

from models.models import Stock

# SET response_error a response_ok
# osetrene

class StockResource(MasterResource):

    # Get all stocks
    # Can be used by Admin
    def get(self,id = None):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!", "")


        if id is None:
            stock = Stock.query.all()

            array = []
            for row in stock:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return self.response_ok(array)

        else:
            stock = Stock.query.filter_by(id = id).all()

            if stock:
                stock = stock[0].__dict__
                del stock["_sa_instance_state"]

            return self.response_ok(stock)

    # Adding should not be done manually
    # In some cases Admin may use
    def post(self,id = None):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!", "")

        library_id   = request.form.get("library_id")
        booktitle_id = request.form.get("booktitle_id")
        amount       = request.form.get("amount")
        if amount == "":
            amount = 0
        availability = request.form.get("availability")

        if availability.lower() == "true":
            availability = True
        else:
            availability = False

        try:
            stock = Stock(library_id   = library_id,
                          booktitle_id = booktitle_id,
                          amount       = amount,
                          availability = availability)

            db.session.add(stock)
            db.session.commit()

        except DBAPIError as e:
            db.session.rollback()
            return self.response_error("Database refused push!",
                                       str(e.__dict__.get('orig')))

        return self.response_ok("Committed to db")


    # Removing should not be done manually
    # In some cases Admin may use
    def delete(self, id):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!", "")

        stock = Stock.query.filter_by(id=id).first()  # .delete() doesnt work -> doesnt cascade
        if stock:
            db.session.delete(stock)  # required because of cascade
        db.session.commit()

        return self.response_ok("Committed to db")


    # Update stock
    # In some cases Admin may use
    def put(self, id):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!", "")

        stock = Stock.query.filter_by(id=id).first()

        if not stock:
            return self.response_error("Stock doesnt exist", "")

        library_id   = request.form.get("library_id")
        booktitle_id = request.form.get("booktitle_id")
        amount       = request.form.get("amount")
        if amount == "":
            amount = 0
        availability = request.form.get("availability")

        if availability.lower() == "true":
            availability = True
        else:
            availability = False

        try:
            stock.library_id   = library_id
            stock.booktitle_id = booktitle_id
            stock.amount       = amount
            stock.availability = availability

            db.session.commit()

        except DBAPIError as e:
            db.session.rollback()
            return self.response_error("Database refused push!",
                                       str(e.__dict__.get('orig')))


        return self.response_ok("Committed to db")

