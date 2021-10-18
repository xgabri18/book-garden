from flask_restful import Resource
from flask import jsonify,request
from shared_db import db

from models.models import BookTitle,Person,Library

#todo
# zmenit uzivatel email-id                      -------JOP
# pridat session                                -------JOP
# pri requestoch kontrolovat aky druh session
# pri session pozadovat meno a heslo            -------JOP
# osetrit ked nic neni v DB                     -------JOP
# implementovat stock CRUDE                     -------JOP
# ked sa vytvori lib alebo book tak auto stock  -------JOP
# Fake data                                     -------JOP
# navratove hlasky pri get post a pod


