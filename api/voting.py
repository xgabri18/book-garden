from flask_restful import Resource
from flask import jsonify,request
from shared_db import db

from models.models import Voting


class VotingResource(Resource):

    def get(self, id=None):
        if id is None:
            voting = Voting.query.all()

            array = []
            for row in voting:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return jsonify(array)

        else:
            voting = Voting.query.filter_by(id=id).all()

            if voting:
                voting = voting[0].__dict__
                del voting["_sa_instance_state"]

            return jsonify(voting)


    def post(self, id=None):
        stock_id  = request.form.get("stock_id")
        person_id = request.form.get("person_id")
        vote      = request.form.get("vote")

        voting = Voting(stock_id        = stock_id,
                        person_id       = person_id,
                        vote            = vote)

        db.session.add(voting)
        db.session.commit()


    def delete(self, id):
        Voting.query.filter_by(id=id).delete()
        db.session.commit()


    def put(self, id):  # vote changed
        voting = Voting.query.filter_by(id=id).first()

        if not voting:
            return

        voting.fine = request.form.get("vote")

        db.session.commit()
