import flask

# A very simple Flask Hello World app for you to get started with...
from flask import Flask, render_template, request,jsonify
from flask_sslify import SSLify
from MysqlConnect import mysqlConnect

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


# DRIVER

@app.route('/addDriver', methods=["GET", "POSt"])
def addDriver():


    if request.method == 'POST':


        mysqlCon.addUser(request)

        return jsonify({"successful":True})

    return "GET"

@app.route('/drivers')
def getDrivers():

    drivers = mysqlCon.getDrivers()
    return jsonify(drivers)


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


# TRACK