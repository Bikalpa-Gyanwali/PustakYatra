import React, { useState, useEffect } from "react";
import axios from "axios";
import { topBooksRoute } from "../../ApiRoute";
import styled from "styled-components";


const TopBooks = () => {
  const [topBooks, setTopBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await axios.get(topBooksRoute);
        setTopBooks(response.data);
      } catch (error) {
        console.error("Error fetching top books:", error);
        setError("Failed to load top books.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopBooks();
  }, []);

  if (loading) return <LoadingMessage>Loading top books...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Header>Top Books by Average Rating</Header>
      <BooksGrid>
        {topBooks.map((book) => (
          <BookCard key={book._id}>
            <BookTitle>{book._id}</BookTitle>
            <BookRating>Average Rating: {book.averageRating.toFixed(2)}</BookRating>
            <BookReviews>Total Reviews: {book.reviewCount}</BookReviews>
          </BookCard>
        ))}
      </BooksGrid>
    </Container>
  );
};

export default TopBooks;
// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
  color: #333;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
`;

const BookCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const BookTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
`;

const BookRating = styled.p`
  font-size: 0.95rem;
  color: #555;

  &:before {
    content: "⭐ ";
    color: #f39c12;
  }
`;

const BookReviews = styled.p`
  font-size: 0.95rem;
  color: #555;

  &:before {
    content: "📚 ";
    color: #3498db;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: red;
`;
