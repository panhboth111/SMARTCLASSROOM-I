from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys
import time

url = 'http://10.10.17.15:8080/device-login'
email = sys.argv[1]
password = sys.argv[2]
streamTitle = sys.argv[3]

browser = webdriver.Chrome(executable_path="/home/pboth/Documents/Education/Internship~/SMARTCLASSROOM-I/Device/python/chromedriver")
browser.get(url)
usernameField = browser.find_element_by_id('username')
usernameField.send_keys(email)
passwordField = browser.find_element_by_id('password')
passwordField.send_keys(password)
submitButton = browser.find_element_by_id('submitButton')
submitButton.click()
time.sleep(2)
streamBox = browser.find_element_by_id(streamTitle)
streamBox.click()