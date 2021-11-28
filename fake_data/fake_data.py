# ########################################
# Brief: Script for generating example data
# Project: System for libraries
# File: fake_data.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

import random

from downloader import MartinusDownloader
import requests
from faker import Faker
from random import randrange,choice,sample
import json



def generate_books(url,s):
    spec = "/booktitle"

    books = [   "https://www.martinus.sk/?uItem=348811", # expanse
                "https://www.martinus.sk/?uItem=749433", # ja robot
                "https://www.martinus.sk/?uItem=295744", # contact
                "https://www.martinus.sk/?uItem=153297", # 1984
                "https://www.martinus.sk/?uItem=931609", # random romantic
                "https://www.martinus.sk/?uItem=297528", # marina
                "https://www.martinus.sk/?uItem=297369", # 21 lessons
                "https://www.martinus.sk/?uItem=111359", # catch 22
                "https://www.martinus.sk/?uItem=134254", # pan prstenov
                "https://www.martinus.sk/?uItem=844631", # bylinky
                "https://www.martinus.sk/?uItem=243422", # trhlina
                "https://www.martinus.sk/?uItem=432709", # rozpravka
                "https://www.martinus.sk/?uItem=887703", # beletria
                "https://www.martinus.sk/?uItem=106265"  # it
                ]

    downloader = MartinusDownloader()
    for book in books:
        book_data = downloader.get_book_data(book)
        print(book_data)
        r = s.post(url = url+spec, data = book_data)
        print(r)



def generate_libraries(url,s, number):
    spec = "/library"
    fake = Faker()
    for i in range(number):
        data = {}
        city = fake.city()
        data["name"] = city + "s Library"
        data["city"] = city

        data["street"] = fake.address()
        num = randrange(6,10)
        data["open_hours"] = str(num) + ":00 - " + str(num + randrange(5,9)) + ":00"
        data["description"] = fake.text()


        print(data)
        r = s.post(url = url+spec, data = data)
        print(r)


# ku kazdej library aspon jeden librarian
def generate_librarians(url,s):
    spec = "/person"
    fake = Faker()

    # ku kazdej lib librarian
    x =   s.get(url + "/library")
    x = json.loads(x.text)
    #print(type(x))
    #print(x["data"])
    i = 0
    for lib in x["data"]:
        i+=1
        data = {}
        data["library_id"] = lib["id"]
        data["email"] = "librarian" + str(i) + "@lib.com"
        data["user_type"] = 4
        data["username"] = "librarian" + str(i)
        data["password"] = "librarian" + str(i)

        name = fake.name()
        while len(name.split()) !=2:
            name = fake.name()
        name = name.split()
        data["name"] = name[0]
        data["surname"] = name[1]
        data["profiledesc"] = fake.text()

        print(data)
        r = s.post(url = url+spec, data = data)
        print(r)


def generate_distributors(url,s,n):
    spec = "/person"
    fake = Faker()


    for i in range(1,n+1):
        data = {}
        data["email"] = "distributor" + str(i) + "@dis.com"
        data["user_type"] = 3
        data["username"] = "distributor" + str(i)
        data["password"] = "distributor" + str(i)

        name = fake.name()
        while len(name.split()) !=2:
            name = fake.name()
        name = name.split()
        data["name"] = name[0]
        data["surname"] = name[1]
        data["profiledesc"] = fake.text()

        print(data)
        r = s.post(url = url+spec, data = data)
        print(r)


def generate_users(url,s,n):
    spec = "/person"
    fake = Faker()


    for i in range(1,n+1):
        data = {}
        data["email"] = "user" + str(i) + "@use.com"
        data["user_type"] = 1
        data["username"] = "user" + str(i)
        data["password"] = "user" + str(i)

        name = fake.name()
        while len(name.split()) !=2:
            name = fake.name()

        name = name.split()
        data["name"] = name[0]
        data["surname"] = name[1]
        data["profiledesc"] = fake.text()

        print(data)
        r = s.post(url = url+spec, data = data)
        print(r)


def generate_people(url,s,distributors,users):
    # 5 admin, 4 librarian, 3 distribb, 1 user
    generate_librarians(url,s)
    generate_distributors(url,s,distributors)
    generate_users(url,s,users)


def randomize_stock(url,s):
    spec = "/stock"
    fake = Faker()

    # ku kazdej lib librarian
    x = s.get(url + spec)
    x = json.loads(x.text)
    #print(x.text)

    for stock in x["data"]:
        print(stock)
        if random.choice([0,1]) == 1:
            stock["availability"] = True
            stock["amount"] = random.randrange(0,15)
            x = s.put(url + spec + "/" + str(stock["id"]), stock)
            print(x)


