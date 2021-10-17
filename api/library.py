from flask_restful import Resource
from flask import jsonify,request
from shared_db import db

from models.models import Library

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


