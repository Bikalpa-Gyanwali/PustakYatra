import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AllBooksRoute } from '../../ApiRoute';
import styled from 'styled-components';
import BookCard from './BookCard';
import SearchBar from './Search';
const BookList = () => {
  const [books, setBooks] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books from the backend
  useEffect(() => {
    axios.get(AllBooksRoute)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setBooks(response.data); // Set the array of books
        } else {
            
          console.error('API response is not an array', response.data);
          setBooks([]); // Fallback to an empty array if response is invalid
        }
        setLoading(false); // Set loading to false
      })
      .catch((err) => {
        setError('Error fetching books');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading books...</p>;

  if (error) return <p>{error}</p>;

  return (

    <div>
      <SearchBar />
      {/* <h1>Books List</h1>
      <ul>
        {books.length > 0 ? (
          books.map((book, index) => (
            <li key={index}>
               <p><strong>Title:</strong> {book.BookTitle}</p>
              <p><strong>Author:</strong> {book.BookAuthor}</p>
              <p><strong>Year:</strong> {book.YearOfPublication}</p>
              <p><strong>Publisher:</strong> {book.Publisher}</p>
              <img src={book.ImageURLS} alt={book.BookTitle} />
            </li>
          ))
        ) : (
          <p>No books available</p>
        )}
      </ul> */}
      <BooksContainer>
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </BooksContainer>
    </div>
  );
};

export default BookList;

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 16px;
`;
