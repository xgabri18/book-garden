import requests
from faker import Faker
from random import randrange


# fake = Faker()
#
# url = "http://127.0.0.1:5000/api"
#
#
# spec = "/booktitle"
# for i in range(10):
#     data = {}
#     name = fake.name()
#     data["authors"] = name
#     data["name"] = "Life of " + name
#
#     data["publisher"] = fake.company()
#     data["isbn"] = str(randrange(0,9)) + "-" + str(randrange(1000,9999)) + "-" +str(randrange(1000,9999)) + str(randrange(0,9))
#     data["genre"] = "biography"
#     data["description"] = fake.text()
#     data["rating"] = str(randrange(0,10))
#
#     print(data)
#     r = requests.post(url = url+spec, data = data)
#
#
# spec = "/library"
# for i in range(10):
#     data = {}
#     city = fake.city()
#     data["name"] = city + "s Library"
#     data["city"] = city
#
#     data["street"] = fake.address()
#     num = randrange(6,10)
#     data["open_hours"] = str(num) + ":00 - " + str(num + randrange(5,9)) + ":00"
#     data["description"] = fake.text()
#
#
#     print(data)
#     r = requests.post(url = url+spec, data = data)



