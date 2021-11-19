from shared_db import db
from datetime import datetime
#TODO doplnit nullable + unique TRUE + cascade delete


class Person(db.Model):
    #query: db.Query  # adds autocomplete to queries
    id = db.Column(db.Integer, primary_key=True)
    library_id = db.Column(db.Integer, db.ForeignKey('library.id'))
    #email = db.Column(db.Unicode(100), primary_key=True)
    user_type = db.Column(db.Integer, nullable=False)  # ADMIN-5/LIBRARIAN-4/DISTRIBUTOR-3/LOGUSER - permissions ????
    username = db.Column(db.Unicode(100))  # ????
    password = db.Column(db.Unicode(100))
    email = db.Column(db.Unicode(100), nullable=False)
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
    name = db.Column(db.Unicode(100))
    city = db.Column(db.Unicode(100))
    street = db.Column(db.Unicode(100))
    open_hours = db.Column(db.UnicodeText)
    description = db.Column(db.UnicodeText)

    stocks = db.relationship("Stock", cascade="all,delete,delete-orphan", backref="library")
    orders = db.relationship("Order", backref="library")
    people = db.relationship("Person", backref="library")  # workers-librarians


class BookTitle(db.Model):
    __tablename__ = 'booktitle'  # because of CamelCase
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(100))
    author = db.Column(db.UnicodeText)
    publisher = db.Column(db.Unicode(100))
    # photo
    isbn = db.Column(db.String(13))  # ISBN is composed of 10 or 13 numbers
    # date_publication = db.Column(db.Date()) - not so sure how to do this yet
    genre = db.Column(db.Unicode(100))  # mozno tabulka????
    description = db.Column(db.UnicodeText)
    rating = db.Column(db.Integer)  # or float??? (value 0-5 / 0-100 or smtn, hardcoded -> critics rating)

    stocks = db.relationship("Stock", cascade="all,delete,delete-orphan", backref="booktitle")
    orders = db.relationship("Order", backref="booktitle")

# ---------------------Library has books-------------------------------


class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    #library_id = db.Column(db.Integer, db.ForeignKey('library.id'), primary_key=True)
    #booktitle_id = db.Column(db.Integer, db.ForeignKey('booktitle.id'), primary_key=True)
    library_id = db.Column(db.Integer, db.ForeignKey('library.id'))
    booktitle_id = db.Column(db.Integer, db.ForeignKey('booktitle.id'))
    amount = db.Column(db.Integer)
    availability = db.Column(db.String(30))  # Available/Unavailable/ako sa povie všetko vypožičané

    reservations = db.relationship("Reservation", cascade="all,delete,delete-orphan", backref="stock") #foreign_keys="[Reservation.library_id]"
    borrowings = db.relationship("Borrowing", backref="stock")
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
    date_of_reservation = db.Column(db.DateTime, default=datetime.utcnow)  # not so sure how to do this


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
    date_borrowed = db.Column(db.DateTime, default=datetime.utcnow)
    date_returned = db.Column(db.DateTime)
    fine = db.Column(db.Integer, default=0)


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
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
    # library_id = db.Column(db.Integer)#, db.ForeignKey('stock.library_id'))
    # booktitle_id = db.Column(db.Integer)#, db.ForeignKey('stock.booktitle_id'))
    stock_id = db.Column(db.Integer, db.ForeignKey('stock.id'))
    vote = db.Column(db.String(1))  # TODO tu moze ist asi hocico -> mozno bool -> 0-no vote/1-vote
