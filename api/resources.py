from flask_restful import Resource
from flask import jsonify,request
from shared_db import db


from models.models import Bitch

class Testando(Resource):
    def get(self,name):
        print( )
        return {"data" : "Hej Gej Fungujem - " + name + "-" + str(Bitch.query.all()[0])} #


class Books(Resource):
    def get(self):
        data = Bitch.query.all()

        array = []
        for line in data:
            line = line.__dict__
            del line["_sa_instance_state"]
            array.append(line)

        return jsonify(array)

    def post(self):
        return "TODO"
        # data =
        # todos[todo_id] = request.form['data']
        # return {todo_id: todos[todo_id]}


#api-file.add_resource(Testando, "/skuska")