import pickle
import os
import numpy as np
print("Current working directory:", os.getcwd())

# Load the pre-trained models and data using the previous approach
with open('model/pt.pkl', 'rb') as f:
    pt = pickle.load(f)

with open('model/books.pkl', 'rb') as f:
    books = pickle.load(f)

with open('model/similarity_scores.pkl', 'rb') as f:
    similarity_scores = pickle.load(f)

def get_recommendations(book_title):
    """
    Get top 5 recommended books based on the input book title.

    Args:
        book_title (str): Title of the book to base recommendations on.
    
    Returns:
        list: List of recommended book titles or None if the book is not found.
    """
    try:
        if book_title not in pt.index:
            return None  # Book not found in dataset
        
        # Get the index of the book
        print('inside recommender')
        index = np.where(pt.index==book_title)[0][0]
        similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1],reverse=True)[1:5]
    
        data = []
        for i in similar_items:
                item = []
                temp_df = books[books['Book-Title'] == pt.index[i[0]]]
                item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
                item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
                item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))
                
                data.append(item)
        return data
            
    
    except Exception as e:
        print(f"Error in recommendation logic: {e}")
        return None
