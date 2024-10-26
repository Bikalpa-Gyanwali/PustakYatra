// BookCard.jsx
import React from 'react';
import styled from 'styled-components';

// Styled Components
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const Info = styled.div`
  text-align: center;
  margin-top: 8px;
`;

const Title = styled.h3`
  font-size: 1.1em;
  font-weight: bold;
  margin: 8px 0 4px;
`;

const Author = styled.p`
  font-size: 0.9em;
  color: #666;
`;

const Year = styled.p`
  font-size: 0.9em;
  color: #666;
`;

const BookCard = ({ book }) => {
  return (
    <Card>
      <Image src={book.ImageURLM} alt={book.BookTitle} />
      <Info>
        <Title>{book.BookTitle}</Title>
        <Author>By: {book.BookAuthor}</Author>
        <Year>Published: {book.YearOfPublication}</Year>
      </Info>
    </Card>
  );
};

export default BookCard;
