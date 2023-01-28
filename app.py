import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
#from ipynb.fs.full.Search_algorithm import searching
from model import searching11, drugid, drugcondition, drugrating
from modelg import searching11g, sideeffectsg, drugconditiong, drugratingg,drugcostg

# Create flask app
app = Flask(__name__)
#model = pickle.load(open("modelnew.pkl", "rb"))


@app.route('/')
def home():
    return render_template("index.html")

@app.route('/search',methods=['GET','POST'])
def search():
    data=request.form.get("data")
    med=searching11(data)
    id=drugid(med)
    condition=drugcondition(med)
    rating=drugrating(med)
    return render_template("index1.html",len=len(med), id=id, med=med, condition=condition, rating=rating)
    #return k

@app.route('/searchgen',methods=['GET','POST'])
def searchgen():
    data=request.form.get("datag")
    med=searching11g(data)
    condition=drugconditiong(med)
    rating=drugratingg(med)
    cost=drugcostg(med)
    side=sideeffectsg(med)
    return render_template("index2.html",len=len(med), med=med, condition=condition, rating=rating, cost=cost, side=side)
    #return k

if __name__=="__main__":
    app.run(debug=True)
