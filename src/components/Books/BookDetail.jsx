import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookDetailCard from './InfoCard';
import SearchBar from './Search';

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError('Error fetching book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <SearchBar />
      <div>
        {book ? <BookDetailCard book={book} /> : <p>Loading book details...</p>}
      </div>
    </>
  );
};

export default BookDetail;
