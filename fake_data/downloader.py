# ########################################
# Brief: Script for generating example data
# Project: System for libraries
# File: downloader.py
# Authors: Stanislav Gabriš <xgabri18(at)fit.vutbr.cz>
#          Roman Országh <xorsza01(at)fit.vutbr.cz>
#          Adam Fabo <xfaboa00(at)fit.vutbr.cz>
# ########################################

import random

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By


#needs chromedriver.exe

class MartinusDownloader():
    def __init__(self):
        self.name = "//*[@id=\"page-container\"]/main/div[1]/div[1]/section[2]/div/div/article/h1"
        self.author = "//*[@id=\"page-container\"]/main/div[1]/div[1]/section[2]/div/div/article/ul/li/a"
        self.photo = "//*[@id=\"page-container\"]/main/div[1]/div[1]/section[2]/div/div/div[1]/div/div[1]/div[1]/a/img"
        self.publisher = "//*[@id=\"page-container\"]/main/div[1]/div[1]/section[2]/div/div/article/div[3]/dl/dd/a"
        self.genre = "//*[@id=\"page-container\"]/main/div[1]/div[1]/section[1]/div/div/div/div/*"
        self.description = "//*[@id=\"description\"]/div"

        self.rating = "//*[@id=\"page-container\"]/main/div[1]/div[1]/section[2]/div/div/article/div[2]/div[1]/div/a/span[1]"

        self.isbn = "//*[@id=\"details\"]/div/div/div[1]"
        self.isbn_next = "//*[text()='ISBN']/following::dd[1]"

        self.date_publication ="//*[@id=\"details\"]/div/div/div[1]"
        self.date_publication_next = "//*[text()='Rok vydania']/following::dd[1]"


    def get_book_data(self,url):

        driver = webdriver.Chrome("chromedriver.exe")
        driver.get(url)

        book_data = {}

        book_data["name"] = driver.find_element(By.XPATH,self.name).text
        #print(book_data["name"])

        book_data["author"] = driver.find_element(By.XPATH,self.author).text
        #print(book_data["author"])

        book_data["publisher"] = driver.find_element(By.XPATH,self.publisher).text
        #print(book_data["publisher"])

        book_data["description"] = driver.find_element(By.XPATH,self.description).text.replace("\\n", "")
        #print(book_data["description"])


        book_data["genre"] = driver.find_elements(By.XPATH,self.genre)[-1].text
        #print(book_data["genre"])


        book_data["photo"] = driver.find_element(By.XPATH,self.photo).get_attribute("src")
        #print(book_data["photo"])


        x = driver.find_element(By.XPATH,self.isbn)
        book_data["isbn"] = x.find_element(By.XPATH, self.isbn_next).text
        #print(book_data["isbn"])

        x = driver.find_element(By.XPATH,self.date_publication)
        book_data["date_publication"] = x.find_element(By.XPATH,self.date_publication_next).text
        #print(book_data["date_publication"])

        try:
            x = driver.find_element(By.XPATH,self.rating)
            book_data["rating"] = str(round(float(x.text.replace(",","."))*2))
            #print(int(x.text)*2)
        except NoSuchElementException:
            book_data["rating"] = random.randrange(1,10)
            #print(random.randrange(0,10))




        driver.close()
        driver.quit()

        return book_data

