# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: stock_info.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request
from shared_db import db

from models.models import Stock, Library, BookTitle

# SET response_error a response_ok


# takes stock ID and returns Library name and Book Name
# session not needed
class StockInfoResource(MasterResource):
    def get(self,id):

        stock = Stock.query.filter_by(id = id).all()
        #print(stock)
        if not stock:
            return self.response_ok([])

        stock = stock[0].__dict__
        #print(stock)
        lib_name = Library.query.with_entities(Library.name).filter_by(id = stock["library_id"]).all()
        book_title = BookTitle.query.with_entities(BookTitle.name).filter_by(id = stock["booktitle_id"]).all()

        result = {"Library_name" : lib_name[0][0], "Book_title" : book_title[0][0]}
        # print(type(lib_name[0][0]))
        # print(book_title)



        return self.response_ok(result)



