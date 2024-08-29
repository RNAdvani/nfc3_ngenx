import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, MaxPooling1D, Flatten, Dense
from tensorflow.keras.optimizers import Adam

# Load the dataset
file_path = './ai/expense-prediction/monthly_summary.csv'
data = pd.read_csv(file_path)

# Aggregate data by Year and Month
category_columns = data.columns[2:]  # Assuming first two columns are Year and Month
data_aggregated = data.groupby(['Year', 'Month'])[category_columns].sum().reset_index()

# Define features and target
X = data_aggregated.drop(columns=['Year', 'Month'])
X = X.fillna(0)  # Replace NaNs with 0

# Target is the sum of all category expenses
y = X.sum(axis=1)

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Reshape data for CNN
X_reshaped = np.expand_dims(X_scaled, axis=2)  # Add channel dimension

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X_reshaped, y, test_size=0.2, random_state=42)

# Build the CNN model
model = Sequential([
    Conv1D(filters=64, kernel_size=3, activation='relu', input_shape=(X_train.shape[1], X_train.shape[2])),
    MaxPooling1D(pool_size=2),
    Conv1D(filters=128, kernel_size=3, activation='relu'),
    MaxPooling1D(pool_size=2),
    Flatten(),
    Dense(64, activation='relu'),
    Dense(1)
])

# Compile the model
model.compile(optimizer=Adam(learning_rate=0.01), loss='mean_squared_error')

# Train the model
model.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.2, verbose=1)

# Evaluate the model
y_pred = model.predict(X_test).flatten()
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)

print(f'Mean Absolute Error: {mae}')
print(f'Mean Squared Error: {mse}')

# Load and prepare upcoming month's expense data
future_months = pd.DataFrame({
    'Year': [2024] * 12,  # Adjust year as needed
    'Month': list(range(1, 13))  # For every month in the year
})

# Assuming the upcoming months CSV has category columns with zero values
future_months_expenses = pd.DataFrame(columns=category_columns)
future_months_expenses = future_months_expenses.reindex(columns=category_columns, fill_value=0)
future_data = pd.concat([future_months, future_months_expenses], axis=1).fillna(0)

# Standardize future data and reshape
future_data_scaled = scaler.transform(future_data.drop(columns=['Year', 'Month']))
future_data_reshaped = np.expand_dims(future_data_scaled, axis=2)

# Predict total expenses for the upcoming months
y_pred_future = model.predict(future_data_reshaped).flatten()
future_months['Predicted_Total'] = y_pred_future

# Calculate the proportion of each category
category_proportions = X.mean() / X.sum(axis=1).mean()

# Predict category-wise expenses
for category in category_columns:
    future_months[f'Predicted_{category}'] = future_months['Predicted_Total'] * category_proportions[category]

# Display predictions for upcoming months
print(future_months[['Year', 'Month'] + [f'Predicted_{cat}' for cat in category_columns]])
