import yfinance as yf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import json
import PIL.Image
import google.generativeai as genai
from transformers import RobertaTokenizer, RobertaForSequenceClassification
import torch
from GoogleNews import GoogleNews
from collections import Counter

# Configure the Gemini API
genai.configure(api_key="AIzaSyDWwTj6w7tRJOpmgU6102GaIXYu3FdDM-0")

# Initialize RoBERTa model and tokenizer
tokenizer = RobertaTokenizer.from_pretrained('cardiffnlp/twitter-roberta-base-sentiment')
model = RobertaForSequenceClassification.from_pretrained('cardiffnlp/twitter-roberta-base-sentiment')

# Initialize the Google News scraper
googlenews = GoogleNews(lang='en', period='1d')  # Set language and period

# Functions for component 1
def fetch_stock_data(company, start_date, end_date):
    data = yf.download(company, start=start_date, end=end_date)
    if data.empty:
        raise ValueError("No data fetched from yfinance.")
    return data

def feature_engineering(data):
    data['MA50'] = data['Close'].rolling(window=50).mean()
    data['MA200'] = data['Close'].rolling(window=200).mean()
    data = data.dropna()
    if data.empty:
        raise ValueError("Feature engineering resulted in an empty dataframe.")
    return data

def prepare_data(data):
    X = data[['MA50', 'MA200']]
    y = data['Close'].shift(-1).dropna()
    X = X.iloc[:-1]
    if X.empty or y.empty:
        raise ValueError("Prepared data is empty.")
    return train_test_split(X, y, test_size=0.2, shuffle=False)

def train_model(X_train, y_train):
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('regressor', LinearRegression())
    ])
    pipeline.fit(X_train, y_train)
    return pipeline

def predict_next_day(model, X_latest):
    X_latest = X_latest.values.reshape(1, -1)
    return model.predict(X_latest)[0]

def plot_predictions(data, y_test, predictions):
    plt.figure(figsize=(14,7))
    plt.plot(data.index[-len(y_test):], y_test, label='Actual Price', color='blue')
    plt.plot(data.index[-len(y_test):], predictions, label='Predicted Price', color='orange')
    plt.title('Stock Price Prediction')
    plt.xlabel('Date')
    plt.ylabel('Price')
    plt.legend()
    image_path = 'stock_predictions.png'
    plt.savefig(image_path)
    plt.show()
    return image_path

def analyze_with_gemini(image_path, company):
    img = PIL.Image.open(image_path)
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content([
        f"Summarize this {company} stock prediction name and what it represents for given image and also give numerical analysis of the trend from image. Give specifics in a JSON format. Format is title will be one key, analysis will be one key which will be full text no more division between keys. Give detailed analysis as a string. Don't use multiline string in your response. Give string in such a way so that I can directly pass the response text in json.loads", 
        img
    ])
    response_text = response.text
    if not response_text.strip():
        raise ValueError("Received an empty response from Gemini API.")
    try:
        analysis_result = json.loads(response_text)
        return analysis_result.get('analysis', 'No detailed analysis provided.')
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {e}")
        return response_text

def analyze_sentiment(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
    probabilities = torch.softmax(logits, dim=-1).cpu().numpy()
    predicted_label = torch.argmax(logits, dim=-1).item()
    sentiment_labels = ['Negative', 'Neutral', 'Positive']
    return sentiment_labels[predicted_label], probabilities

def main():
    # Stock data and prediction
    company = 'GOOGL'
    start_date = '2012-01-01'
    end_date = '2024-08-28'
    data = fetch_stock_data(company, start_date, end_date)
    data = feature_engineering(data)
    X_train, X_test, y_train, y_test = prepare_data(data)
    model = train_model(X_train, y_train)
    next_day_features = X_test.iloc[-1]
    predicted_price = predict_next_day(model, next_day_features)
    image_path = plot_predictions(data, y_test, model.predict(X_test))
    analysis_result = analyze_with_gemini(image_path, company)
    
    # Sentiment analysis of stock prediction summary
    sentiment_summary, _ = analyze_sentiment(analysis_result)
    print(f"Sentiment of the stock prediction summary: {sentiment_summary}")

    # News sentiment analysis
    googlenews.search(company)
    results = googlenews.results()
    sentiment_counter = Counter()
    for article in results:
        title = article['title']
        sentiment, _ = analyze_sentiment(title)
        sentiment_counter[sentiment] += 1
        print(f"Title: {title}")
        print(f"Sentiment: {sentiment}")
    
    # Determine overall sentiment from news
    most_common_sentiment, count = sentiment_counter.most_common(1)[0]
    total_articles = sum(sentiment_counter.values())
    print(f"Overall Sentiment Analysis for the articles:")
    print(f"Most Common Sentiment: {most_common_sentiment}")
    print(f"Sentiment Counts: {dict(sentiment_counter)}")

    # Combine results
    final_sentiment = "Neutral"
    if sentiment_summary == "Positive" and most_common_sentiment == "Positive":
        final_sentiment = "Positive"
    elif sentiment_summary == "Negative" and most_common_sentiment == "Negative":
        final_sentiment = "Negative"
    
    print(f"Final Conclusive Sentiment: {final_sentiment}")

if __name__ == "__main__":
    main()
