from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback
import pickle
import os
import numpy as np
from fuzzywuzzy import process  # Import fuzzywuzzy for partial matching

print("Current working directory:", os.getcwd())

app = Flask(__name__)
with open('server/model/pt.pkl', 'rb') as f:
    pt = pickle.load(f)

with open('server/model/books.pkl', 'rb') as f:
    books = pickle.load(f)

with open('server/model/similarity_scores.pkl', 'rb') as f:
    similarity_scores = pickle.load(f)

# More explicit CORS configuration
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/')
def home():
    return 'Welcome to the API!'

@app.route('/api/recommend', methods=['POST'])
def recommend():
    print("Received request to recommend books.")
    
    try:
        # Explicitly parse JSON and handle potential errors
        data = request.get_json(force=True)
        print("Received data:", data)
        
        book_title = data.get('book_title')
        
        if not book_title:
            return jsonify({'error': 'Book title is required'}), 400

        # Perform fuzzy matching to find the best matching book title
        all_books = pt.index.tolist()  # Assuming pt.index contains all book titles
        closest_matches = process.extract(book_title, all_books, limit=5)

        if not closest_matches:
            return jsonify({'error': 'No matching books found.'}), 404

        # Choose the best match (highest score)
        best_match, score = closest_matches[0]
        if score < 50:  # You can adjust the threshold as needed
            return jsonify({'error': 'No closely matching book found.'}), 404
        
        print(f"Best match found: {best_match} with score {score}")

        # Get the index of the best match
        index = np.where(pt.index == best_match)[0][0]
        
        # Get similar items based on the similarity scores
        similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:6]

        data = []
        for i in similar_items:
            item = []
            temp_df = books[books['Book-Title'] == pt.index[i[0]]]
            item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
            item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
            item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))
            
            data.append(item)

        return jsonify(data)

    except Exception as e:
        # Comprehensive error logging
        print("Error details:")
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
