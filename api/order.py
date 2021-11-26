from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from sqlalchemy.exc import IntegrityError

from models.models import Order

# SET response_error a response_ok
# osetrene


class OrderResource(MasterResource):

    # Return list of all existing orders from all libraries
    # Can be done by Admin and Distributor (librarian sees orders ONLY of his Library)
    def get(self,id = None):
        if not (self.is_logged() and (self.is_admin() or self.is_distributor())):
            return self.response_error("Unauthorised action!")

        if id is None:
            order = Order.query.all()

            array = []
            for row in order:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return self.response_ok(array)

        else:
            order = Order.query.filter_by(id = id).all()

            if order:
                order = order[0].__dict__
                del order["_sa_instance_state"]

            return self.response_ok(order)

    # Place new order
    # Can be done by Admin and Librarian
    def post(self,id = None):
        if not (self.is_logged() and (self.is_admin() or self.is_librarian())):
            return self.response_error("Unauthorised action!")
        # TODO kontrola librariana

        library_id   = request.form.get("library_id")  # TODO aj toto sa da zistit z knihovnika ale admin by sa zas zvlast musel riesit
        booktitle_id = request.form.get("booktitle_id")
        #person_id    = request.form.get("person_id")  # TODO cez session?
        person_id    = session['user_id']
        amount       = request.form.get("amount")
        note         = request.form.get("note")

        try:
            order = Order(library_id   = library_id,
                          booktitle_id = booktitle_id,
                          person_id    = person_id,
                          amount       = amount,
                          note         = note)

            db.session.add(order)
            db.session.commit()

        except IntegrityError as e:
            db.session.rollback()
            return self.response_error("Database refused push!" + '\n' + e.orig.diag.message_detail)

        return self.response_ok("Committed to db")

    # Delete an order
    # Can be done by Admin (Librarian can delete orders of his Library)
    def delete(self, id):

        if not (self.is_logged() and (self.is_admin() or self.is_librarian())):
            return self.response_error("Unauthorised action!")

        order = Order.query.filter_by(id=id).first()
        if self.is_librarian():  # check if librarian works in the library where he wants to change stuff
            if order.library_id != self.librarian_in_which_lib(session['user_id']):
                return self.response_error("Unauthorised action!")

        Order.query.filter_by(id=id).delete()
        db.session.commit()

        return self.response_ok("Committed to db")

    # Update an order
    # Can be done by Admin (Librarian can update orders of his Library)
    def put(self,id):
        if not (self.is_logged() and (self.is_admin() or self.is_librarian())):
            return self.response_error("Unauthorised action!")

        order = Order.query.filter_by(id=id).first()

        if self.is_librarian():  # check if librarian works in the library where he wants to change stuff
            if order.library_id != self.librarian_in_which_lib(session['user_id']):
                return self.response_error("Unauthorised action!")

        if not order:
            return self.response_error("No such order in DB!")

        library_id = request.form.get("library_id")
        booktitle_id = request.form.get("booktitle_id")
        person_id = session['user_id']
        amount = request.form.get("amount")
        note = request.form.get("note")

        try:
            if self.is_admin():
                order.library_id   = library_id
                order.booktitle_id = booktitle_id
                order.person_id    = person_id

            order.amount       = amount
            order.note         = note

            db.session.commit()

        except IntegrityError as e:
            db.session.rollback()
            return self.response_error("Database refused push!" + '\n' + e.orig.diag.message_detail)
