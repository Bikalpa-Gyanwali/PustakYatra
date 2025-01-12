import styled from "styled-components";
import React, { useState } from 'react';
import { BsHeartFill } from "react-icons/bs";
import { FiBookmark } from "react-icons/fi";
import { useEffect } from "react";

import axios from "axios";



const BookDetailCard = ({ book, onToggleFavorites, onToggleWishlist }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    const message = isFavorite ? "Removed from favourites" : "Added to favourites";
    alert(message);
    onToggleFavorites(book);
  };

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    const message = isWishlisted ? "Removed from wishlist" : "Added to wishlist";
    alert(message);
    onToggleWishlist(book);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (book?.Title) {
          console.log('book is being fetched')
          const response = await axios.get(`http://localhost:5000/api/reviews/by-title/${book.Title}`);
          setReviews(response.data); // Set the reviews
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [book]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;
  return (
    <Card>

      <TitleContainer>
        <Title>{book.Title}</Title>
        <IconContainer>
          <BsHeartFill
            color={isFavorite ? "red" : "gray"}
            onClick={handleFavoriteClick}
            style={{ cursor: "pointer", fontSize: "24px" }}
          />
          <FiBookmark
            color={isWishlisted ? "blue" : "gray"}
            onClick={handleWishlistClick}
            style={{ cursor: "pointer", fontSize: "24px" }}
          />
        </IconContainer>
      </TitleContainer>
      {book.image && <BookImage src={book.image} alt={`${book.Title} cover`} />}

      <Section>
        <Label>Author(s):</Label> {book.authors?.join(", ")}
      </Section>

      <Section>
        <Label>Publisher:</Label> {book.publisher || "Unknown"}
      </Section>

      <Section>
        <Label>Published Date:</Label>{" "}
        {new Date(book.publishedDate).toLocaleDateString() || "N/A"}
      </Section>

      <Description>
        {book.description || "No description available."}
      </Description>

      <Link href={book.previewLink} target="_blank" rel="noopener noreferrer">
        Preview this book
      </Link>

      <AdditionalInfo>
        <h2>Additional Information</h2>
        <Section>
          <Label>Categories:</Label> {book.categories?.join(", ") || "N/A"}
        </Section>

        <Link href={book.infoLink} target="_blank" rel="noopener noreferrer">
          More Information
        </Link>
      </AdditionalInfo>
      <div>
        <h2>Reviews for {book.Title}</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.review_id} className="review">
              <p>
                <strong>Summary:</strong> {review.review_summary}
              </p>
              <p>
                <strong>Text:</strong> {review.review_text}
              </p>
              <p>
                <strong>Rating:</strong> {review.review_score} / 5
              </p>
              {/* <p>
                <strong>Time:</strong>{" "}
                {new Date(review.review_time * 1000).toLocaleDateString()}
              </p> */}
            </div>
          ))
        ) : (
          <p>No reviews available for this book.</p>
        )}
      </div>
    </Card>
  );
};

export default BookDetailCard;
// Styled components for layout and styling
const Card = styled.div`
  width: 80%;
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

const BookImage = styled.img`
  width: 50%; /* Reduced image size */
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 8px;
`;

const Section = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
`;

const Link = styled.a`
  display: inline-block;
  margin-top: 1rem;
  color: #0066cc;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const AdditionalInfo = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;