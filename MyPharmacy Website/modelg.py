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

drug_name=pd.read_csv ("generic_csv.csv")
#print(drug_name.tail())
#print(drug_name.head())

selected_features=['Condition','Med_name','Cost']
for feature in selected_features:
    drug_name[feature]=drug_name[feature].fillna('Currently N/A')

selected_features1=['Rating']
for feature in selected_features1:
    drug_name[feature]=drug_name[feature].fillna(0)

drug_name['Rating'] = drug_name['Rating'].astype('float')
#print(drug_name.dtypes)
drug_name['Side_effects']=drug_name['Side_effects'].replace(r'([a-z])([A-Z])', r'\1,\2', regex=True)
#drug_name['Side_effects'] = drug_name['Side_effects'].astype('str')
drug_name['Side_effects']=drug_name['Side_effects'].str.replace(")","), ", regex=True)
drug_name['Side_effects'] = drug_name['Side_effects'].str.rstrip(', ')

#print(drug_name['Side_effects'])

#List with medicine names
med_name=drug_name['Med_name'].tolist()
#List with conditions
cond_name=drug_name['Condition'].tolist()
#List with ratings
rate_value=drug_name['Rating'].tolist()

def mergeg(list1, list2):
     
    merged_list = tuple(zip(list1, list2))
    return merged_list

def searching11g(srch):
    #srch=input("Enter medicine name or condition : ")
    match=[]
    rating_med=[]
    f=0
    for i in range(0,len(med_name)):
        if srch.lower() in med_name[i].lower(): # or difflib.SequenceMatcher(None,srch,med_name[i].ratio()>0.6):
            match.append(med_name[i])
            rating_med.append(rate_value[i])

    for i in range(0,len(cond_name)):
        if srch.lower() in cond_name[i].lower():
            if med_name[i] not in match:
                match.append(med_name[i])
                rating_med.append(rate_value[i])

    #rating=list(np.around(rating_med, decimals=2))
    arrange=mergeg(rating_med,match)
    sorted_med=sorted(arrange,key=lambda x:x[0], reverse=True)
    i=1
    list_med=[]
    for med in sorted_med:
        if i<21:
            list_med.append(med[1])
            i+=1
    return list_med
    

def sideeffectsg(k):
    side=[]
    for i in range(0,len(k)):
        side_med=list(drug_name[drug_name.Med_name==k[i]]['Side_effects'])
        side.append(side_med[0])
    return side

def drugratingg(k):
    rating=[]
    for i in range(0,len(k)):
        rating_med=list(drug_name[drug_name.Med_name==k[i]]['Rating'])
        rating.append(rating_med[0])
    #rating_rounded=list(np.around(rating, decimals=2))
    return rating

def drugconditiong(k):
    condition=[]
    for i in range(0,len(k)):
        condition_med=list(drug_name[drug_name.Med_name==k[i]]['Condition'])
        condition.append(condition_med[0])
    return condition

def drugcostg(k):
    cost=[]
    for i in range(0,len(k)):
        cost_med=list(drug_name[drug_name.Med_name==k[i]]['Cost'])
        cost.append(cost_med[0])
    return cost

k=searching11g("diabetes")
print(k)
print(drugconditiong(k))
print(drugratingg(k))
print(sideeffectsg(k))
print(drugcostg(k))

# Select independent and dependent variable
X = drug_name[["Med_name", "Condition"]]
y = drug_name["Med_name"]

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


