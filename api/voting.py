from api.masterclass import MasterResource
from flask import jsonify,request
from shared_db import db

from models.models import Voting

# SET response_error a response_ok
# osetrene

class VotingResource(MasterResource):

    def get(self, id=None):
        if id is None:
            voting = Voting.query.all()

            array = []
            for row in voting:
                row = row.__dict__
                del row["_sa_instance_state"]
                array.append(row)

            return self.response_ok(array)

        else:
            voting = Voting.query.filter_by(id=id).all()

            if voting:
                voting = voting[0].__dict__
                del voting["_sa_instance_state"]

            return self.response_ok(voting)

    # TODO ako vobec bude vote fungovat, ked je to len ze ci palec hore alebo ne tak potom bud post alebo put alebo delete nedava zmysel
    def post(self, id=None):
        stock_id  = request.form.get("stock_id")
        person_id = request.form.get("person_id")

        voting = Voting(stock_id        = stock_id,
                        person_id       = person_id)

        db.session.add(voting)
        db.session.commit()

        return self.response_ok("Committed to db")


    def delete(self, id):
        Voting.query.filter_by(id=id).delete()
        db.session.commit()

        return self.response_ok("Committed to db")


    def put(self, id):  # vote changed
        voting = Voting.query.filter_by(id=id).first()

        if not voting:
            return self.response_error("Voting doesnt exist")

        voting.fine = request.form.get("vote")

        db.session.commit()

        return self.response_ok("Committed to db")
