
from sklearn.linear_model import LinearRegression

from datetime import datetime
from Model.Pipline import Simple_pipline
import pandas as pd


class LinearML():


    def __init__(self, train, obj_pred):

        self.y = pd.to_datetime(train['predtime']).apply(lambda x: x.timestamp())

        self.train = Simple_pipline(train).get_pipline()
        self.test = Simple_pipline(obj_pred).get_pipline()



    def getPipData(self):
        return self.train

    def predict(self):
        linear = LinearRegression ()
        linear.fit(self.train, self.y)
        predict = linear.predict(self.test)

        time_string = f"{datetime.fromtimestamp(predict).hour} :" \
                      f" {datetime.fromtimestamp(predict).minute}"
        return time_string