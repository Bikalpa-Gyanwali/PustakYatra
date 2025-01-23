import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { BsHeartFill } from "react-icons/bs";
import { FiBookmark } from "react-icons/fi";
import axios from "axios";
import { AddFavoriteRoute, AddWishlistRoute } from "../../ApiRoute";



const BookDetailCard = ({ book }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId"); // Get user ID from localStorage

  // Fetch reviews when the book changes
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (book?.Title) {
          const response = await axios.get(
            `http://localhost:5000/api/reviews/by-title/${book.Title}`
          );
          setReviews(response.data);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Error fetching reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [book]);

  // Handle adding the book to favorites
  const handleFavoriteClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to add favorites');
      }

      // Log the original book data
      console.log('Original book data:', book);

      const bookDetails = {
        Title: book.Title || book.title || book.Book || '',
        BookAuthor: book.BookAuthor || book.authors || [],
        Publisher: book.Publisher || book.publisher || '',
        YearOfPublication: book.YearOfPublication || book.publishedDate || '',
        ImageURLS: book.ImageURLS || book.image || '',
        description: book.description || '',
        previewLink: book.previewLink || '',
        infoLink: book.infoLink || '',
        categories: book.categories || []
      };

      // Log the processed book details
      console.log('Processed bookDetails:', bookDetails);

      // Validate title
      if (!bookDetails.Title) {
        throw new Error('Book title is required');
      }

      const response = await fetch(AddFavoriteRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookDetails })
      });

      // Log the raw response
      console.log('Raw response:', response);

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add to favorites');
      }

      setIsFavorite(true);
      // Add success notification here
      alert('Book added to favorites successfully!');
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      // Add error notification here
      alert(`Error: ${error.message}`);
    }
  };

 // Handle adding the book to wishlist
 const handleWishlistClick = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login to add to wishlist');
    }

    const bookDetails = {
      Title: book.Title || book.title || book.Book || '',
      BookAuthor: book.BookAuthor || book.authors || [],
      Publisher: book.Publisher || book.publisher || '',
      YearOfPublication: book.YearOfPublication || book.publishedDate || '',
      ImageURLS: book.ImageURLS || book.image || '',
      description: book.description || '',
      previewLink: book.previewLink || '',
      infoLink: book.infoLink || '',
      categories: book.categories || []
    };

    const response = await fetch(AddWishlistRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ bookDetails })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to add to wishlist');
    }

    setIsWishlisted(true);
    if (onWishlistAdd) {
      onWishlistAdd(bookDetails);
    }
    alert('Book added to wishlist successfully!');
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    alert(`Error: ${error.message}`);
  }
};


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
            color={isWishlisted ? "#1182c5" : "gray"}
            onClick={handleWishlistClick}
            style={{ 
              cursor: "pointer", 
              fontSize: "24px",
              transition: "color 0.3s ease",
              transform: isWishlisted ? "scale(1.1)" : "scale(1)",
            }}
          />
        </IconContainer>
      </TitleContainer>
      {book.image && <BookImage src={book.image} alt={`${book.Title} cover`} />}

      <Section>
        <Label>Author(s):</Label> {book.authors?.join(", ") || "N/A"}
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

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const BookImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin: 1rem 0;
`;

const Section = styled.div`
  margin: 0.5rem 0;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Description = styled.p`
  margin: 1rem 0;
  line-height: 1.5;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AdditionalInfo = styled.div`
  margin-top: 1rem;
`;
