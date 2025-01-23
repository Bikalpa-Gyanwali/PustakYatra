from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import ast
import numpy as np

app = Flask(__name__)
CORS(app)

def load_sentiment_data():
    try:
        return pd.read_pickle("/Users/rohitmandal/Downloads/PustakYatra-master/server/model/book_reviews_sentiment.pkl")
    except Exception as e:
        print(f"Error loading sentiment data: {e}")
        return None

# Load the sentiment data
sentiment_data = load_sentiment_data()

@app.route('/api/sentiment/<title>', methods=['GET'])
def get_sentiment(title):
    try:
        if sentiment_data is None:
            return jsonify({
                'status': 'error',
                'message': 'Sentiment data could not be loaded'
            }), 500
            
        # Find all reviews for the given title
        book_sentiments = sentiment_data[sentiment_data['Title'].str.lower() == title.lower()]
        
        if book_sentiments.empty:
            return jsonify({
                'status': 'error',
                'message': f'No sentiment data available for: {title}'
            }), 404
            
        # Calculate average sentiment scores
        avg_scores = {
            'negative': 0.0,
            'neutral': 0.0,
            'positive': 0.0
        }
        
        # Convert string representation of dictionary to actual dictionary
        for scores in book_sentiments['sentiment_scores']:
            if isinstance(scores, str):
                scores = ast.literal_eval(scores)
            avg_scores['negative'] += scores['negative']
            avg_scores['neutral'] += scores['neutral']
            avg_scores['positive'] += scores['positive']
        
        # Calculate averages
        num_reviews = len(book_sentiments)
        for key in avg_scores:
            avg_scores[key] = float(avg_scores[key] / num_reviews)
        
        # Get the overall sentiment (most common)
        overall_sentiment = book_sentiments['sentiment'].mode()[0]
        
        # Calculate confidence score (highest average probability)
        confidence_score = max(avg_scores.values())
        
        response = {
            'status': 'success',
            'title': title,
            'overall_sentiment': overall_sentiment,
            'confidence_score': float(confidence_score),
            'sentiment_scores': {
                'negative': float(avg_scores['negative']),
                'neutral': float(avg_scores['neutral']),
                'positive': float(avg_scores['positive'])
            },
            'num_reviews_analyzed': num_reviews
        }
        
        return jsonify(response)
        
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({
            'status': 'error',
            'message': f'Error processing sentiment data: {str(e)}'
        }), 500

# Add a route to get sentiment data for multiple books
@app.route('/api/sentiment/batch/<titles>', methods=['GET'])
def get_batch_sentiment(titles):
    try:
        title_list = titles.split(',')
        results = {}
        
        for title in title_list:
            book_sentiments = sentiment_data[sentiment_data['Title'].str.lower() == title.lower()]
            
            if not book_sentiments.empty:
                # Calculate average sentiment scores
                avg_scores = {
                    'negative': 0.0,
                    'neutral': 0.0,
                    'positive': 0.0
                }
                
                for scores in book_sentiments['sentiment_scores']:
                    if isinstance(scores, str):
                        scores = ast.literal_eval(scores)
                    avg_scores['negative'] += scores['negative']
                    avg_scores['neutral'] += scores['neutral']
                    avg_scores['positive'] += scores['positive']
                
                num_reviews = len(book_sentiments)
                for key in avg_scores:
                    avg_scores[key] = float(avg_scores[key] / num_reviews)
                
                results[title] = {
                    'overall_sentiment': book_sentiments['sentiment'].mode()[0],
                    'confidence_score': float(max(avg_scores.values())),
                    'sentiment_scores': avg_scores,
                    'num_reviews': num_reviews
                }
        
        return jsonify({
            'status': 'success',
            'results': results
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

if __name__ == '__main__':
    app.run(port=5001, debug=True)
