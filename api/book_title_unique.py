# ########################################
# Brief: Implementation of resources
# Project: System for libraries
# File: book_title_unique.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

from api.masterclass import MasterResource
from flask import jsonify,request
from shared_db import db

from models.models import BookTitle,Library,Stock

# SET response_error a response_ok


# gets all unique genres from booktitles
# everyone can acess it, session not needed
class BookTitleGenreRes(MasterResource):
    def get(self):
        genres = []

        for genre in BookTitle.query.distinct(BookTitle.genre):
            genres.append(genre.genre)

        return self.response_ok(genres)

# gets all unique authors from booktitles
# everyone can acess it, session not needed
class BookTitleAuthorRes(MasterResource):
    def get(self):
        authors = []

        for author in BookTitle.query.distinct(BookTitle.author):
            authors.append(author.author)

        return self.response_ok(authors)






