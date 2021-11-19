from flask_restful import Resource
from flask import jsonify,request
from shared_db import db

from models.models import BookTitle,Library,Stock



# gets all unique genres from booktitles
# everyone can acess it, session not needed
class BookTitleGenreRes(Resource):
    def get(self):
        genres = []

        for genre in BookTitle.query.distinct(BookTitle.genre):
            genres.append(genre.genre)

        return jsonify(genres)

# gets all unique authors from booktitles
# everyone can acess it, session not needed
class BookTitleAuthorRes(Resource):
    def get(self):
        authors = []

        for author in BookTitle.query.distinct(BookTitle.authors):
            authors.append(author.authors)

        return jsonify(authors)






