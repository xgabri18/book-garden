from flask_restful import Api, Resource, reqparse

class HelloApiHandler(Resource):
    def get(self):
        return {
            'status': 'ok',
            'msg': 'Hello there'
        }