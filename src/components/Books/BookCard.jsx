import React from 'react';
import styled from 'styled-components';

const BookCard = ({ book }) => {
  return (
    <Card>
      <Image src={book.ImageURLM} alt={book.BookTitle} />
      <Info>
        <Title>{book.BookTitle}</Title>
        <Author>By: {book.BookAuthor}</Author>
        <Year>Published: {book.YearOfPublication}</Year>
        {book.averageRating && (
          <Rating>Rating: ⭐ {book.averageRating.toFixed(1)}</Rating>
        )}
        {book.reviewCount && (
          <Reviews>Total Reviews: 📚 {book.reviewCount}</Reviews>
        )}
      </Info>
    </Card>
  );
};

export default BookCard;

// Styled Components
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 10px 10px 0 0;
`;

const Info = styled.div`
  text-align: center;
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const Author = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 4px;
`;

const Year = styled.p`
  font-size: 0.9rem;
  color: #777;
`;

const Rating = styled.p`
  font-size: 0.9rem;
  color: #f39c12;
`;

const Reviews = styled.p`
  font-size: 0.9rem;
  color: #3498db;
`;
