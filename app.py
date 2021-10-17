from flask import Flask,send_from_directory,session
from flask_restful import Api
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from shared_db import db
from api.library import LibraryResource
from api.book_title import BookTitleResource
from api.person import PersonResource
from api.session import SessionResource
from api.stock import StockResource
from models.models import BookTitle,Person,Library,Stock


app = Flask(__name__, static_url_path='', static_folder='frontend/build')


# username:password@server/db
#toto mozno do env variable
app.config['SECRET_KEY'] = 'kok420'
app.config['SESSION_TYPE'] = 'sqlalchemy'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://yenewkmhgqretf:34c9ca2c665494adcad3ca82982bd708cf2c19cdf32c9e8597f9b7a0c7f3912e@ec2-34-247-118-233.eu-west-1.compute.amazonaws.com:5432/d4h6icjgreq9p4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



# toto musi byt pod config
db.init_app(app)
admin = Admin(app)

app.config['SESSION_SQLALCHEMY'] = db



api = Api(app, prefix="/api")


# class PersionView(ModelView):
#     name = "Person"
#     column_list = ('email', 'user_type', 'username','password','name','surname')

admin.add_view(ModelView(BookTitle,db.session))
admin.add_view(ModelView(Person,db.session))
admin.add_view(ModelView(Library,db.session))
admin.add_view(ModelView(Stock,db.session))


api.add_resource(BookTitleResource,'/booktitle', '/booktitle/<int:id>')
api.add_resource(PersonResource,  '/person',  '/person/<int:id>')
api.add_resource(LibraryResource,  '/library', '/library/<int:id>')
api.add_resource(SessionResource,  '/session')
api.add_resource(StockResource,  '/stock', '/stock/<int:id>')



# @app.route('/')
# def index():
#     return send_from_directory('frontend/build', 'index.html')

# @app.route("/reset")
# def reset():
#     db.drop_all()
#     db.create_all()
#     return "resetoval som db"

#
# @app.route('/set/<value>')
# def set_session(value):
#     session['user_type'] = value
#     return f'The value you set is: { value }'
#
# @app.route('/get')
# def get_session():
#     return f'The value in the session is: { session.get("user_type") }'


if __name__ == "__main__":
    app.run(debug=True)
