'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'moderators' | 'books'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [moderators, setModerators] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      switch(activeTab) {
        case 'users':
          const usersResponse = await axios.get('http://localhost:8000/admin/view-all-users', config);
          console.log("users", usersResponse.data.response)
          setUsers(usersResponse.data.response);
          break;
        case 'moderators':
          const moderatorsResponse = await axios.get('http://localhost:8000/admin/view-all-moderators', config);
          setModerators(moderatorsResponse.data.response);
          break;
        case 'books':
          const booksResponse = await axios.get('http://localhost:8000/api/view-books', config);
          setBooks(booksResponse.data.response);
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://localhost:8000/admin/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setUsers(users.filter(user => user.user_id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleDeleteModerator = async (moderatorId: string) => {
    if (!window.confirm('Are you sure you want to delete this moderator?')) return;

    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://localhost:8000/admin/delete-moderator/${moderatorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setModerators(moderators.filter(mod => mod.user_id !== moderatorId));
    } catch (error) {
      console.error('Error deleting moderator:', error);
      alert('Failed to delete moderator');
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://localhost:8000/admin/delete-book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setBooks(books.filter(book => book._id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
  };

  const renderUsersTable = () => (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Joined Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.user_id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td>
              <button 
                className="delete-btn" 
                onClick={() => handleDeleteUser(user.user_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderModeratorsTable = () => (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Assigned Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {moderators.map((moderator) => (
          <tr key={moderator.user_id}>
            <td>{moderator.username}</td>
            <td>{moderator.email}</td>
            <td>{new Date(moderator.createdAt).toLocaleDateString()}</td>
            <td>
              <button 
                className="delete-btn" 
                onClick={() => handleDeleteModerator(moderator.user_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderBooksTable = () => (
    <table className="admin-table">
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
                className="delete-btn" 
                onClick={() => handleDeleteBook(book._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="tab-navigation">
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={activeTab === 'moderators' ? 'active' : ''} 
          onClick={() => setActiveTab('moderators')}
        >
          Moderators
        </button>
        <button 
          className={activeTab === 'books' ? 'active' : ''} 
          onClick={() => setActiveTab('books')}
        >
          Books
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'users' && renderUsersTable()}
        {activeTab === 'moderators' && renderModeratorsTable()}
        {activeTab === 'books' && renderBooksTable()}
      </div>
    </div>
  );
};

export default AdminDashboard;