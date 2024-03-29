import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
#from ipynb.fs.full.Search_algorithm import searching
from model import searching11, drugid, drugcondition, drugrating
from modelg import searching11g, sideeffectsg, drugconditiong, drugratingg,drugcostg
from model_store import storename, storeaddress, storepin, storephone, storehours
import json
# Create flask app
app = Flask(__name__)
#model = pickle.load(open("modelnew.pkl", "rb"))


@app.route('/search',methods=['POST'])
def search():
    responseObject=request.json
    print(responseObject)
    data=responseObject['data']
    #print(data)
    med=searching11(data)
    id=drugid(med)
    condition=drugcondition(med)
    rating=drugrating(med)
    return json.dumps({"med": med, "id": id, "condition": condition, "rating": rating, "len": len(med)})
    # return render_template("index1.html",len=len(med), id=id, med=med, condition=condition, rating=rating)
    #return k

@app.route('/searchgen',methods=['POST']) 
def searchgen():
    responseObject=request.json
    print(responseObject)
    datag=responseObject['datag']
    #print(datag)
    med=searching11g(datag)
    condition=drugconditiong(med)
    rating=drugratingg(med)
    cost=drugcostg(med)
    side=sideeffectsg(med)
    #print(med,condition,rating,cost,side)
    
    def default(o):
        if callable(o):
            return o.__name__
        raise TypeError("Not serializable")
    
    return json.dumps({"med": med, "id": id, "condition": condition, "rating": rating, "len": len(med),"cost":cost,"side":side}, default=default)


    # return render_template("index2.html",len=len(med), med=med, condition=condition, rating=rating, cost=cost, side=side)
    #return k

# @app.route('/searchstore')
# def searchstore():
#     return render_template("index3.html")

@app.route('/displaystore', methods=['POST'])
def displaystore():
    responseObject=request.json
    print(responseObject)
    inp=responseObject['inp']
    # inp=request.form.get("inp")
    name=storename(inp)
    addr=storeaddress(inp)
    pin=storepin(inp)
    phone=storephone(inp)
    hours=storehours(inp)
    return json.dumps({"len":len(name), "name":name, "addr":addr, "pin":pin, "phone":phone, "hours":hours})
    return render_template("index4.html",len=len(name), name=name, addr=addr, pin=pin, phone=phone, hours=hours)


if __name__=="__main__":
    # app.run(debug=True)
    app.run("127.0.0.2", "5001",debug=True)
