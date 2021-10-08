# from flask import Flask, send_from_directory
# from flask_restful import Api
# from routes import *
#
# # Initialize app
# app = Flask(__name__, static_url_path='', static_folder='frontend/build')
#
# # Initialize api
# api = Api(app)
#
# # Register Blueprints
# app.register_blueprint(routes)
#
# # Register api
# from api.HelloApiHandler import HelloApiHandler
# api.add_resource(HelloApiHandler, '/api/hello')


from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql

from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
import sys


# username:password@server/db
app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://testujemeVonku:jebek@testujemeVonku.mysql.pythonanywhere-services.com/testujemeVonku$jebek'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:hranolky69@127.0.0.1/testovic'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://yenewkmhgqretf:34c9ca2c665494adcad3ca82982bd708cf2c19cdf32c9e8597f9b7a0c7f3912e@ec2-34-247-118-233.eu-west-1.compute.amazonaws.com:5432/d4h6icjgreq9p4'
app.config['SECRET_KEY'] = 'kok420'

db = SQLAlchemy(app)

admin = Admin(app)

class Bitch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(120))

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username


admin.add_view(ModelView(Bitch,db.session))



@app.route("/")
def index():

    return """<html>
<head>
<title>Flask Tutorial</title>
</head>
<body>
<a href="/create">create</a>
<br>
<a href="insert">insert</a>
<br>
<a href="data">data</a>
<br>
welcome to the jungle madafaka
</body>
</html> """

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
