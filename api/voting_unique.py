from flask_restful import Resource
from flask import jsonify,request
from shared_db import db

from models.models import Voting


# gets number of votes on stock
# everyone can acess it, session not needed
class VotesOnStockRes(Resource):

    def get(self, stock_id):
        votes = Voting.query.filter(Voting.stock_id == stock_id).all()

        return jsonify(len(votes))


# gets list of stock where user voted
# todo session asi needed
class VotesFromPersonRes(Resource):

    def get(self, person_id):
        votes = Voting.query.filter(Voting.person_id == person_id).all()

        array = []
        for row in votes:
            row = row.__dict__
            del row["_sa_instance_state"]
            array.append(row)

        return jsonify(array)


# gets list of stock where user voted
# todo session asi needed
class VotesPersonVotedStockRes(Resource):

    def get(self, person_id,stock_id):
        vote = Voting.query.filter(Voting.person_id == person_id, Voting.stock_id == stock_id).all()

        if not vote:
            return jsonify(False)
        else:
            return jsonify(True)





