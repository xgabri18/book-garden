from flask_restful import Resource
from flask import jsonify,request,session
from models.models import Person


class SessionResource(Resource):
    def get(self):
        return jsonify(session.get("user_id"))

    def post(self):  # login
        # user_type = request.form.get("user_type")
        # session['user_type'] = user_type

        username = request.form.get("username")
        password = request.form.get("password")

        user = Person.query.filter_by(username=username, password=password).first()
        if user:
            session['user_id'] = user.id
            return "Logged in successfully"
        else:
            return "Username or password incorrect!"

    def delete(self):
        del session['user_id']



