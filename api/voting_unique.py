from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db

from models.models import Voting


# gets number of votes on stock
# everyone can acess it, session not needed
class VotesOnStockRes(MasterResource):

    def get(self, stock_id):
        votes = Voting.query.filter(Voting.stock_id == stock_id).all()

        return jsonify(len(votes))


# gets list of stocks where user voted
# Can be done by User with user_id and Admin
class VotesFromPersonRes(MasterResource):

    def get(self, person_id):
        if not (session['user_id'] == person_id or session['user_type'] == 5):  # is the right person logged // admin
            return "nenenene"

        votes = Voting.query.filter(Voting.person_id == person_id).all()

        array = []
        for row in votes:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return jsonify(array)


# gets list of stock where user voted
# todo session asi needed
class VotesPersonVotedStockRes(MasterResource):

    def get(self, person_id,stock_id):
        vote = Voting.query.filter(Voting.person_id == person_id, Voting.stock_id == stock_id).all()

        if not vote:
            return jsonify(False)
        else:
            return jsonify(True)





