from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import BookTitle,Library,Stock


class BookTitleResource(MasterResource):
    def get(self,id = None):
        if id is None:
            booktitle = BookTitle.query.all()

            array = []
            for row in booktitle:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return jsonify(array)

        else:
            booktitle = BookTitle.query.filter_by(id = id).all()

            if booktitle:
                booktitle = booktitle[0].__dict__
                del booktitle["_sa_instance_state"]

            return jsonify(booktitle)

    # Add book to DB
    # Can be done by Admin and Distributor
    def post(self,id = None):
        if not (self.is_logged() and (self.is_admin() or self.is_distributor())):
            return self.response_error("Unauthorised action!")

        name        = request.form.get("name")
        author      = request.form.get("author")
        publisher   = request.form.get("publisher")
        isbn        = request.form.get("isbn")
        genre       = request.form.get("genre")
        description = request.form.get("description")
        rating      = request.form.get("rating")

        booktitle = BookTitle(name        = name,
                              author      = author,
                              publisher   = publisher,
                              isbn        = isbn,
                              genre       = genre,
                              description = description,
                              rating      = rating)

        db.session.add(booktitle)
        db.session.commit()

        # autostock
        libraries = Library.query.all()
        if not libraries:
            return

        for row in libraries:
            row = row.__dict__
            stock = Stock(library_id=row["id"], booktitle_id=booktitle.id, amount=0, availability="None")
            db.session.add(stock)

        db.session.commit()

    # Delete a book from DB
    # Can be done by Admin
    def delete(self, id):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")

        BookTitle.query.filter_by(id=id).delete()
        db.session.commit()

    # Update any book
    # Can be done by Admin and Distributor
    def put(self,id):
        if not (self.is_logged() and (self.is_admin() or self.is_distributor())):
            return self.response_error("Unauthorised action!")

        booktitle = BookTitle.query.filter_by(id=id).first()

        if not booktitle:
            return

        name        = request.form.get("name")
        author      = request.form.get("author")
        publisher   = request.form.get("publisher")
        isbn        = request.form.get("isbn")
        genre       = request.form.get("genre")
        description = request.form.get("description")
        rating      = request.form.get("rating")

        booktitle.name        = name
        booktitle.author      = author
        booktitle.publisher   = publisher
        booktitle.isbn        = isbn
        booktitle.genre       = genre
        booktitle.description = description
        booktitle.rating      = rating

        db.session.commit()

