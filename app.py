from flask import Flask, send_from_directory
from flask_restful import Api
from routes import *

# Initialize app
app = Flask(__name__, static_url_path='', static_folder='frontend/build')

# Initialize api
api = Api(app)

# Register Blueprints
app.register_blueprint(routes)

# Register api
from api.HelloApiHandler import HelloApiHandler
api.add_resource(HelloApiHandler, '/api/hello')