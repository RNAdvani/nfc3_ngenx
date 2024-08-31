from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
from datetime import datetime

# Load the trained model
model_save_path = './ai/categorizer/expense_categorizer_model.pkl'
model = joblib.load(model_save_path)

# Define the data model for the input request
class Transaction(BaseModel):
    Mode: str
    Subcategory: str
    Note: str
    Amount: float
    Income_Expense: str  # Use underscore instead of '/'
    Currency: str
    Date: str  # Date in dd/mm/yyyy format

# Initialize the FastAPI app
app = FastAPI()

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Expense Categorizer API"}

# Endpoint to classify a transaction
@app.post("/classify/")
def classify_transaction(transaction: Transaction):
    try:
        # Convert transaction to a DataFrame
        data = {
            'Mode': [transaction.Mode],
            'Subcategory': [transaction.Subcategory],
            'Note': [transaction.Note],
            'Amount': [transaction.Amount],
            'Income/Expense': [transaction.Income_Expense],
            'Currency': [transaction.Currency],
            'Date': [transaction.Date]
        }
        input_df = pd.DataFrame(data)
        
        # Parse the date and extract day of the week and hour of the day
        input_df['Date'] = pd.to_datetime(input_df['Date'], format='%d/%m/%Y', errors='coerce')
        if input_df['Date'].isna().any():
            raise ValueError("The 'Date' field is not in a valid format.")
        input_df['DayOfWeek'] = input_df['Date'].dt.dayofweek
        input_df['HourOfDay'] = input_df['Date'].dt.hour

        # Fill missing values
        input_df['Subcategory'].fillna('Unknown', inplace=True)
        input_df['Note'].fillna('', inplace=True)
        
        # Predict the category
        prediction = model.predict(input_df)
        return {"predicted_category": prediction[0]}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Endpoint to get all categories in the dataset
@app.get("/categories/")
def get_categories():
    categories = model.named_steps['classifier'].classes_
    return {"categories": list(categories)}

# To run the app, use the command:
# uvicorn script_name:app --reload