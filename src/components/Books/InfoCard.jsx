import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { BsHeartFill } from "react-icons/bs";
import { FiBookmark } from "react-icons/fi";

const Card = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #333;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const ContentGrid = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const ImageSection = styled.div`
  flex: 1;
`;

const BookImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const PreviewButton = styled.a`
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
`;

const InfoSection = styled.div`
  flex: 2;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  color: #555;
`;

const Description = styled.p`
  margin-top: 20px;
  color: #666;
`;

const ReviewsSection = styled.div`
  margin-top: 20px;
`;

const ReviewsTitle = styled.h2`
  font-size: 1.25rem;
  color: #333;
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 10px;
`;

const ReviewCard = styled.div`
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewRating = styled.div`
  font-size: 1rem;
  color: #f39c12;
`;

const ReviewSummary = styled.h4`
  margin-top: 10px;
  font-size: 1rem;
  color: #333;
`;

const ReviewText = styled.p`
  margin-top: 5px;
  color: #555;
`;

const NoReviews = styled.p`
  color: #999;
`;

const SentimentSection = styled.div`
  margin: 20px 0;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SentimentTitle = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 15px;
`;

const SentimentBar = styled.div`
  margin: 15px 0;
`;

const ProgressBarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  
  span:first-child {
    font-weight: bold;
    color: ${props => props.color};
  }
  
  span:last-child {
    color: #666;
  }
`;

const ProgressBarOuter = styled.div`
  width: 100%;
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressBarInner = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background: ${props => props.color};
  transition: width 0.3s ease;
`;

const LoadingMessage = styled.div`
  font-size: 1rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  font-size: 1rem;
  color: red;
