from api.masterclass import MasterResource
from flask import jsonify,request,session
from shared_db import db
from sqlalchemy.exc import IntegrityError

from models.models import Voting

# SET response_error a response_ok
# osetrene

class VotingResource(MasterResource):

    # Get all votes
    # Admin
    def get(self, id=None):

        if not (self.is_logged() and self.is_admin()):
            return self.response_error("Unauthorised action!")

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
        if not self.is_logged():
            return self.response_error("Unauthorised action!")
        stock_id  = request.form.get("stock_id")
        person_id = session['user_id'] #request.form.get("person_id")

        try:
            voting = Voting(stock_id        = stock_id,
                            person_id       = person_id)

            db.session.add(voting)
            db.session.commit()

        except IntegrityError as e:
            db.session.rollback()
            return self.response_error(e.orig.diag.message_detail)

        return self.response_ok("Committed to db")


    def delete(self, id):
        if not self.is_logged():
            return self.response_error("Unauthorised action!")

        voting = Voting.query.filter_by(id=id).first()
        if not (self.is_admin() or self.is_user(voting.person_id)):
            return self.response_error("Unauthorised action!")

        Voting.query.filter_by(id=id).delete()
        db.session.commit()

        return self.response_ok("Committed to db")


    # def put(self, id):  # vote changed
    #     voting = Voting.query.filter_by(id=id).first()
    #
    #     if not voting:
    #         return self.response_error("Voting doesnt exist")
    #
    #     voting.fine = request.form.get("vote")
    #
    #     db.session.commit()
    #
    #     return self.response_ok("Committed to db")
