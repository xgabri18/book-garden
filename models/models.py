from shared_db import db
#TODO doplnit nullable




class Person(db.Model):
    #id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Unicode(100), primary_key=True)  # this makes more sense than id
    user_type = db.Column(db.String(20), nullable=False)  # ADMIN/LIBRARIAN/DISTRIBUTOR/LOGUSER/USER - permissions ????
    username = db.Column(db.Unicode(100))  # ????
    password = db.Column(db.Unicode(100))
    #email = db.Column(db.Unicode(100), nullable=False)
    name = db.Column(db.Unicode(100))
    surname = db.Column(db.Unicode(100))
    # profiledesc = db.Column(db.UnicodeText())

    reservations = db.relationship("Reservation", backref="person")
    borrowings = db.relationship("Borrowing", backref="person")
    orders = db.relationship("Order", backref="person")


    def __repr__(self):
        return '<User %r>' % self.email


class Library(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(100))
    city = db.Column(db.Unicode(100))
    street = db.Column(db.Unicode(100))
    open_hours = db.Column(db.UnicodeText)
    description = db.Column(db.UnicodeText)

    stocks = db.relationship("Stock", backref="library")
    orders = db.relationship("Order", backref="library")


class BookTitle(db.Model):
    __tablename__ = 'booktitle'  # because of CamelCase
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(100))
    authors = db.Column(db.UnicodeText)
    publisher = db.Column(db.Unicode(100))
    # photo
    isbn = db.Column(db.String(13))  # ISBN is composed of 10 or 13 numbers
    # date_publication = db.Column(db.Date()) - not so sure how to do this yet
    genre = db.Column(db.Unicode(100))  # mozno tabulka????
    description = db.Column(db.UnicodeText)
    rating = db.Column(db.Integer)  # or float???

    stocks = db.relationship("Stock", backref="booktitle")
    orders = db.relationship("Order", backref="booktitle")

# ---------------------Library has books-------------------------------


class Stock(db.Model):
    library_id = db.Column(db.Integer, db.ForeignKey('library.id'), primary_key=True)
    booktitle_id = db.Column(db.Integer, db.ForeignKey('booktitle.id'), primary_key=True)
    amount = db.Column(db.Integer)
    availability = db.Column(db.String(30))  # Available/Unavailable/ako sa povie všetko vypožičané

    reservations = db.relationship("Reservation", backref="stock") #foreign_keys="[Reservation.library_id]"
    borrowings = db.relationship("Borrowing", backref="stock")
    votes = db.relationship("Voting", backref="stock")


# ---------------------User actions-------------------------------


class Reservation(db.Model):
    #__table_args__ = (db.UniqueConstraint('library_id', 'booktitle_id', name='unique_library_booktitle'),)
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['library_id', 'booktitle_id'],
            ['stock.library_id', 'stock.booktitle_id'],
        ),
    )
    reservation_id = db.Column(db.Integer, primary_key=True)
    library_id = db.Column(db.Integer)#, db.ForeignKey('stock.library_id'))
    booktitle_id = db.Column(db.Integer)#, db.ForeignKey('stock.booktitle_id'))
    person_email = db.Column(db.Unicode(100), db.ForeignKey('person.email'))
    #date_of_reservation = db.Column(db.Date()) - not so sure how to do this




class Borrowing(db.Model):
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['library_id', 'booktitle_id'],
            ['stock.library_id', 'stock.booktitle_id'],
        ),
    )
    borrowing_id = db.Column(db.Integer, primary_key=True)
    library_id = db.Column(db.Integer)#, db.ForeignKey('stock.library_id'))
    booktitle_id = db.Column(db.Integer)#, db.ForeignKey('stock.booktitle_id'))
    person_email = db.Column(db.Unicode(100), db.ForeignKey('person.email'))
    #date_borrowed =
    #date_returned =
    fine = db.Column(db.Integer, default=0)


class Order(db.Model):
    order_id = db.Column(db.Integer, primary_key=True)
    count = db.Column(db.Integer)
    #date =
    library_id = db.Column(db.Integer, db.ForeignKey('library.id'))
    booktitle_id = db.Column(db.Integer, db.ForeignKey('booktitle.id'))
    person_email = db.Column(db.Unicode(100), db.ForeignKey('person.email'))
    note = db.Column(db.UnicodeText)


class Voting(db.Model):
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['library_id', 'booktitle_id'],
            ['stock.library_id', 'stock.booktitle_id'],
        ),
    )
    person_email = db.Column(db.Unicode(100), db.ForeignKey('person.email'), primary_key=True)
    library_id = db.Column(db.Integer)#, db.ForeignKey('stock.library_id'))
    booktitle_id = db.Column(db.Integer)#, db.ForeignKey('stock.booktitle_id'))
    vote = db.Column(db.String(1))  # tu moze ist asi hocico
