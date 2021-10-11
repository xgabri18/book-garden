from flask_restful import Resource
from flask import jsonify,request
from shared_db import db

from models.models import BookTitle,Person,Library



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


class PersonResource(Resource):
    def get(self,email = None):
        if id is None:
            person = Person.query.all()

            array = []
            for row in person:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return jsonify(array)

        else:
            person = Person.query.filter_by(email = email).all()

            person = person[0].__dict__
            del person["_sa_instance_state"]

            return jsonify(person)


    def post(self,email= None):
        #osetrit ze mail uz je zadany
        email     = request.form.get("email")
        user_type = request.form.get("user_type")
        username  = request.form.get("username")
        password  = request.form.get("password")
        name      = request.form.get("name")
        surname   = request.form.get("surname")

        person = Person(email     = email,
                        user_type = user_type,
                        username  = username,
                        password  = password,
                        name      = name,
                        surname   = surname)

        db.session.add(person)
        db.session.commit()


    def delete(self,email):
        Person.query.filter_by(email=email).delete()
        db.session.commit()


    def put(self,email):
        person = Person.query.filter_by(email=email).first()

        email     = request.form.get("email")
        user_type = request.form.get("user_type")
        username  = request.form.get("username")
        password  = request.form.get("password")
        name      = request.form.get("name")
        surname   = request.form.get("surname")


        person.email     = email
        person.user_type = user_type
        person.username  = username
        person.password  = password
        person.name      = name
        person.surname   = surname

        db.session.commit()


class LibraryResource(Resource):
    def get(self,id = None):
        if id is None:
            library = Library.query.all()

            array = []
            for row in library:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return jsonify(array)

        else:
            library = Library.query.filter_by(id = id).all()

            library = library[0].__dict__
            del library["_sa_instance_state"]

            return jsonify(library)


    def post(self,id = None):
        name        = request.form.get("name")
        city        = request.form.get("city")
        street      = request.form.get("street")
        open_hours  = request.form.get("open_hours")
        description = request.form.get("description")


        library = Library(name        = name,
                          city        = city,
                          street      = street,
                          open_hours  = open_hours,
                          description = description)

        db.session.add(library)
        db.session.commit()


    def delete(self,id):
        Library.query.filter_by(id=id).delete()
        db.session.commit()


    def put(self,id):
        library = Library.query.filter_by(id=id).first()

        name        = request.form.get("name")
        city        = request.form.get("city")
        street      = request.form.get("street")
        open_hours  = request.form.get("open_hours")
        description = request.form.get("description")


        library.name        = name
        library.city        = city
        library.street      = street
        library.open_hours  = open_hours
        library.description = description

        db.session.commit()


