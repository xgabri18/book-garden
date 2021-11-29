# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: borrowing_of_library.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from datetime import datetime

from models.models import Borrowing,Stock,Library,BookTitle,Person

# SET response_error a response_ok



class BorrowingOfLibraryRes(MasterResource):

    # Get list of all borrowings inside a specific library
    def get(self, library_id):

        if not (self.is_logged() and (self.is_admin() or self.is_librarian())):
            return self.response_error("Unauthorised action!", "")

        if self.is_librarian():  # check if librarian works in the library where he wants to change stuff
            if library_id != self.librarian_in_which_lib(session['user_id']):
                return self.response_error("Unauthorised action!", "")


        #get id of stock of library - array of ids
        stock_id = Stock.query.with_entities(Stock.id).filter_by(library_id = library_id).all()
        stock_id_array = []
        for id in stock_id:
            stock_id_array.append(id[0])


        person_id      = request.args.get('person_id')

        if person_id is not None:
            bor = Borrowing.query.filter(Borrowing.stock_id.in_(stock_id_array),Borrowing.person_id == person_id).all()
        else:
            bor = Borrowing.query.filter(Borrowing.stock_id.in_(stock_id_array)).all()

        final = []
        try:
            for borrowing in bor:
                borrowing = borrowing.__dict__
                stock = Stock.query.filter_by(id = borrowing["stock_id"]).first().__dict__

                lib_name = Library.query.with_entities(Library.name).filter_by(id = stock["library_id"]).all()
                book_title = BookTitle.query.with_entities(BookTitle.name).filter_by(id = stock["booktitle_id"]).all()

                person = Person.query.filter_by(id=borrowing["person_id"]).first()

                if person is None:
                    name = ""
                    surname = ""
                else:
                    person = person.__dict__

                    name = person["name"]
                    surname = person["surname"]


                del borrowing["_sa_instance_state"]
                borrowing["name"] = name
                borrowing["surname"] = surname
                borrowing["Library_name"] = lib_name[0][0]
                borrowing["Book_title"] =  book_title[0][0]

                final.append(borrowing)
        except (AttributeError, IndexError):
            return self.response_ok({})

        return self.response_ok(final)




        # array = []
        # for row in borrowings:
        #     row = row.__dict__
        #     del row["_sa_instance_state"]
        #     array.append(row)
        #
        # return self.response_ok(array)
