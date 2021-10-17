from flask_restful import Resource
from flask import jsonify,request
from shared_db import db

from models.models import BookTitle



class BookTitleResource(Resource):
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


    def post(self,id = None):
        name        = request.form.get("name")
        authors     = request.form.get("authors")
        publisher   = request.form.get("publisher")
        isbn        = request.form.get("isbn")
        genre       = request.form.get("genre")
        description = request.form.get("description")
        rating      = request.form.get("rating")

        booktitle = BookTitle(name        = name,
                              authors     = authors,
                              publisher   = publisher,
                              isbn        = isbn,
                              genre       = genre,
                              description = description,
                              rating      = rating)

        db.session.add(booktitle)
        db.session.commit()


    def delete(self,id):
        BookTitle.query.filter_by(id=id).delete()
        db.session.commit()


    def put(self,id):

        booktitle = BookTitle.query.filter_by(id=id).first()

        if not booktitle:
            return

        name        = request.form.get("name")
        authors     = request.form.get("authors")
        publisher   = request.form.get("publisher")
        isbn        = request.form.get("isbn")
        genre       = request.form.get("genre")
        description = request.form.get("description")
        rating      = request.form.get("rating")

        booktitle.name        = name
        booktitle.authors     = authors
        booktitle.publisher   = publisher
        booktitle.isbn        = isbn
        booktitle.genre       = genre
        booktitle.description = description
        booktitle.rating      = rating

        db.session.commit()

