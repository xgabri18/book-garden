from flask_restful import Resource
from flask import jsonify,request,session
from shared_db import db
from urllib import parse

from models.models import Stock,BookTitle

class StockFilterResource(Resource):

    # Filter stocks
    # todo session
    def get(self):

        availability    = request.args.get('availability')
        library_id      = request.args.get('library_id')
        booktitle_id    = request.args.get('booktitle_id')
        author          = request.args.get('author')
        genre           = request.args.get('genre')
        name            = request.args.get('name')

        stock = Stock.query

        if availability is not None:
            stock = stock.filter_by(availability = availability)

        if library_id is not None:
            stock = stock.filter_by(library_id = library_id)

        if booktitle_id is not None:
            stock = stock.filter_by(booktitle_id = booktitle_id)

        if author is not None:
            booktitles = BookTitle.query.with_entities(BookTitle.id).filter(BookTitle.author == author).all()
            booktitles_array = []
            for bk in booktitles:
                booktitles_array.append(bk[0])

            stock = stock.filter(Stock.booktitle_id.in_(booktitles_array))

        if genre is not None:
            booktitles = BookTitle.query.with_entities(BookTitle.id).filter(BookTitle.genre == genre).all()
            booktitles_array = []
            for bk in booktitles:
                booktitles_array.append(bk[0])

            stock = stock.filter(Stock.booktitle_id.in_(booktitles_array))

        if name is not None:
            booktitles = BookTitle.query.with_entities(BookTitle.id).filter(BookTitle.name.contains(name)).all()
            booktitles_array = []
            for bk in booktitles:
                booktitles_array.append(bk[0])

            stock = stock.filter(Stock.booktitle_id.in_(booktitles_array))

        stock = stock.all()
        array = []
        for row in stock:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return jsonify(array)




