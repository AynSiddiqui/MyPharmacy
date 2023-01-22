import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
#from ipynb.fs.full.Search_algorithm import searching
from model import searching
#from ipynb.fs.full.Search_algorithm import merge
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
    k=searching(data)
    return render_template("index1.html",len=len(k), k=k)
    #return k

@app.route('/details')
def display():
    return "Nothing"

if __name__=="__main__":
    app.run(debug=True)
