import MySQLdb
import pandas as pd

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

        self.tracks = settings.TRACKS
        self.drivers = settings.DRIVERS


        # Test

        # self.name_db = 'insulin_project_database'
        # user_name = 'root'
        # password = 1234
        # host = 'localhost'


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


            # self.connection = MySQLdb.connect(host='localhost', port=3306, user='root', password='1234', db=name_db)

            # self.cursor = self.connection.cursor()


        except exc.SQLAlchemyError as err:

            print(f"Connection error: {err}")

    # def get_count_meal_of_person_data(self):
    #
    #     table = self.meta.tables[self.person_table_name]
    #
    #     with self.engine.connect() as conn:
    #
    #        s = select([table.c.Count_meal]).where(table.c.ID == self.user_id)
    #
    #        result = list(conn.execute(s))[0][0]
    #
    #        return result




    def create_train_table(self):
        '''
        функция создаст новую таблицу для нового юзера по подобию train_table_id_suer
        :return:
        '''

        sql =f'''

        CREATE TABLE train_data_{self.user_id}  LIKE  train_data_3;

        '''

        with self.engine.connect() as conn:


            conn.execute(sql)

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
                    "sex": row[3],
                })


            return resultDict


    def deleteDriver(self, useriD):

        table = self.meta.tables[settings.DRIVERS]

        useriD = 6

        with self.engine.connect() as conn:

            conn.execute(table.delete(table.c.id == useriD))


    def updateDriver(self,useriD,data):

        table = self.meta.tables[settings.DRIVERS]

        with self.engine.connect() as conn:

            for obj in data:

                conn.execute(table.update(table.c.id == useriD).values(

                    {obj[0]: obj[1]}
                ))

    def update_count_meal_person_data(self, new_count):
        '''
        Функция обновит показатель кол-ва обедов в таблице с персональными данными!
        :param new_count:
        :return:
        '''

        table = self.meta.tables[self.person_table_name]

        with self.engine.connect() as conn:


            conn.execute(table.update(table.c.ID == self.user_id).values(

                {'Count_meal': new_count})
            )



    def update_carbo_product_data(self, product_name, new_carbo):
        '''
        Функция будет изменять поазатель углеводов на 100гр. в Продуктовой таблице
        :return:
        '''

        table = self.meta.tables[self.product_table_name]

        with self.engine.connect() as conn:

                conn.execute(table.update(table.c.Наименование_продукта == product_name).values(

                    {'Углеводы': new_carbo})
                )




    def get_table_of_database(self, name_table, product_table = False, train_table = False):


        '''
        Функция обращается к таблице и забирает данные возвращает dataframe

               product_base - Если True то надо достать продуктовую базу! Пока она общая
        :param user_id: Идентификатор пользователя
        :return:
        '''

        if product_table: # Достаем продуктовую таблицу

            sql = f'''
            Select * from {name_table}
            '''

        elif train_table: # Достаем train_table

            sql = f'''
                    Select * from {name_table}{self.user_id}

                    '''
        else: # Достаем person_table
            sql = f'''

                Select * from {name_table}
                Where ID = {self.user_id}
            '''


        with self.engine.connect() as conn:

            data = pd.read_sql(sql=sql, con=conn, index_col='index')

            return data



    def update_data_for_pred_meal(self, pred_meal_data):
        '''
        Функция обновит данные по предыдущему обеду! Изменит дозировку инсулина если она требуется и добавит
        показания сахара после еды
        :param dict_data:
        :return:
        '''

        table = self.meta.tables[f'{self.train_table_name}{self.user_id}']

        with self.engine.connect() as conn:

            i=0

            for index in pred_meal_data.index:

                conn.execute(table.update(table.c.index == index).values(

                                    {'Сахар_после_еды': pred_meal_data['Сахар_после_еды'].values[0],
                                     # этот признак содержит разные значения
                                     'Инсулин_на_углеводы': pred_meal_data['Инсулин_на_углеводы'].values[i],
                                     'Компенсация_обеда': pred_meal_data['Компенсация_обеда'].values[0],
                                     'Правильная_сумма_инсулина': pred_meal_data['Правильная_сумма_инсулина'].values[0]
                                     })
                                )

                i+=1



    def update_data_sql(self, name_table, dict_values, id):
         '''
         Функция будет обращатся к базе данных и обновлять нужные данные
         name_table - название таблицы с которой работаем
         dict_values - параметры которые меняем
         id - в каком месте
         :return:
         '''

         table = self.meta.tables[name_table]

         self.engine.execute(table.update(table.c.id == id).values(dict_values))


    def append_data_to_sql(self, data, name_table):
        '''
        Функция преобразует датафрейм в sql таблицу
        :param data:
        :return:
        '''

        # Пока сделаю через pandas скорее всего быстрее будет через прямой запрос

        with self.engine.connect() as conn:

            data.to_sql(name=f'{name_table}{self.user_id}', con=conn, if_exists='append')


