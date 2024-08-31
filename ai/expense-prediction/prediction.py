import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error
import xgboost as xgb

# Load the dataset
file_path = './ai/expense-prediction/modified_final.csv'
data = pd.read_csv(file_path)

# Inspect the columns and first few rows
print("Columns in the dataset:", data.columns)
print("First few rows of the dataset:")
print(data.head())

# Convert the 'Date' column to datetime if it exists
if 'Date' in data.columns:
    data['Date'] = pd.to_datetime(data['Date'], format='%d-%m-%Y', errors='coerce')
    data = data.dropna(subset=['Date'])
    data.set_index('Date', inplace=True)
else:
    raise ValueError("No 'Date' column found in the dataset. Please ensure your dataset has a 'Date' column.")

# Check the data after setting 'Date' as the index
print("Data after setting 'Date' as index:")
print(data.head())

# Drop rows where all category values are zero
data = data[(data != 0).any(axis=1)]

# Check the data after dropping rows with all-zero values
print("Data after removing rows with all zeros:")
print(data.head())

# Aggregate data monthly if needed (assuming the data is already monthly if the 'Date' column is set as index)
monthly_data = data.resample('M').sum()

# Remove months where total expenses are zero
monthly_data = monthly_data[monthly_data.sum(axis=1) != 0]

# Check if monthly_data is empty
if monthly_data.empty:
    raise ValueError("Aggregated monthly data is empty or all months have zero totals. Check your input data.")

print("Filtered Monthly data:")
print(monthly_data.head())

# Define features (all category columns) and target (sum of all categories)
X = monthly_data.fillna(0)  # Replace NaNs with 0
y = X.sum(axis=1)  # Sum across all categories

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split data into training and test sets (using time-based split for small datasets)
train_size = int(len(X) * 0.8)
X_train, X_test = X_scaled[:train_size], X_scaled[train_size:]
y_train, y_test = y[:train_size], y[train_size:]

# Using XGBoost
model = xgb.XGBRegressor(objective='reg:squarederror', n_estimators=100, learning_rate=0.01, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)

print(f'Mean Absolute Error: {mae}')
print(f'Mean Squared Error: {mse}')

# Predict monthly expenditures for the next 3 months
# Create a DataFrame for future data (use zeros as placeholders)
future_dates = pd.date_range(start=monthly_data.index[-1] + pd.DateOffset(months=1), periods=3, freq='M')
future_data = pd.DataFrame(np.zeros((3, len(monthly_data.columns))), index=future_dates, columns=monthly_data.columns)

# Standardize future data
future_data_scaled = scaler.transform(future_data)

# Predict total expenses for the upcoming months
y_pred_future = model.predict(future_data_scaled)
future_data['Predicted_Total'] = y_pred_future

# Display predictions for future data
print(future_data)
