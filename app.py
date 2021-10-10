from flask import Flask,send_from_directory
from flask_restful import Api
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from shared_db import db
from api.resources import BookTitleResource,PersonResource,LibraryResource
from models.models import BookTitle,Person,Library


app = Flask(__name__, static_url_path='', static_folder='frontend/build')


# username:password@server/db
#toto mozno do env variable
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://yenewkmhgqretf:34c9ca2c665494adcad3ca82982bd708cf2c19cdf32c9e8597f9b7a0c7f3912e@ec2-34-247-118-233.eu-west-1.compute.amazonaws.com:5432/d4h6icjgreq9p4'
app.config['SECRET_KEY'] = 'kok420'

#db = SQLAlchemy(app)
db.init_app(app)
admin = Admin(app)
api = Api(app)


class PersionView(ModelView):
    name = "Person"
    column_list = ('email', 'user_type', 'username','password','name','surname')

admin.add_view(ModelView(BookTitle,db.session))
admin.add_view(PersionView(Person,db.session))
admin.add_view(ModelView(Library,db.session))


api.add_resource(BookTitleResource, '/api/booktitle/<int:id>')
api.add_resource(PersonResource,    '/api/person/<string:email>')
api.add_resource(LibraryResource,   '/api/library/<int:id>')


# @app.route('/')
# def index():
#     return send_from_directory('frontend/build', 'index.html')

# @app.route("/reset")
# def reset():
#     db.drop_all()
#     db.create_all()
#     return "resetoval som db"


if __name__ == "__main__":
    app.run(debug=True)
