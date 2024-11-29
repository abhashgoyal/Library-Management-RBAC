"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserLogin: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'user', email: '' });
  const navigate = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Logging in with:', formData);

      const response = await axios.post('http://localhost:8000/login', formData);
      
      const { access_token, token_type, user_id } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('token_type', token_type);
      localStorage.setItem('user_id', user_id);

      console.log('Login successful, token saved.');
      navigate.push('/user-dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>User Login</h2>
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            style={{ ...styles.input, ...styles.inputPlaceholder }}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            style={{ ...styles.input, ...styles.inputPlaceholder }}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
        <p style={styles.registerText}>
          New user?{' '}
          <span
            style={styles.registerLink}
            onClick={() => {
              navigate.push('/register');
            }}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    padding: '0 20px',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '380px',
    transition: 'transform 0.3s ease-in-out',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    marginBottom: '1.5rem',
    letterSpacing: '1px',
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    fontSize: '1rem',
    color: '#555',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    color: '#333',  // Dark color for input text
    borderRadius: '8px',
    border: '1px solid #d1d1d1',
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  inputPlaceholder: {
    color: '#999',  // Light grey for placeholder text
  },
  button: {
    width: '100%',
    padding: '1rem',
    fontSize: '1.1rem',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
  },
  registerText: {
    marginTop: '1.2rem',
    textAlign: 'center',
    color: '#777',
    fontSize: '0.95rem',
  },
  registerLink: {
    color: '#007BFF',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default UserLogin;
