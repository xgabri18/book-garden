from flask_restful import Resource
from flask import jsonify,request
from shared_db import db

from models.models import Library,BookTitle,Stock

class LibraryResource(Resource):
    def get(self,id = None):

        #get all libraries when ID is not specified
        if id is None:
            library = Library.query.all()

            array = []
            for row in library:
                row = row.__dict__
                del row["_sa_instance_state"]   #get rid of _sa_instance_state - idk what it is
                array.append(row)

            return jsonify(array)

        else:
            library = Library.query.filter_by(id = id).all()

            if library:
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

        #autostock when added library
        booktitle = BookTitle.query.all()
        if not booktitle:
            return

        for row in booktitle:
            row = row.__dict__
            stock = Stock(library_id = library.id,booktitle_id = row["id"], amount = 0, availability = "None")
            db.session.add(stock)

        db.session.commit()


    def delete(self,id):
        Library.query.filter_by(id=id).delete()
        db.session.commit()


    def put(self,id):
        library = Library.query.filter_by(id=id).first()

        if not library:
            return

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


