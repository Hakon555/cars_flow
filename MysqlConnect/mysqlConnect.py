import pandas as pd
import MySQLdb
from sqlalchemy import create_engine
from sqlalchemy import MetaData, select
from sqlalchemy import exc
from Data import settings

'''

'''


class Mysql_interface:

    '''
    Класс отвечает за взаимодействие между клиентом и базой данных

    '''

    def __init__(self):




        # Deploy

        self.name_db = settings.DATA_BASE_NAME
        user_name = settings.DATA_BASE_USER
        password = settings.DATA_BASE_PASS
        host = settings.DATA_BASE_HOST
        try:

            # Добавляем charset=utf8mb4" для считывания кирилицы с базы данных!
            self.engine = create_engine(f"mysql+mysqldb://{user_name}:{password}@{host}/{self.name_db}?charset=utf8mb4",
                                        pool_recycle=280)

            self.meta = MetaData(bind=self.engine, reflect=True)



        except exc.SQLAlchemyError as err:

            print(f"Connection error: {err}")



    def addUser(self, request):

        name = request.form['name']
        age = request.form['age']
        experience = request.form['experience']
        sex = request.form['sex']

        sql = f'''
                    INSERT INTO
                    `drivers` (`id`, `name`, `age`, `experience`, `sex`)
                    VALUES ("{None}", "{name}", {int(age)}, {int(experience)}, {int(sex)});
                '''

        with self.engine.connect () as conn:
            conn.execute(sql)

    def getDrivers(self):

        sql = f'''
            Select * from {settings.DRIVERS}
            '''

        with self.engine.connect() as conn:

            data = conn.execute(sql)

            resultDict = []

            for row in data:
                resultDict.append({
                    "id": row[0],
                    "name": row[1],
                    "age": row[2],
                    "experience": row[3],
                    "sex": row[4],
                })


            return resultDict

    def deleteDriver(self, useriD):

        table = self.meta.tables[settings.DRIVERS]

        with self.engine.connect() as conn:

            conn.execute(table.delete(table.c.id == useriD))

    def updateDriver(self,useriD,data):

        table = self.meta.tables[settings.DRIVERS]
        with self.engine.connect() as conn:
            for obj in data:
                conn.execute(table.update(table.c.id == useriD).values (
                    {obj[0]: obj[1]})
                )


    def addTruck(self, request):

        name = request.form['name']
        age = request.form['age']
        deter = request.form['deter']
        plate = request.form['plate']

        sql = f'''
                           INSERT INTO
                           `trucks` (`id`, `name`, `age`, `deter`, `plate`)
                           VALUES ("{None}", "{name}", {age}, {deter}, "{plate}");
                       '''

        with self.engine.connect() as conn:
            conn.execute(sql)

    def getTrucks(self):

        sql = f'''
            Select * from {settings.TRUCKS}
            '''

        with self.engine.connect() as conn:

            data = conn.execute(sql)

            resultDict = []

            for row in data:
                resultDict.append({
                    "id": row[0],
                    "name": row[1],
                    "age": row[2],
                    "deter": row[3],
                    "plate": row[4],
                })


            return resultDict

    def deleteTruck(self, truckiD):

        table = self.meta.tables[settings.TRUCKS]

        with self.engine.connect() as conn:

            conn.execute(table.delete(table.c.id == truckiD))


    def updateTruck(self,truckiD,data):

        table = self.meta.tables[settings.TRUCKS]

        with self.engine.connect() as conn:

            for obj in data:

                conn.execute(table.update(table.c.id == truckiD).values(

                    {obj[0]: obj[1]}
                ))
    # ROUTES

    def getRouts(self):

        sql = f'''
                    Select * from {settings.ROUTES}
                    '''

        with self.engine.connect() as conn:

            data = pd.read_sql(sql=sql, con=conn, index_col='id')

            return data







