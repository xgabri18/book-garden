from flask_restful import Resource
from flask import jsonify,request,session


class SessionResource(Resource):
    def get(self):
        return jsonify( session.get("user_type"))

    def post(self):
        user_type = request.form.get("user_type")
        session['user_type'] = user_type

    def delete(self):
        user_type = request.form.get("user_type")
        del session['user_type']



