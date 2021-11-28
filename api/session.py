# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: session.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request,session
from models.models import Person


class SessionResource(MasterResource):
    def get(self):
        return self.response_ok({'user_id': session.get("user_id"), 'user_type': session.get("user_type")})

    # Login
    # can be done at any time by anyone -> if logged it re-logs
    def post(self):
        # user_type = request.form.get("user_type")
        # session['user_type'] = user_type

        username = request.form.get("username")
        password = request.form.get("password")

        user = Person.query.filter_by(username=username, password=password).first()
        if user:
            session['user_id'] = user.id
            session['user_type'] = user.user_type
            return self.response_ok("Logged in successfully")
        else:
            return self.response_error("Username or password incorrect!", "")

    # Logout
    def delete(self):
        if not self.is_logged():
            return self.response_error("No session present!", "")
        del session['user_id']
        del session['user_type']
        return self.response_ok("Logged out successfully!")



