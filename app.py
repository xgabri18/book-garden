# ####################################################### #
# Brief: Main script                                      #
# Project: System for libraries                           #
# File: app.py                                            #
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>     #
#          Roman Országh <xorsza01(at)fit.vutbr.cz>        #
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>            #
# ####################################################### #

from flask import Flask,send_from_directory,session
from flask_restful import Api
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from shared_db import db
from api.library import LibraryResource
from api.book_title import BookTitleResource
from api.book_title_unique import BookTitleGenreRes,BookTitleAuthorRes
from api.person import PersonResource
from api.session import SessionResource

from api.stock import StockResource
from api.stock_info import StockInfoResource
from api.stock_filter import StockFilterResource

from api.reservation import ReservationResource
from api.reservation_of_person import ReservationOfPersonRes
from api.reservation_of_library import ReservationOfLibraryRes
from api.reservation_to_borrow import ReservationConfirmRes
from api.reservation_info import ReservationInfoResource

from api.borrowing import BorrowingResource
from api.borrowing_of_person import BorrowingOfPersonRes
from api.borrowing_of_library import BorrowingOfLibraryRes
from api.borrowing_info import BorrowingInfoResource

from api.order import OrderResource
from api.order_of_library import OrderOfLibResource
from api.order_filter import OrderFilterResource
from api.order_to_stock import OrderConfirmRes

from api.voting import VotingResource
from api.voting_unique import VotesOnStockRes,VotesFromPersonRes,VotesDidPersonVoteStockRes

from api.database_reset import DatabaseRestResource

from models.models import BookTitle,Person,Library,Stock,Reservation,Borrowing,Order,Voting

# CORS Policy for debugging
#from flask_cors import CORS

app = Flask(__name__, static_url_path='/', static_folder='frontend/build')

# CORS Policy for debugging
#CORS(app)

# username:password@server/db
app.config['SECRET_KEY'] = 'not_secure'
app.config['SESSION_TYPE'] = 'sqlalchemy'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://yenewkmhgqretf:34c9ca2c665494adcad3ca82982bd708cf2c19cdf32c9e8597f9b7a0c7f3912e@ec2-34-247-118-233.eu-west-1.compute.amazonaws.com:5432/d4h6icjgreq9p4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
#admin = Admin(app)

app.config['SESSION_SQLALCHEMY'] = db

# Let React Handle 404 Errors
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

# Let React Handle 500 Errors
@app.errorhandler(500)
def internal_error(e):
    return app.send_static_file('index.html')

# Render React production build
@app.route('/')
def index():
    return app.send_static_file('index.html')

api = Api(app, prefix="/api")

#admin.add_view(ModelView(BookTitle, db.session))
#admin.add_view(ModelView(Person, db.session))
#admin.add_view(ModelView(Library, db.session))
#admin.add_view(ModelView(Stock, db.session))
#admin.add_view(ModelView(Reservation, db.session))
#admin.add_view(ModelView(Borrowing, db.session))
#admin.add_view(ModelView(Order, db.session))
#admin.add_view(ModelView(Voting, db.session))

api.add_resource(BookTitleResource, '/booktitle', '/booktitle/<int:id>')
api.add_resource(BookTitleGenreRes, '/booktitle/unique/genres')
api.add_resource(BookTitleAuthorRes, '/booktitle/unique/authors')

api.add_resource(PersonResource,  '/person',  '/person/<int:id>')
api.add_resource(LibraryResource,  '/library', '/library/<int:id>')
api.add_resource(SessionResource,  '/session')

api.add_resource(StockResource,  '/stock', '/stock/<int:id>')
api.add_resource(StockInfoResource,  '/stockinfo/<int:id>')
api.add_resource(StockFilterResource,  '/stock/filter') #params

api.add_resource(ReservationResource,  '/reservation', '/reservation/<int:id>')
api.add_resource(ReservationOfPersonRes,  '/reservation/person/<int:identificator>', '/reservation/person/<string:identificator>')
api.add_resource(ReservationOfLibraryRes,  '/reservation/of/lib/<int:library_id>')
api.add_resource(ReservationConfirmRes, '/reservation/confirm/<int:id>')
api.add_resource(ReservationInfoResource, '/reservation/info/<int:id>')

api.add_resource(BorrowingResource,  '/borrowing', '/borrowing/<int:id>')
api.add_resource(BorrowingOfPersonRes,  '/borrowing/person/<int:identificator>','/borrowing/person/<string:identificator>')
api.add_resource(BorrowingOfLibraryRes,  '/borrowing/of/lib/<int:library_id>')
api.add_resource(BorrowingInfoResource,  '/borrowing/info/<int:id>')

api.add_resource(OrderResource,  '/order', '/order/<int:id>')
api.add_resource(OrderOfLibResource,  '/order/library/<int:id>')
api.add_resource(OrderFilterResource,  '/order/filter')
api.add_resource(OrderConfirmRes, '/order/confirm/<int:id>')

api.add_resource(VotingResource,  '/voting', '/voting/<int:id>')
api.add_resource(VotesOnStockRes,  '/voting/stockvotes/<int:stock_id>')
api.add_resource(VotesFromPersonRes,  '/voting/votesofperson/<int:person_id>')
api.add_resource(VotesDidPersonVoteStockRes,  '/voting/person/voted/stock/<int:stock_id>')

api.add_resource(DatabaseRestResource, '/database/reset/<int:key>')

if __name__ == "__main__":
    app.run(debug=True)
