import yfinance as yf
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt
import numpy as np

# Global parameters
initial_capital = 50000
investment_fraction = 0.2
stop_loss_threshold = -0.05
profit_target = 0.1

def fetch_live_data(symbol):
    data = yf.download(symbol, period='1y', interval='1d')
    data['target'] = (data['Close'].shift(-1) > data['Close']).astype(int)
    data['SMA_10'] = data['Close'].rolling(window=10).mean()
    data['SMA_50'] = data['Close'].rolling(window=50).mean()
    data['Volatility'] = data['Close'].rolling(window=10).std()
    data.dropna(inplace=True)
    return data

def prepare_data(data):
    features = data[['Open', 'High', 'Low', 'Close', 'Volume', 'SMA_10', 'SMA_50', 'Volatility']]
    target = data['target']
    return features, target

def train_model(features, target):
    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred))
    return model

def trading_simulation(symbol, model):
    data = fetch_live_data(symbol)
    features, _ = prepare_data(data)

    capital = initial_capital
    position = 0
    buy_price = 0
    trading_history = []

    buy_dates = []
    sell_dates = []

    for i in range(len(data)):
        current_price = data['Close'].iloc[i]

        if position == 0:
            X_current = features.iloc[i].values.reshape(1, -1)
            prediction = model.predict(X_current)[0]
            if prediction == 1:
                amount_to_invest = capital * investment_fraction
                position = amount_to_invest / current_price
                buy_price = current_price
                capital -= amount_to_invest
                buy_dates.append(data.index[i])
                trading_history.append((data.index[i], current_price, capital, (capital - initial_capital) / initial_capital * 100))
        elif position > 0:
            X_current = features.iloc[i].values.reshape(1, -1)
            prediction = model.predict(X_current)[0]
            if prediction == 0 or (current_price / buy_price - 1) <= stop_loss_threshold:
                capital += position * current_price
                position = 0
                buy_price = 0
                sell_dates.append(data.index[i])
                trading_history.append((data.index[i], current_price, capital, (capital - initial_capital) / initial_capital * 100))

        profit = (capital - initial_capital) / initial_capital * 100
        if profit >= profit_target * 100:
            break

    return data, trading_history, buy_dates, sell_dates

def plot_results(data, trading_history, buy_dates, sell_dates):
    fig, ax1 = plt.subplots(figsize=(14, 7))

    ax1.plot(data.index, data['Close'], label='Stock Price', color='blue', alpha=0.6)
    ax1.scatter(buy_dates, data.loc[buy_dates]['Close'], marker='^', color='green', label='Buy Signal', s=100)
    ax1.scatter(sell_dates, data.loc[sell_dates]['Close'], marker='v', color='red', label='Sell Signal', s=100)
    ax1.set_xlabel('Date')
    ax1.set_ylabel('Stock Price', color='blue')
    ax1.tick_params(axis='y', labelcolor='blue')

    history_df = pd.DataFrame(trading_history, columns=['Date', 'Price', 'Capital', 'Profit'])
    ax2 = ax1.twinx()
    ax2.plot(history_df['Date'], history_df['Capital'], label='Capital', color='green', linestyle='--')
    ax2.set_ylabel('Capital', color='green')
    ax2.tick_params(axis='y', labelcolor='green')

    fig.suptitle(f'Stock Prices and Agent Performance\nFinal Capital: {history_df["Capital"].iloc[-1]:.2f} INR, Profit: {history_df["Profit"].iloc[-1]:.2f}%')
    ax1.legend(loc='upper left')
    ax2.legend(loc='upper right')
    ax1.grid(True)
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    symbol = 'GOOGL'
    data = fetch_live_data(symbol)
    features, target = prepare_data(data)
    model = train_model(features, target)
    data, trading_history, buy_dates, sell_dates = trading_simulation(symbol, model)
    plot_results(data, trading_history, buy_dates, sell_dates)
