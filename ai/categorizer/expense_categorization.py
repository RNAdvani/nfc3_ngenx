import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import RandomOverSampler
from imblearn.under_sampling import RandomUnderSampler
from imblearn.pipeline import Pipeline as ImbPipeline
import joblib  # For saving the model

# Load the dataset
file_path = './ai/categorizer/DailyHouseholdTransactions.csv'
data = pd.read_csv(file_path)

# Fill missing subcategories with a placeholder
data['Subcategory'].fillna('Unknown', inplace=True)

# Extract features from Date (e.g., Day of the week)
data['Date'] = pd.to_datetime(data['Date'], format='%d/%m/%Y', errors='coerce')
data['DayOfWeek'] = data['Date'].dt.dayofweek
data['HourOfDay'] = data['Date'].dt.hour

# Drop rows where 'Date' could not be parsed
data.dropna(subset=['Date'], inplace=True)

# Define features and target
X = data[['Mode', 'Subcategory', 'Note', 'Amount', 'Income/Expense', 'Currency', 'DayOfWeek', 'HourOfDay']]
y = data['Category']

# Fill missing values in the 'Note' column with an empty string
X['Note'].fillna('', inplace=True)

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Preprocessing steps
# For categorical variables
categorical_features = ['Mode', 'Subcategory', 'Income/Expense', 'Currency']
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

# For text data
text_features = 'Note'
text_transformer = Pipeline(steps=[
    ('tfidf', TfidfVectorizer(max_features=100))
])

# For numerical features
numerical_features = ['Amount', 'DayOfWeek', 'HourOfDay']
numerical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# Combine the transformations
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', categorical_transformer, categorical_features),
        ('text', text_transformer, text_features),
        ('num', numerical_transformer, numerical_features)
    ])

# Use Random Oversampling instead of SMOTE
oversample = RandomOverSampler(random_state=42)
undersample = RandomUnderSampler(random_state=42)

# Create the imbalanced pipeline
imb_pipeline = ImbPipeline(steps=[('preprocessor', preprocessor),
                                  ('oversample', oversample),
                                  ('undersample', undersample),
                                  ('classifier', RandomForestClassifier(random_state=42))])

# Train the model with balancing
imb_pipeline.fit(X_train, y_train)

# Evaluate the model
y_pred = imb_pipeline.predict(X_test)
print(classification_report(y_test, y_pred))

# Save the trained model
model_save_path = './ai/categorizer/expense_categorizer_model.pkl'
joblib.dump(imb_pipeline, model_save_path)
print(f"Model saved to {model_save_path}")

# Function to classify new transactions
def classify_transaction(data):
    input_df = pd.DataFrame([data])
    input_df['Date'] = pd.to_datetime(input_df['Date'], format='%d/%m/%Y', errors='coerce')
    if input_df['Date'].isna().any():
        raise ValueError("The 'Date' field is not in a valid format.")
    input_df['DayOfWeek'] = input_df['Date'].dt.dayofweek
    input_df['HourOfDay'] = input_df['Date'].dt.hour
    input_df['Subcategory'].fillna('Unknown', inplace=True)
    input_df['Note'].fillna('', inplace=True)
    prediction = imb_pipeline.predict(input_df)
    return prediction[0]

# Example usage
new_data = {
    'Mode': 'Credit',
    'Subcategory': 'clothes',
    'Note': 'bought tshirt',
    'Amount': 250.75,
    'Income/Expense': 'Expense',
    'Currency': 'INR',
    'Date': '29/08/2024'  # Date in dd/mm/yyyy format
}

predicted_category = classify_transaction(new_data)
print(f"Predicted Category: {predicted_category}")
