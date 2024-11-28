'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ModeratorDashboard.css';
import { useRouter } from 'next/navigation';

const ModeratorDashboard: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'books' | 'rentals'>('books');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const router = useRouter()
  const [rentForm, setRentForm] = useState({
    book_id: '',
    user_id: '',
    rent_price: 0,
    issue_date: '',
    return_date: '',
    is_returned: false
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const booksResponse = await axios.get('http://localhost:8000/api/view-books', config);
      setBooks(booksResponse.data.response);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const showRentedView = () => {
    router.push('/rented-books');
  }

  const handleRentBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post('http://localhost:8000/moderator/give-book-on-rent', rentForm, config);
      
      alert('Book rented successfully!');
      // Reset form and selected book
      setRentForm({
        book_id: '',
        user_id: '',
        rent_price: 0,
        issue_date: '',
        return_date: '',
        is_returned: false
      });
      setSelectedBook(null);
    } catch (error) {
      console.error('Error renting book:', error);
      alert('Failed to rent book');
    }
  };

  const handleReturnBook = async (bookRentDetails: any) => {
    try {
      const token = localStorage.getItem('access_token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put('http://localhost:8000/moderator/update-book-return', bookRentDetails, config);
      
      alert('Book return processed successfully!');
    } catch (error) {
      console.error('Error processing book return:', error);
      alert('Failed to process book return');
    }
  };

  const renderBooksTable = () => (
    <table className="moderator-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.book_id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>
              <button 
                className="rent-btn" 
                onClick={() => setSelectedBook(book)}
              >
                Rent Book
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderRentBookForm = () => {
    if (!selectedBook) return null;

    return (
      <div className="rent-book-form">
        <h2>Rent Book: {selectedBook.title}</h2>
        <form onSubmit={handleRentBook}>
          <input 
            type="hidden" 
            value={selectedBook._id} 
            onChange={(e) => setRentForm({...rentForm, book_id: e.target.value})}
          />
          <div>
            <label>User ID:</label>
            <input 
              type="text" 
              value={rentForm.user_id}
              onChange={(e) => setRentForm({...rentForm, user_id: e.target.value})}
              required 
            />
          </div>
          <div>
            <label>Issue Date:</label>
            <input 
              type="date" 
              value={rentForm.issue_date}
              onChange={(e) => setRentForm({...rentForm, issue_date: e.target.value})}
              required 
            />
          </div>
          <div>
            <label>Return Date:</label>
            <input 
              type="date" 
              value={rentForm.return_date}
              onChange={(e) => setRentForm({...rentForm, return_date: e.target.value})}
              required 
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">Rent Book</button>
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={() => setSelectedBook(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="moderator-dashboard">
      <h1>Moderator Dashboard</h1>
      
      <div className="tab-navigation">
        <button 
          className={activeTab === 'books' ? 'active' : ''} 
          onClick={() => setActiveTab('books')}
        >
          Books
        </button>
        <button 
          className={activeTab === 'rentals' ? 'active' : ''} 
          onClick={() => setActiveTab('rentals')}
        >
          Book Rentals
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'books' && renderBooksTable()}
        {selectedBook && renderRentBookForm()}
      </div>
      <div>
        <button onClick = {() => showRentedView()} className='text-white'>View Rented Books</button>
      </div>
    </div>

  );
};

export default ModeratorDashboard;