#importing the dependencies

import numpy as np
import pandas as pd
#import math
#import re
#from scipy.sparse import csr_matrix
#import matplotlib.pyplot as plt
#import seaborn as sns
#from surprise import Reader, Dataset, SVD
import difflib
#from sklearn.feature_extraction.text import TfidfVectorizer #to convert textual data into vectors
#from sklearn.metrics.pairwise import cosine_similarity
#from surprise.model_selection.validation import cross_validate
#sns.set_style("darkgrid")
import pickle
#from sklearn.preprocessing import StandardScaler
#from sklearn.ensemble import RandomForestClassifier
#from sklearn.model_selection import train_test_split

store=pd.read_csv ("medical_store.csv")
##print(drug_name.tail())
##print(drug_name.head())

selected_features=['Pincode','Address']
for feature in selected_features:
    store[feature]=store[feature].fillna('')

store.drop_duplicates()

#List with pincodes
store_pin=store['Pincode'].tolist()
#List with address
store_addr=store['Address'].tolist()
#List with store names
store_name=store['Name'].tolist()
#List with phone numbers
store_phone=store['Phone'].tolist()
#List with hours
store_hour=store['Business_hours'].tolist()
#print(store.dtypes)


def storename(srch):
    name=[]
    if srch.isdigit():
        for i in range(0,len(store_pin)):
            if int(srch) == store_pin[i]: # or difflib.SequenceMatcher(None,srch,med_name[i].ratio()>0.6):
                name.append(store_name[i])

    else:
        for i in range(0,len(store_addr)):
            if srch.lower() in store_addr[i].lower():
            #if _name[i] not in match:
                name.append(store_name[i])
            
    return name
    

def storepin(srch):
    pin=[]
    if srch.isdigit():
        for i in range(0,len(store_pin)):
            if int(srch) == store_pin[i]: # or difflib.SequenceMatcher(None,srch,med_name[i].ratio()>0.6):
                pin.append(store_pin[i])

    else:
        for i in range(0,len(store_addr)):
            if srch.lower() in store_addr[i].lower():
            #if _name[i] not in match:
                pin.append(store_pin[i])
            
    return pin

def storeaddress(srch):
    addr=[]
    if srch.isdigit():
        for i in range(0,len(store_pin)):
            if int(srch) == store_pin[i]: # or difflib.SequenceMatcher(None,srch,med_name[i].ratio()>0.6):
                addr.append(store_addr[i])

    else:
        for i in range(0,len(store_addr)):
            if srch.lower() in store_addr[i].lower():
            #if _name[i] not in match:
                addr.append(store_addr[i])
            
    return addr

def storephone(srch):
    phone=[]
    if srch.isdigit():
        for i in range(0,len(store_pin)):
            if int(srch) == store_pin[i]: # or difflib.SequenceMatcher(None,srch,med_name[i].ratio()>0.6):
                phone.append(store_phone[i])

    else:
        for i in range(0,len(store_addr)):
            if srch.lower() in store_addr[i].lower():
            #if _name[i] not in match:
                phone.append(store_phone[i])
            
    return phone

def storehours(srch):
    hours=[]
    if srch.isdigit():
        for i in range(0,len(store_pin)):
            if int(srch) == store_pin[i]: # or difflib.SequenceMatcher(None,srch,med_name[i].ratio()>0.6):
                hours.append(store_hour[i])

    else:
        for i in range(0,len(store_addr)):
            if srch.lower() in store_addr[i].lower():
            #if _name[i] not in match:
                hours.append(store_hour[i])
            
    return hours

srch="400101"
#print(storename(srch))
#print(storeaddress(srch))
#print(storepin(srch))
#print(storephone(srch))
#print(storehours(srch))

# Select independent and dependent variable
#X = drug_name[["Med_name", "Condition"]]
#y = drug_name[""]

# Split the dataset into train and test
#X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=50)

# # Feature scaling
# sc = StandardScaler()
# X_train = sc.fit_transform(X_train)
# X_test= sc.transform(X_test)

# Instantiate the model
#classifier = RandomForestClassifier()

# Fit the model
# classifier.fit(X_train, y_train)

# Make pickle file of our model
#pickle.dump(classifier, open("modelnew.pkl", "wb"))


