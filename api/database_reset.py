# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: database_reset.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from sqlalchemy.exc import DBAPIError

from models.models import Person



class DatabaseRestResource(MasterResource):
    def get(self,key):
        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")
        # print(key)
        # print(type(key))
        # print(key == 12345)
        if key != 12345:
            return self.response_error("Bad KEY!", "bad key")

        db.drop_all()
        db.create_all()
        person = Person(email       = "admin@admin.com",
                        user_type   = 5,
                        username    = "admin",
                        password    = "admin")

        db.session.add(person)
        db.session.commit()

        return self.response_ok("Databse is reseted, added only admin")