# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: book_title.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from sqlalchemy.exc import DBAPIError

from models.models import BookTitle,Library,Stock

# SET response_error a response_ok


class BookTitleResource(MasterResource):
    def get(self,id = None):
        if id is None:
            booktitle = BookTitle.query.all()

            array = []
            for row in booktitle:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return self.response_ok(array)

        else:
            booktitle = BookTitle.query.filter_by(id = id).all()

            if booktitle:
                booktitle = booktitle[0].__dict__
                del booktitle["_sa_instance_state"]

            return self.response_ok(booktitle)

    # Add book to DB
    # Can be done by Admin and Distributor
    def post(self,id = None):
        if not (self.is_logged() and (self.is_admin() or self.is_distributor())):
            return self.response_error("Unauthorised action!", "")

        name        = request.form.get("name")
        author      = request.form.get("author")
        publisher   = request.form.get("publisher")
        isbn        = request.form.get("isbn")
        if isbn == "":
            isbn = None
        genre       = request.form.get("genre")
        description = request.form.get("description")
        rating      = request.form.get("rating")
        if rating == "":
            rating = None
        photo       = request.form.get("photo")
        date_publication = request.form.get("date_publication")
        if date_publication == "":
            date_publication = None

        try:
            booktitle = BookTitle(name        = name,
                                  author      = author,
                                  publisher   = publisher,
                                  isbn        = isbn,
                                  genre       = genre,
                                  description = description,
                                  rating      = rating,
                                  photo       = photo,
                                  date_publication = date_publication)

            db.session.add(booktitle)
            db.session.commit()

        except DBAPIError as e:
            db.session.rollback()
            return self.response_error("Database refused push (check if ISBN is unique)!",
                                       str(e.__dict__.get('orig')))

        # autostock
        libraries = Library.query.all()
        if not libraries:
            return

        for row in libraries:
            row = row.__dict__
            stock = Stock(library_id=row["id"], booktitle_id=booktitle.id, amount=0)
            db.session.add(stock)

        db.session.commit()

        return self.response_ok("Committed to db")

    # Delete a book from DB
    # Can be done by Admin
    def delete(self, id):

        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!", "")

        booktitle = BookTitle.query.filter_by(id=id).first()  # .delete() doesnt work -> doesnt cascade
        if booktitle:
            db.session.delete(booktitle)  # required because of cascade
        db.session.commit()

        return self.response_ok("Committed to db")

    # Update any book
    # Can be done by Admin and Distributor
    def put(self,id):

        if not (self.is_logged() and (self.is_admin() or self.is_distributor())):
            return self.response_error("Unauthorised action!", "")

        booktitle = BookTitle.query.filter_by(id=id).first()

        if not booktitle:
            return self.response_error("Booktitle doesn't exist!", "")

        name        = request.form.get("name")
        author      = request.form.get("author")
        publisher   = request.form.get("publisher")
        isbn        = request.form.get("isbn")
        if isbn == "":
            isbn = None
        genre       = request.form.get("genre")
        description = request.form.get("description")
        rating      = request.form.get("rating")
        if rating == "":
            rating = None
        photo       = request.form.get("photo")
        date_publication = request.form.get("date_publication")
        if date_publication == "":
            date_publication = None

        try:
            booktitle.name        = name
            booktitle.author      = author
            booktitle.publisher   = publisher
            booktitle.isbn        = isbn
            booktitle.genre       = genre
            booktitle.description = description
            booktitle.rating      = rating
            booktitle.photo       = photo
            booktitle.date_publication = date_publication

            db.session.commit()

        except DBAPIError as e:
            db.session.rollback()
            return self.response_error("Unable to update, check if ISBN less than 13 characters and unique!",
                                       str(e.__dict__.get('orig')))

        return self.response_ok("Committed to db")

