
# A very simple Flask Hello World app for you to get started with...
from flask import Flask, render_template, request,jsonify
from flask_sslify import SSLify
import pandas as pd
import time

from MysqlConnect import mysqlConnect
from Model.LinearModel import LinearML

app = Flask(__name__)
sslify = SSLify(app)

# SQLALCHEMY_DATABASE_URI = 'mysql+mysqldb://carsFlow:222455sx@mysql.server/carsFlow$db'


mysqlCon = mysqlConnect.Mysql_interface()

@app.route('/')
def hello_world():
    return render_template("index.html")


@app.route('/main')
def main():
    return 'MAIN!'


@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % username


# DRIVERS

@app.route('/drivers')
def drivers():
    return render_template("index.html")



@app.route('/addDriver', methods=["GET","POSt"])
def addDriver():


    if request.method == 'POST':

        mysqlCon.addUser(request)

        return jsonify({"successful":True})

    return "GET"



@app.route('/getdrivers')
def getDrivers():

    drivers = mysqlCon.getDrivers()
    return jsonify({"array":drivers})


@app.route('/deletedriver/<userid>')
def deletedriver(userid):

    mysqlCon.deleteDriver(userid)

    return jsonify({"successful":True})


@app.route('/updatedriver', methods=["GET","POST"])
def updateDriver():

    if request.method == 'POST':

        userId = request.form['id']
        data = request.form['data']

        mysqlCon.updateDriver(userId,data)

        return jsonify({"successful":True})

    mysqlCon.updateDriver(5,[["name","PPPP"]])

    return jsonify({"successful":True})


# TRUCK

@app.route('/tracks')
def tracks():
    return render_template("index.html")

@app.route('/addtruck', methods=["GET", "POST"])
def addTruck():

    if request.method == 'POST':

        mysqlCon.addTruck(request)

        return jsonify({"successful":True})



    return "GET"


@app.route("/gettrucks")
def gettrucks():

    trucks = mysqlCon.getTrucks()
    return jsonify (trucks)

@app.route('/deletetruck/<truckid>')
def deleteTruck(truckid):

    mysqlCon.deleteTruck(truckid)

    return jsonify({"successful":True})


@app.route('/updatetruck', methods=["GET","POST"])
def updateTruck():

    if request.method == 'POST':

        truckId = request.form['id']
        data = request.form['data']

        mysqlCon.updateTruck(truckId,data)

        return jsonify({"successful":True})

    # mysqlCon.updateTruck(3,[["name","PPPP"]])

    return jsonify({"successful":True})

# ROUTES

@app.route("/getroutes")
def getRoutes():

    data = mysqlCon.getRouts()

    # df = pd.DataFrame(data)
    return data.to_string()

    # data = mysqlCon.getRouts()
    # return jsonify (data)

@app.route("/getID")
def getByID():

    useriD = 3
    table = "drivers"
    sql = f'''
            Select * from {table} WHERE id={useriD}
            '''

    with mysqlCon.engine.connect() as conn:

        data = conn.execute(sql)

        for row in data:
            return jsonify({"row":row[2]})


# Get data From Here

@app.route('/count')
def count():
    return render_template("index.html")



@app.route("/getcount",methods=["GET","POST"])
def getRoutData():

    if request.method == 'POST':

        train = mysqlCon.getRouts()

        # last_id = list(train["id"].tail(1))[0] + 1

        distanceStr = request.form['distance']
        weatherStr = request.form['season']
        distance = int(distanceStr)
        weather = int(weatherStr)


        incometime = request.form['baseTime']
        predtime = time.strftime('%H:%M:%S', time.gmtime(int(incometime)))

        cityB = request.form['lastpoint']
        cityA = request.form['firstpoint']

        idtruck = request.form['truck']
        iddriver = request.form['driver']

        # Заглушка!
        typeroad = 0
        crash = 0

        testObj = pd.DataFrame(data = [[iddriver,idtruck,
                                        typeroad,weather,
                                        crash,predtime,cityA,cityB,distance]],
                              columns=['iddriver','idtruck',
                                        'typeroad','weather',
                                        'crash','predtime','cityA','cityB','distance'])

        predictTime = LinearML(train, testObj).predict()


        return jsonify({"time":predictTime})


