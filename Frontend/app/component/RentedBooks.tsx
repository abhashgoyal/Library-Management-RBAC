"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RentedBooksView: React.FC = () => {
  const [rentedBooks, setRentedBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRentedBooks();
  }, []);

  const fetchRentedBooks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('http://localhost:8000/admin/view-rented-books', config);
      setRentedBooks(response.data.response);
      console.log(response.data.response);
      setError(null);
    } catch (err) {
      console.error('Error fetching rented books:', err);
      setError('Failed to fetch rented books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading rented books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={fetchRentedBooks} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rented-books-container">
      <h2>Currently Rented Books</h2>
      {rentedBooks.length === 0 ? (
        <p>No books are currently rented.</p>
      ) : (
        <table className="rented-books-table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>User ID</th>
              <th>Rent Date</th>
              <th>Expected Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rentedBooks.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.book_title}</td>
                <td>{rental.user_id}</td>
                <td>{new Date(rental.issue_date).toLocaleDateString()}</td>
                <td>{new Date(rental.return_date).toLocaleDateString()}</td>
                <td>
                  {rental.is_returned 
                    ? 'Returned' 
                    : (new Date(rental.return_date) < new Date() 
                      ? 'Overdue' 
                      : 'Rented')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RentedBooksView;