`;

const BookDetailCard = ({ book }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [sentimentError, setSentimentError] = useState(null);

  const truncateText = (text) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > 50) {
      return words.slice(0, 50).join(' ') + '...';
    }
    return text;
  };

  const handleFavoriteClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
        throw new Error('Please login to add favorites');
      }

      // Log the original book data for debugging
      console.log('Original book data:', book);

      const bookDetails = {
        userId: userId,
        Title: book.Title || book.title || book.Book || '',
        BookAuthor: Array.isArray(book.BookAuthor) ? book.BookAuthor : 
                   Array.isArray(book.authors) ? book.authors : 
                   [book.BookAuthor || book.authors || 'Unknown'],
        Publisher: book.Publisher || book.publisher || '',
        YearOfPublication: book.YearOfPublication || book.publishedDate || '',
        ImageURLS: book.ImageURLS || book.image || '',
        description: book.description || '',
        previewLink: book.previewLink || '',
        infoLink: book.infoLink || '',
        categories: Array.isArray(book.categories) ? book.categories : 
                   book.categories ? [book.categories] : []
      };

      // Log the processed book details for debugging
      console.log('Processed bookDetails:', bookDetails);

      if (!bookDetails.Title) {
        throw new Error('Book title is required');
      }

      const requestBody = {
        userId: userId,
        bookDetails: bookDetails
      };

      const response = await fetch('http://localhost:5000/api/favorites/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      // Log the request body for debugging
      console.log('Request body:', requestBody);

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add to favorites');
      }

      setIsFavorite(true);
      alert('Book added to favorites successfully!');
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      alert(`Error: ${error.message}`);
    }
  };

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

      const response = await fetch('http://localhost:5000/api/wishlist/add', {
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
      alert('Book added to wishlist successfully!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (book?.Title) {
          const response = await axios.get(`http://localhost:5000/api/reviews/by-title/${book.Title}`);
          setReviews(response.data);
        }
      } catch (err) {
        setError("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [book]);

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        if (book?.Title) {
          const response = await axios.get(`http://localhost:5001/api/sentiment/${book.Title}`);
          if (response.data.status === "success") {
            setSentiment(response.data);
          } else {
            setSentimentError(response.data.message);
          }
        }
      } catch (err) {
        setSentimentError("Error fetching sentiment data");
      }
    };

    fetchSentiment();
  }, [book]);

  if (loading) return <LoadingMessage>Loading reviews...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Card>
      <MainContent>
        <TitleContainer>
          <Title>{book.Title}</Title>
          <IconContainer>
            <IconWrapper onClick={handleFavoriteClick}>
              <BsHeartFill color={isFavorite ? "#ff4d4d" : "#d1d1d1"} size={24} />
            </IconWrapper>
            <IconWrapper onClick={handleWishlistClick}>
              <FiBookmark color={isWishlisted ? "#4d79ff" : "#d1d1d1"} size={24} />
            </IconWrapper>
          </IconContainer>
        </TitleContainer>

        <ContentGrid>
          <ImageSection>
            {book.image && <BookImage src={book.image} alt={book.Title + " cover"} />}
            <PreviewButton href={book.previewLink} target="_blank" rel="noopener noreferrer">
              Preview Book
            </PreviewButton>
          </ImageSection>

          <InfoSection>
            <DetailRow>
              <Label>Author(s):</Label>
              <Value>{book.authors ? book.authors.join(", ") : "Unknown"}</Value>
            </DetailRow>
            <DetailRow>
              <Label>Publisher:</Label>
              <Value>{book.publisher || "Unknown"}</Value>
            </DetailRow>
            <DetailRow>
              <Label>Published Date:</Label>
              <Value>{new Date(book.publishedDate).toLocaleDateString() || "N/A"}</Value>
            </DetailRow>
            <DetailRow>
              <Label>Categories:</Label>
              <Value>{book.categories ? book.categories.join(", ") : "N/A"}</Value>
            </DetailRow>
            <Description>
              {truncateText(book.description) || "No description available."}
            </Description>
          </InfoSection>
        </ContentGrid>

        <SentimentSection>
          <SentimentTitle>Sentiment Analysis</SentimentTitle>
          {sentimentError ? (
            <ErrorMessage>{sentimentError}</ErrorMessage>
          ) : sentiment ? (
            <>
              <SentimentBar>
                <ProgressBarLabel color="#4CAF50">
                  <span>Positive</span>
                  <span>{(sentiment.sentiment_scores.positive * 100).toFixed(1)}%</span>
                </ProgressBarLabel>
                <ProgressBarOuter>
                  <ProgressBarInner 
                    width={sentiment.sentiment_scores.positive * 100} 
                    color="#4CAF50"
                  />
                </ProgressBarOuter>
              </SentimentBar>

              <SentimentBar>
                <ProgressBarLabel color="#FFC107">
                  <span>Neutral</span>
                  <span>{(sentiment.sentiment_scores.neutral * 100).toFixed(1)}%</span>
                </ProgressBarLabel>
                <ProgressBarOuter>
                  <ProgressBarInner 
                    width={sentiment.sentiment_scores.neutral * 100} 
                    color="#FFC107"
                  />
                </ProgressBarOuter>
              </SentimentBar>

              <SentimentBar>
                <ProgressBarLabel color="#f44336">
                  <span>Negative</span>
                  <span>{(sentiment.sentiment_scores.negative * 100).toFixed(1)}%</span>
                </ProgressBarLabel>
                <ProgressBarOuter>
                  <ProgressBarInner 
                    width={sentiment.sentiment_scores.negative * 100} 
                    color="#f44336"
                  />
                </ProgressBarOuter>
              </SentimentBar>
            </>
          ) : (
            <LoadingMessage>Loading sentiment data...</LoadingMessage>
          )}
        </SentimentSection>

        <ReviewsSection>
          <ReviewsTitle>Reviews for {book.Title}</ReviewsTitle>
          {reviews.length > 0 ? (
            <ReviewsGrid>
              {reviews.map((review) => (
                <ReviewCard key={review.review_id}>
                  <ReviewHeader>
                    <ReviewRating>
                      {"★".repeat(Math.round(review.review_score))}
                      {"☆".repeat(5 - Math.round(review.review_score))}
                    </ReviewRating>
                  </ReviewHeader>
                  <ReviewSummary>{truncateText(review.review_summary || '')}</ReviewSummary>
                  <ReviewText>{truncateText(review.review_text || '')}</ReviewText>
                </ReviewCard>
              ))}
            </ReviewsGrid>
          ) : (
            <NoReviews>No reviews available for this book.</NoReviews>
          )}
        </ReviewsSection>
      </MainContent>
    </Card>
  );
};

export default BookDetailCard;
