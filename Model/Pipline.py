import pandas as pd
import numpy as np

from sklearn.preprocessing import FunctionTransformer,LabelEncoder
from sklearn.pipeline import make_pipeline, make_union


class Simple_pipline:
    '''
    Класс отвечает за преобразование данных для обучения  и предсказания дозировки инсулина под каждый продукт
    Принимает таблицу с тренеровочной выборкой
    Преобразует важные признаки для модели обучения

    '''

    def __init__(self, data):
        '''
        При создание класса подгрузим таблицу для обучения из файла

        '''
        label = LabelEncoder()

        data["timeStap"] = pd.to_datetime(data['predtime']).apply(lambda x: x.timestamp())
        data["distance"] = data["distance"].astype("float")

        data['cityA'] = label.fit_transform(data['cityA'])
        data['cityB'] = label.fit_transform(data['cityB'])

        self.df = data.drop(axis=1 ,columns=['timeStap' ,'predtime'])

    def getNumberFuture(self, df):
        return df.select_dtypes(include = [np.int64])

    def getFloatFuture(self, df):
        return df.select_dtypes(include = [np.float64])

    def getCatFututre(self, df):

        return df.select_dtypes(include = [np.object])



    def get_pipline(self):
        '''
        Функция запускает обработчки pipline!

        '''
        pipline = make_union(*[

            make_pipeline(FunctionTransformer(self.getNumberFuture ,validate=False)),
            make_pipeline(FunctionTransformer(self.getFloatFuture, validate=False))
            # Заглушка
            # make_pipeline(FunctionTransformer(self.getCatFututre, validate=False))

        ])

        return pipline.fit_transform(self.df)