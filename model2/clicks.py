import numpy as np
import pandas as pd 
from sklearn.metrics  import f1_score,accuracy_score
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn import linear_model, svm
from sklearn.metrics import mean_squared_error
from sklearn.neighbors import LocalOutlierFactor
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import GradientBoostingRegressor


lof = LocalOutlierFactor(contamination=0.1, n_neighbors=20)




data = pd.read_csv('C:/Users/domin/Desktop/Coursera/ML Foundations/PEDE.csv', delimiter=";", encoding="ISO-8859-1", header=[0])
data["Kosten"] = data["Kosten"].str.replace(',', ".").astype(float)


data.drop(['Bundesland'], axis=1, inplace=True)
data.drop(['Netzwerkname'], axis=1, inplace=True)
data.drop(['Kampagnentypname'], axis=1, inplace=True)
data.drop(['Impressionen'], axis=1, inplace=True)
data.drop(['Conversions'], axis=1, inplace=True)


y = data["Klicks"].values
data.drop(['Klicks'], axis=1, inplace=True)
X = data.values


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=2)

yhat = lof.fit_predict(X_train)
mask = yhat != -1
X_train, y_train = X_train[mask, :], y_train[mask]


reg = GradientBoostingRegressor(random_state=0)
reg.fit(X_train, y_train)
y_pred = reg.predict(X_test)

# Report and Accuracy Score
scores = cross_val_score(reg, X, y, cv=10)
print("The r^2 of the model is %0.2f with a standard deviation of %0.2f" % (scores.mean(), scores.std()))

# Saving model
import pickle
pickle.dump(reg, open('clicks.pkl', 'wb'))

# Loading model
loaded_model = pickle.load(open('clicks.pkl', 'rb'))
result = loaded_model.score(X_test, y_test)
print(result)




