# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: voting_unique.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################


from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Voting


# gets number of votes on stock
# everyone can acess it, session not needed
class VotesOnStockRes(MasterResource):

    def get(self, stock_id):
        votes = Voting.query.filter(Voting.stock_id == stock_id).all()

        return self.response_ok(len(votes))


# gets list of stocks where user voted
# Can be done by User with user_id and Admin
class VotesFromPersonRes(MasterResource):

    def get(self, person_id):
        if not (self.is_logged() and (self.is_admin() or self.is_user(person_id))):  # is the right person logged //librarian/admin
            return self.response_error("Unauthorised action!", "")

        votes = Voting.query.filter(Voting.person_id == person_id).all()

        array = []
        for row in votes:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return self.response_ok(array)


# Did logged person vote for this stock
class VotesDidPersonVoteStockRes(MasterResource):

    def get(self, stock_id):
        if not self.is_logged():
            return self.response_error("Unauthorised action!", "")

        vote = Voting.query.filter(Voting.person_id == session['user_id'], Voting.stock_id == stock_id).all()

        if not vote:
            return self.response_ok(False)
        else:
            return self.response_ok(True)





