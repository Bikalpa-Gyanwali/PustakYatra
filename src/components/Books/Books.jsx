import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AllBooksRoute } from '../../ApiRoute';
import styled from 'styled-components';
import BookCard from './BookCard';
import SearchBar from './Search';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(AllBooksRoute)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error('API response is not an array', response.data);
          setBooks([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching books');
        setLoading(false);
      });
  }, []);

  if (loading) return <Message>Loading books...</Message>;
  if (error) return <Message>{error}</Message>;

  return (
    <Container>
      <SearchBar />
      <Heading>Top Picks for You</Heading>
      <BooksContainer>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </BooksContainer>
    </Container>
  );
};

export default BookList;

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 2rem;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
`;

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
`;
