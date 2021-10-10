from flask_restful import Resource
from flask import jsonify,request
from shared_db import db


from models.models import BookTitle



class BookTitleResource(Resource):
    def get(self,id):
        print(id)
        data = BookTitle.query.filter_by(id = id).all()

        data = data[0].__dict__
        del data["_sa_instance_state"]

        return jsonify(data)


    def post(self,id):
        name        = request.form.get("name")
        authors     = request.form.get("authors")
        publisher   = request.form.get("publisher")
        isbn        = request.form.get("isbn")
        genre       = request.form.get("genre")
        description = request.form.get("description")
        rating      = request.form.get("rating")

        print(name)
        # name        = request["name"]
        # print(name)

        new_data=  BookTitle(name        = name,
                             authors     = authors,
                             publisher   = publisher,
                             isbn        = isbn,
                             genre       = genre,
                             description = description,
                             rating      = rating)

        db.session.add(new_data)
        db.session.commit()


    def delete(self,id):
        BookTitle.query.filter_by(id=id).delete()
        db.session.commit()


    def put(self,id):

        name        = request.form.get("name")
        authors     = request.form.get("authors")
        publisher   = request.form.get("publisher")
        isbn        = request.form.get("isbn")
        genre       = request.form.get("genre")
        description = request.form.get("description")
        rating      = request.form.get("rating")

        booktitle = BookTitle.query.filter_by(id=id).first()

        booktitle.name        = name
        booktitle.authors     = authors
        booktitle.publisher   = publisher
        booktitle.isbn        = isbn
        booktitle.genre       = genre
        booktitle.description = description
        booktitle.rating      = rating

        db.session.commit()



#api-file.add_resource(Testando, "/skuska")

# class User(db.Model):
#     #id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.Unicode(100), primary_key=True)  # this makes more sense than id
#     user_type = db.Column(db.String(20), nullable=False)  # ADMIN/LIBRARIAN/DISTRIBUTOR/LOGUSER - permissions ????
#     username = db.Column(db.Unicode(100))  # ????
#     password = db.Column(db.Unicode(100))
#     #email = db.Column(db.Unicode(100), nullable=False)
#     name = db.Column(db.Unicode(100))
#     surname = db.Column(db.Unicode(100))
#     # profiledesc = db.Column(db.UnicodeText())
#
#     reservations = db.relationship("Reservation", backref="user")
#     borrowings = db.relationship("Borrowing", backref="user")
#
#
# class Library(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.Unicode(100))
#     city = db.Column(db.Unicode(100))
#     street = db.Column(db.Unicode(100))
#     open_hours = db.Column(db.UnicodeText)
#     description = db.Column(db.UnicodeText)
#
#     stocks = db.relationship("Stock", backref="library")
#
#
