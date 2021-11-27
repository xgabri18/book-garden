from shared_db import db
from datetime import datetime, timedelta
#TODO doplnit nullable + unique TRUE + cascade delete


class Person(db.Model):
    #query: db.Query  # adds autocomplete to queries
    id = db.Column(db.Integer, primary_key=True)
    library_id = db.Column(db.Integer, db.ForeignKey('library.id'))
    user_type = db.Column(db.Integer, nullable=False, default=1)  # ADMIN-5/LIBRARIAN-4/DISTRIBUTOR-3/LOGUSER-other - permissions
    username = db.Column(db.Unicode(100), nullable=False, unique=True)
    password = db.Column(db.Unicode(100), nullable=False)
    email = db.Column(db.Unicode(100), nullable=False, unique=True)
    name = db.Column(db.Unicode(100))
    surname = db.Column(db.Unicode(100))
    profiledesc = db.Column(db.UnicodeText)

    reservations = db.relationship("Reservation", cascade="all,delete,delete-orphan", backref="person")
    borrowings = db.relationship("Borrowing", backref="person")
    orders = db.relationship("Order", backref="person")
    votes = db.relationship("Voting", cascade="all,delete,delete-orphan", backref="person")

    def __repr__(self):
        return '<User %r>' % self.email


class Library(db.Model):
    #query: db.Query  # adds autocomplete to queries
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(100), nullable=False)
    city = db.Column(db.Unicode(100))
    street = db.Column(db.Unicode(100))
    open_hours = db.Column(db.UnicodeText)
    description = db.Column(db.UnicodeText)

    stocks = db.relationship("Stock", cascade="all,delete,delete-orphan", backref="library")
    orders = db.relationship("Order", cascade="all,delete,delete-orphan", backref="library")
    people = db.relationship("Person", backref="library")  # workers-librarians


class BookTitle(db.Model):
    __tablename__ = 'booktitle'  # because of CamelCase
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(100))
    author = db.Column(db.UnicodeText)
    publisher = db.Column(db.Unicode(100))
    photo = db.Column(db.Text)
    isbn = db.Column(db.String(13), nullable=False, unique=True)  # ISBN is composed of 10 or 13 numbers
    date_publication = db.Column(db.Integer)
    genre = db.Column(db.Unicode(100))  # mozno tabulka????
    description = db.Column(db.UnicodeText)
    rating = db.Column(db.Integer)  # or float??? (value 0-5 / 0-100 or smtn, hardcoded -> critics rating)

    stocks = db.relationship("Stock", cascade="all,delete,delete-orphan", backref="booktitle")
    orders = db.relationship("Order", cascade="all,delete,delete-orphan", backref="booktitle")

# ---------------------Library has books-------------------------------


class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    #library_id = db.Column(db.Integer, db.ForeignKey('library.id'), primary_key=True)
    #booktitle_id = db.Column(db.Integer, db.ForeignKey('booktitle.id'), primary_key=True)
    library_id = db.Column(db.Integer, db.ForeignKey('library.id'), nullable=False)  # TODO stock must belong somewhere
    booktitle_id = db.Column(db.Integer, db.ForeignKey('booktitle.id'), nullable=False)
    amount = db.Column(db.Integer, default=0)
    availability = db.Column(db.Boolean, default=False)

    reservations = db.relationship("Reservation", cascade="all,delete,delete-orphan", backref="stock") #foreign_keys="[Reservation.library_id]"
    borrowings = db.relationship("Borrowing", cascade="all,delete,delete-orphan", backref="stock")
    votes = db.relationship("Voting", cascade="all,delete,delete-orphan", backref="stock")


# ---------------------User actions-------------------------------


class Reservation(db.Model):
    #__table_args__ = (db.UniqueConstraint('library_id', 'booktitle_id', name='unique_library_booktitle'),)
    # __table_args__ = (
    #     db.ForeignKeyConstraint(
    #         ['library_id', 'booktitle_id'],
    #         ['stock.library_id', 'stock.booktitle_id'],
    #     ),
    # )
    id = db.Column(db.Integer, primary_key=True)
    #library_id = db.Column(db.Integer)#, db.ForeignKey('stock.library_id'))
    #booktitle_id = db.Column(db.Integer)#, db.ForeignKey('stock.booktitle_id'))
    stock_id = db.Column(db.Integer, db.ForeignKey('stock.id'))
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'))
    date_of_reservation = db.Column(db.DateTime, default=datetime.now)  # not so sure how to do this


class Borrowing(db.Model):
    # __table_args__ = (
    #     db.ForeignKeyConstraint(
    #         ['library_id', 'booktitle_id'],
    #         ['stock.library_id', 'stock.booktitle_id'],
    #     ),
    # )
    id = db.Column(db.Integer, primary_key=True)
    #library_id = db.Column(db.Integer)#, db.ForeignKey('stock.library_id'))
    #booktitle_id = db.Column(db.Integer)#, db.ForeignKey('stock.booktitle_id'))
    stock_id = db.Column(db.Integer, db.ForeignKey('stock.id'))
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'))
    date_borrowed = db.Column(db.DateTime, default=datetime.now)
    date_returned = db.Column(db.DateTime, default=lambda: datetime.now() + timedelta(days=60))  # when to return a book
    fine = db.Column(db.Integer, default=0)


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer, default=0)
    date_added = db.Column(db.DateTime, default=datetime.now)
    library_id = db.Column(db.Integer, db.ForeignKey('library.id'))
    booktitle_id = db.Column(db.Integer, db.ForeignKey('booktitle.id'))
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'))
    note = db.Column(db.UnicodeText)


class Voting(db.Model):
    # __table_args__ = (
    #     db.ForeignKeyConstraint(
    #         ['library_id', 'booktitle_id'],
    #         ['stock.library_id', 'stock.booktitle_id'],
    #     ),
    # )
    id = db.Column(db.Integer, primary_key=True)
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'))
    stock_id = db.Column(db.Integer, db.ForeignKey('stock.id'))

    #TODO __table_args__ = (
    #db.UniqueConstraint('person_id', 'stock_id'),
    #)
