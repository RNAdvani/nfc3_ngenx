from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import xgboost as xgb
import json

# Initialize FastAPI app
app = FastAPI()

# Load the dataset and prepare the model (assuming this is done during initialization)
file_path = './ai/expense-prediction/modified_final.csv'
data = pd.read_csv(file_path)

# Preprocessing steps
data['Date'] = pd.to_datetime(data['Date'], format='%d-%m-%Y', errors='coerce')
data = data.dropna(subset=['Date'])
data.set_index('Date', inplace=True)
data = data[(data != 0).any(axis=1)]
monthly_data = data.resample('M').sum()
monthly_data = monthly_data[monthly_data.sum(axis=1) != 0]

X = monthly_data.fillna(0)
y = X.sum(axis=1)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

train_size = int(len(X) * 0.8)
X_train, X_test = X_scaled[:train_size], X_scaled[train_size:]
y_train, y_test = y[:train_size], y[train_size:]

# Train XGBoost model
model = xgb.XGBRegressor(objective='reg:squarederror', n_estimators=100, learning_rate=0.01, random_state=42)
model.fit(X_train, y_train)

# Define Pydantic model for JSON input
class PredictionRequest(BaseModel):
    data: list

# Route to handle predictions
@app.post("/predict")
async def predict_expense(request: PredictionRequest):
    try:
        # Convert incoming JSON data to DataFrame
        json_data = request.data
        df = pd.DataFrame(json_data)
        
        # Ensure columns match
        if set(df.columns) != set(monthly_data.columns):
            raise HTTPException(status_code=400, detail="Invalid data format")

        # Standardize the data
        df_scaled = scaler.transform(df)
        
        # Predict with the model
        predictions = model.predict(df_scaled)
        
        # Convert predictions to JSON response
        response = {"predictions": predictions.tolist()}
        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Running FastAPI with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
