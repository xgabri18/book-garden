from api.masterclass import MasterResource
from flask import jsonify,request
from shared_db import db

from models.models import Stock, Library, BookTitle


# takes stock ID and returns Library name and Book Name
# session not needed
class StockInfoResource(MasterResource):
    def get(self,id ):

        stock = Stock.query.filter_by(id = id).all()[0].__dict__
        #print(stock)
        lib_name = Library.query.with_entities(Library.name).filter_by(id = stock["library_id"]).all()
        book_title = BookTitle.query.with_entities(BookTitle.name).filter_by(id = stock["booktitle_id"]).all()

        result = {"Library_name" : lib_name[0][0], "Book_title" : book_title[0][0]}
        # print(type(lib_name[0][0]))
        # print(book_title)



        return jsonify(result)



