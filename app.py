from flask import Flask,send_from_directory
from flask_restful import Api
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from shared_db import db
from api.resources import Testando,Books
from models.models import Bitch


app = Flask(__name__, static_url_path='', static_folder='frontend/build')


# username:password@server/db
#toto mozno do env variable
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://yenewkmhgqretf:34c9ca2c665494adcad3ca82982bd708cf2c19cdf32c9e8597f9b7a0c7f3912e@ec2-34-247-118-233.eu-west-1.compute.amazonaws.com:5432/d4h6icjgreq9p4'
app.config['SECRET_KEY'] = 'kok420'

#db = SQLAlchemy(app)
db.init_app(app)
admin = Admin(app)
api = Api(app)

admin.add_view(ModelView(Bitch,db.session))

api.add_resource(Testando, '/api/<name>')
api.add_resource(Books, '/api/books')


# @app.route('/')
# def index():
#     return send_from_directory('frontend/build', 'index.html')

# @app.route("/reset")
# def create():
#     db.drop_all()
#     db.create_all()
#     return "resetoval som db"

@app.route("/create")
def create():
    db.create_all()
    return "vytvoril som db"

@app.route("/insert")
def insert():
    new_post=  Bitch(username = "nibbatron", email = "pussydestroyer420")
    db.session.add(new_post)
    db.session.commit()

    return "pridal som demo data"

@app.route("/data")
def data():
    x = Bitch.query.all()
    print(type(x))
    print(str(x))

    gej = ""
    for kok in x:
        kok = kok.__dict__
        del kok["_sa_instance_state"]
        print(str(kok))
        gej += (str(kok) + "<br>" + "\n")

    print(gej)
    return gej

if __name__ == "__main__":
    app.run(debug=True)
