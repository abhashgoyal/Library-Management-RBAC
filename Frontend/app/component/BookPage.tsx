'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/BooksPage.css';

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [purchasedBooks, setPurchasedBooks] = useState<any[]>([]);
  const [viewPurchased, setViewPurchased] = useState<boolean>(false); // State to control displaying purchased books
  const [purchased, setPurchased] = useState<any>([]);
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.get('http://localhost:8000/api/view-books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response",response.data.response);
      setBooks(response.data.response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  const fetchPurchasedBooks = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const userId = localStorage.getItem('user_id');

      if (!token || !userId) {
        console.error('No token or user ID found');
        return;
      }

      const response = await axios.get(`http://localhost:8000/user/view-purchased-books/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

      console.log("Purchased Books:", response.data.books);
      var books_data = []
      for (let i = 0; i < response.data.books.length; i++) {
        const bookId = response.data.books[i]
        const book_data = await axios.get(`http://localhost:8000/get-books/${bookId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });
        books_data.push(book_data.data.book)
      }
      setPurchased(books_data);
      console.log("purchased",purchased)
      setViewPurchased(true); // Show the purchased books list
    } catch (error) {
      console.error('Error fetching purchased books:', error);
      alert('Error fetching purchased books');
    }
  };

  const handleBuyBook = async (bookId: string) => {
    const token = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');

    if (!token || !userId) {
      console.error('No token or user ID found');
      return;
    }

    const buyDate = new Date().toISOString().split('T')[0];

    const data = {
      book_id: bookId,
      user_id: userId,
      buy_date: buyDate,
    };

    console.log("data",data);

    try {
      const response = await axios.post('http://localhost:8000/user/buy-book', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response",response.data);

      // Update the purchasedBooks state after successful purchase
      setPurchasedBooks((prevPurchasedBooks) => [...prevPurchasedBooks, bookId]);

      alert('Book purchased successfully!');
    } catch (error) {
      console.error('Error buying book:', error);
      alert('Error buying book');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  return (
    <div className="books-page">
      <header className="books-header">
        <h1>Books Available for Purchase</h1>
      </header>

      {viewPurchased ? (
        <div className="purchased-books-container">
          <h2>Purchased Books</h2>
          {purchased.length === 0 ? (
            <p>You have not purchased any books yet.</p>
          ) : (
            <div className="books-grid">
              {purchased.map((book: any) => (
                <div key={book._id} className="book-card">
                  <div className="book-content">
                    <h3>{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                    <p className="book-description">{book.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {books.length === 0 ? (
            <div className="no-books-container">
              <p>No books available at the moment.</p>
            </div>
          ) : (
            <div className="books-grid">
              {books.map((book) => (
                <div key={book.book_id} className="book-card">
                  <div className="book-content">
                    <h3>{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                    <p className="book-description">{book.description}</p>
                    <button 
                      onClick={() => handleBuyBook(book.book_id)}
                      disabled={purchasedBooks.includes(book.book_id)}
                      className={`buy-button ${purchasedBooks.includes(book.book_id) ? 'purchased' : ''}`}
                    >
                      {purchasedBooks.includes(book.book_id) ? 'Purchased' : 'Buy Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <button onClick={fetchPurchasedBooks} className='text-black'>
        View Purchased Books
      </button>
    </div>
  );
};

export default BooksPage;