def random_votes(url,s,low,high):
    spec = "/voting"

    stock = s.get(url + "/stock/filter?availability=False")
    stock = json.loads(stock.text)["data"]

    people = s.get(url + "/person")
    #print(json.loads(stock.text))
    people = json.loads(people.text)



    for person in people["data"]:
        # zoberie iba low lovel usera
        if person["user_type"] == 1:

            # vyberie nahodnu sadu stocku z nahodneho range
            stock_id_array = random.sample([d['id'] for d in stock],k = random.randrange(low,high))
            print(stock_id_array)
            # pre kazdy stock posli vote
            for chosen in stock_id_array:
                x = s.post(url + spec, {"person_id" : person["id"], "stock_id" : chosen})
                print(x)


def random_orders(url,s,low,high):
    spec = "/order"

    fake = Faker()


    people = s.get(url + "/person")

    for person in json.loads(people.text)["data"]:
        # zoberie iba knihovnikov
        if person["user_type"] == 4:
            print(person["library_id"])
            stock = s.get(url + "/stock/filter?availability=False&library_id=" + str(person["library_id"]))
            stock = json.loads(stock.text)["data"]
            print(stock)
            # vyberie nahodnu sadu stocku z nahodneho range
            # vrati pole stock ID
            chosen_stock = random.sample([d['id'] for d in stock],k = random.randrange(low,high))

            print(chosen_stock)
            # pre kazdy stock posli vote
            for stock_id in chosen_stock:
                for a in stock:
                    if a["id"] == stock_id:
                        stck = a

                order = {}
                order["amount"] = random.randrange(5,15)
                #order["date_added"] = fake.date_time_between(start_date='-3y', end_date='now')

                order["library_id"] = person["library_id"]
                order["booktitle_id"] = stck["booktitle_id"]
                order["person_id"] = person["id"]
                order["note"] = random.choice(["We need it ASAP", "Only new ones", "Not that important", "Can be from second hand", "Fast", ""])


                x = s.post(url + spec,order)
                print(x)


def random_reservations(url,s,low,high):
    spec = "/reservation"

    people = s.get(url + "/person")

    for person in json.loads(people.text)["data"]:
        # zoberie userov
        if person["user_type"] == 1:
            stock = s.get(url + "/stock/filter?availability=True" )
            stock = json.loads(stock.text)["data"]

            # vyberie nahodnu sadu stocku z nahodneho range
            # vrati pole stock ID
            chosen_stock = random.sample([d['id'] for d in stock],k = random.randrange(low,high))

            print(chosen_stock)
            # pre kazdy stock posli vote
            for stock_id in chosen_stock:

                x = s.post(url + spec, {"person_id" : person["id"], "stock_id" : stock_id})
                print(x)


def random_borrowings(url,s,low,high):
    spec = "/borrowing"

    people = s.get(url + "/person")

    for person in json.loads(people.text)["data"]:
        # zoberie userov
        if person["user_type"] == 1:
            stock = s.get(url + "/stock/filter?availability=True" )
            stock = json.loads(stock.text)["data"]

            # vyberie nahodnu sadu stocku z nahodneho range
            # vrati pole stock ID
            chosen_stock = random.sample([d['id'] for d in stock],k = random.randrange(low,high))

            print(chosen_stock)
            # pre kazdy stock posli vote
            for stock_id in chosen_stock:

                for a in stock:
                    if a["id"] == stock_id:
                        stck = a
                if stck["amount"] ==0:
                    continue

                x = s.post(url + spec, {"person_id" : person["id"], "stock_id" : stock_id})
                print(x)
                stck["amount"] -=1
                x = s.put(url + "/stock/" + str(stck["id"]),stck)





url = "http://127.0.0.1:5000/api"
s = requests.Session()
r = s.post(url = url+"/session", data = {"username" : "admin", "password" : "admin", })

# x = s.get(url + "/database/reset/12345")
# print(x.text)


generate_books(     url,s      )
generate_libraries( url,s, 3   ) # num of libs
generate_people(    url,s, 2,3 ) # distributors, users
randomize_stock(    url,s      )
random_votes(       url,s,10,15) # random votes        between set numbers
random_orders(      url,s, 1,4 ) # random orders       between set numbers
random_reservations(url,s, 1,4 ) # random reservations between set numbers
random_borrowings(  url,s, 1,4 ) # random borrowings   between set numbers


