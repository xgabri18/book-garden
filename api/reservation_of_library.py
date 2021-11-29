# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: reservation_of_library.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Reservation,Stock,Library,BookTitle,Person

# SET response_error a response_ok



class ReservationOfLibraryRes(MasterResource):

    # Get all reservations in specific library
    # Admin or Librarian (in his/her own library)
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
            res = Reservation.query.filter(Reservation.stock_id.in_(stock_id_array), Reservation.person_id == person_id).all()
        else:
            res = Reservation.query.filter(Reservation.stock_id.in_(stock_id_array)).all()


        final = []
        try:
            for reservation in res:
                #print(reservation)
                reservation = reservation.__dict__
                stock = Stock.query.filter_by(id = reservation["stock_id"]).first().__dict__

                lib_name = Library.query.with_entities(Library.name).filter_by(id = stock["library_id"]).first()
                book_title = BookTitle.query.with_entities(BookTitle.name).filter_by(id = stock["booktitle_id"]).first()

                person = Person.query.filter_by(id=reservation["person_id"]).first()



                if person is None:
                    name = ""
                    surname = ""
                else:
                    person = person.__dict__

                    name = person["name"]
                    surname = person["surname"]

                del reservation["_sa_instance_state"]
                reservation["name"] = name
                reservation["surname"] = surname
                reservation["Library_name"] = lib_name[0][0]
                reservation["Book_title"] =  book_title[0][0]

                final.append(reservation)
        except (AttributeError, IndexError):
            return self.response_ok({})

        return self.response_ok(final)

        #
        # array = []
        # for row in reservations:
        #     row = row.__dict__
        #     del row["_sa_instance_state"]
        #     array.append(row)
        #
        # return self.response_ok(array)



