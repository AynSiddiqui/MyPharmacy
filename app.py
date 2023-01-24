import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
#from ipynb.fs.full.Search_algorithm import searching
from model import searching, drugid, drugcondition, drugrating

# Create flask app
app = Flask(__name__)
#model = pickle.load(open("modelnew.pkl", "rb"))

#print(searching("pain"))

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/search',methods=['GET','POST'])
def search():
    data=request.form.get("data")
    med=searching(data)
    id=drugid(med)
    condition=drugcondition(med)
    rating=drugrating(med)
    return render_template("index1.html",len=len(med), id=id, med=med, condition=condition, rating=rating)
    #return k

@app.route('/details')
def display():
    return "Nothing"

if __name__=="__main__":
    app.run(debug=True)
