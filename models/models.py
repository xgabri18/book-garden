from shared_db import db


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

    #stocks = db.relationship("Stock", backref="booktitle")