

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

def generate_dummy_data(rows=1000):
    """
    Generates a dummy dataset simulating air quality sensor data.
    The data includes features like SO2, NO2, and SPM, and a target variable AQI.
    A simple linear relationship is created, with some noise added.
    """
    np.random.seed(42)  # For reproducibility
    
    # Create a DataFrame with random data
    data = pd.DataFrame({
        'so2': np.random.uniform(1, 50, size=rows),
        'no2': np.random.uniform(5, 100, size=rows),
        'spm': np.random.uniform(10, 200, size=rows),
    })
    
    # Introduce some missing values to simulate real-world data
    data.loc[data.sample(frac=0.1).index, 'so2'] = np.nan
    data.loc[data.sample(frac=0.05).index, 'no2'] = np.nan
    
    # Create the target variable (AQI) based on a simple formula with some random noise
    # This is a simplified version of a real-world AQI calculation
    data['AQI'] = (data['so2'] * 1.5 + data['no2'] * 0.8 + data['spm'] * 0.5) + np.random.normal(0, 5, size=rows)
    
    print("--- Dummy Data Generated ---")
    print(data.head())
    print("\n")
    return data

def preprocess_data(df):
    """
    Preprocesses the data by handling missing values.
    For this example, missing values are filled with the mean of the column.
    """
    print("--- Preprocessing Data ---")
    # Fill missing values with the mean of each column
    df_preprocessed = df.fillna(df.mean())
    print("Missing values after preprocessing:\n", df_preprocessed.isnull().sum())
    print("\n")
    return df_preprocessed

def train_and_predict(df):
    """
    Trains a Random Forest Regressor model and makes predictions.
    This model is often more powerful for real-world data than Linear Regression.
    """
    print("--- Training and Predicting with Random Forest ---")
    # Define features and target
    features = ['so2', 'no2', 'spm']
    target = 'AQI'
    
    X = df[features]
    y = df[target]
    
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Initialize and train the Random Forest Regressor model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Make predictions on the test data
    y_pred = model.predict(X_test)
    
    # Evaluate the model
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    
    print(f"Model Performance:")
    print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")
    print(f"R-squared (R2) Score: {r2:.4f}")
    
    return model, X_test, y_test, y_pred

def visualize_predictions(y_test, y_pred):
    """
    Generates a scatter plot to visualize true vs. predicted values
    and saves it to a file.
    """
    print("--- Generating Visualization ---")
    plt.figure(figsize=(8, 6))
    plt.scatter(y_test, y_pred, alpha=0.7)
    plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
    plt.xlabel("True AQI Values")
    plt.ylabel("Predicted AQI Values")
    plt.title("Scatter Plot of True vs. Predicted AQI Values")
    plt.grid(True)
    
    # Save the figure instead of showing it
    plt.savefig('aqi_prediction_scatter_plot.png')
    
    print("Visualization saved as 'aqi_prediction_scatter_plot.png'.")

def classify_aqi(aqi_value):
    """
    Categorizes an AQI value into a rating based on standard ranges.
    """
    if 0 <= aqi_value <= 50:
        return "Good"
    elif 51 <= aqi_value <= 100:
        return "Moderate"
    elif 101 <= aqi_value <= 200:
        return "Unhealthy"
    elif 201 <= aqi_value <= 300:
        return "Very Unhealthy"
    elif 301 <= aqi_value <= 400:
        return "Hazardous"
    elif aqi_value > 400:
        return "Hazardous"
    else:
        return "Not Classified"

def main():
    # Step 1: Generate dummy data
    raw_data = generate_dummy_data()
    
    # Step 2: Preprocess the data
    processed_data = preprocess_data(raw_data)
    
    # Step 3 & 4: Train the model and make predictions
    trained_model, X_test, y_test, y_pred = train_and_predict(processed_data)
    
    # Step 5: Visualize the results
    visualize_predictions(y_test, y_pred)
    
    print("\n--- Example Prediction & Comparison ---")
    # Take the first row of the test data as an example input
    example_input = X_test.iloc[0]
    
    # The fix: Create a DataFrame with the correct column names for prediction
    example_input_df = pd.DataFrame([example_input])
    
    # Make the prediction using the new DataFrame
    example_prediction = trained_model.predict(example_input_df)
    
    # Simulate a "real-life" AQI value (we'll use the true value from the test set)
    real_aqi_value = y_test.iloc[0]
    
    # Calculate the percentage difference
    percentage_diff = abs(example_prediction[0] - real_aqi_value) / real_aqi_value * 100
    
    # Classify the predicted and real AQI
    predicted_category = classify_aqi(example_prediction[0])
    real_category = classify_aqi(real_aqi_value)
    
    print(f"AI Model Prediction: {example_prediction[0]:.2f} ({predicted_category})")
    print(f"Simulated Real-Life Outcome: {real_aqi_value:.2f} ({real_category})")
    print(f"Difference: {percentage_diff:.2f}%")
    

if __name__ == "__main__":
    main()
