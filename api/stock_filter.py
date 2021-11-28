# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: stock_filter.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from urllib import parse

from models.models import Stock,BookTitle

class StockFilterResource(MasterResource):

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
            if availability.lower() == "true":
                availability = True
                stock = stock.filter_by(availability = availability)
            else:
                availability = False
                stock = stock.filter_by(availability = availability)



        if library_id is not None:
            stock = stock.filter_by(booktitle_id = library_id)

        if booktitle_id is not None:
            print(booktitle_id)
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
        print(stock)
        array = []
        for row in stock:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return self.response_ok(array)




