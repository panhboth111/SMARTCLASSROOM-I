from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys
import time

url = 'http://localhost:8080/device-login'
email = sys.argv[1]
password = sys.argv[2]
streamTitle = sys.argv[3]
description = sys.argv[4]
userEmail = sys.argv[5]

browser = webdriver.Chrome(executable_path="/home/pboth/Documents/Education/Internship~/CA/Device2/chromedriver")
browser.get(url)

usernameField = browser.find_element_by_id('username')
usernameField.send_keys(email)
passwordField = browser.find_element_by_id('password')
passwordField.send_keys(password)
submitButton = browser.find_element_by_id('submitButton')
submitButton.click()
time.sleep(2)
startStreamBtn = browser.find_element_by_id('startStreamBtn')
startStreamBtn.click()
time.sleep(2)
streamTitleInput = browser.find_element_by_id('title')
streamTitleInput.send_keys(streamTitle)
descriptionInput = browser.find_element_by_id('descriptionInput')
descriptionInput.send_keys(description)
owner = browser.find_element_by_id('owner')
owner.send_keys(userEmail)
startBtn = browser.find_element_by_id('startBtn')
startBtn.click()