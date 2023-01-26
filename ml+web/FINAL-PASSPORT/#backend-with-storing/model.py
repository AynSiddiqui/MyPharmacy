#importing the dependencies

import numpy as np
import pandas as pd
# import math
# import re
# from scipy.sparse import csr_matrix
# import matplotlib.pyplot as plt
# import seaborn as sns
# from surprise import Reader, Dataset, SVD
import difflib
# from sklearn.feature_extraction.text import TfidfVectorizer #to convert textual data into vectors
# from sklearn.metrics.pairwise import cosine_similarity
# from surprise.model_selection.validation import cross_validate
# sns.set_style("darkgrid")
# import pickle
# from sklearn.preprocessing import StandardScaler
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.model_selection import train_test_split

drug_name=pd.read_excel ("output.xlsx")
#print(drug_name.head())

selected_features=['Condition','Drug']
for feature in selected_features:
    drug_name[feature]=drug_name[feature].fillna('')

#List with medicine names
med_name=drug_name['Drug'].tolist()
#List with conditions
cond_name=drug_name['Condition'].tolist()

def merge(list1, list2):
     
    merged_list = tuple(zip(list1, list2))
    return merged_list

def searching(srch):
    #srch=input("Enter medicine name or condition : ")

    #Finding close match
    match=difflib.get_close_matches(srch,med_name,5,0.9)
    if len(match)==0:
        match=difflib.get_close_matches(srch,cond_name)
        rating_med=[]
        med_med=[]
        for i in range(0,len(match)):
            #index_med=list(drug_name[drug_name.Condition==match[i]]['index'])
            rating=list(drug_name[drug_name.Condition==match[i]]['Ratings'])
            med=list(drug_name[drug_name.Condition==match[i]]['Drug'])
            for j in range(0,len(rating)):
                if med[j] not in med_med:
                    rating_med.append(rating[j])
                    med_med.append(med[j])
        arrange=merge(rating_med,med_med)
        sorted_med=sorted(arrange,key=lambda x:x[0], reverse=True)
        #print("Medicines suggested for you: ")
        i=1
        list_med=[]
        for med in sorted_med:
            if i<11:
                #print(i,". ",med[1])
                list_med.append(med[1])
                i+=1
        return list_med
    else:
        #print("Medicines suggested for you: ")
        for i in range(0,len(match)): 
            pass
            #print((i+1),". ",match[i])
        return match

def drugid(k):
    id=[]
    for i in range(0,len(k)):
        id_med=list(drug_name[drug_name.Drug==k[i]]['DrugId'])
        id.append(id_med[0])
    return id

def drugrating(k):
    rating=[]
    for i in range(0,len(k)):
        rating_med=list(drug_name[drug_name.Drug==k[i]]['Ratings'])
        rating.append(rating_med[0])
    return rating

def drugcondition(k):
    condition=[]
    for i in range(0,len(k)):
        condition_med=list(drug_name[drug_name.Drug==k[i]]['Condition'])
        condition.append(condition_med[0])
    return condition


k=searching("throat infection")
print(k)
print(drugid(k))
print(drugcondition(k))
print(drugrating(k))


# Select independent and dependent variable
X = drug_name[["Drug", "Condition"]]
y = drug_name["Drug"]

# Split the dataset into train and test
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=50)

# # Feature scaling
# sc = StandardScaler()
# X_train = sc.fit_transform(X_train)
# X_test= sc.transform(X_test)

# Instantiate the model
# classifier = RandomForestClassifier()

# Fit the model
# classifier.fit(X_train, y_train)

# Make pickle file of our model
# pickle.dump(classifier, open("modelnew.pkl", "wb"))


