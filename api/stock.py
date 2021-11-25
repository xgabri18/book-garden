from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Stock

class StockResource(MasterResource):

    # Get all stocks
    # Can be used by Admin
    def get(self,id = None):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")


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

    # Adding should not be done manually
    # In some cases Admin may use
    def post(self,id = None):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")

        library_id   = request.form.get("library_id")
        booktitle_id = request.form.get("booktitle_id")
        amount       = request.form.get("amount")
        availability = request.form.get("availability")

        if availability.lower() == "true":
            availability = True
        else:
            availability = False


        stock = Stock(library_id   = library_id,
                      booktitle_id = booktitle_id,
                      amount       = amount,
                      availability = availability)

        db.session.add(stock)
        db.session.commit()

    # Removing should not be done manually
    # In some cases Admin may use
    def delete(self, id):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")

        Stock.query.filter_by(id=id).delete()
        db.session.commit()

    # Update stock
    # In some cases Admin may use
    def put(self, id):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")

        stock = Stock.query.filter_by(id=id).first()

        if not stock:
            return

        library_id   = request.form.get("library_id")
        booktitle_id = request.form.get("booktitle_id")
        amount       = request.form.get("amount")
        availability = request.form.get("availability")

        if availability.lower() == "true":
            availability = True
        else:
            availability = False


        stock.library_id   = library_id
        stock.booktitle_id = booktitle_id
        stock.amount       = amount
        stock.availability = availability

        db.session.commit()


