'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '', role: 'admin' });
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
      navigate.push('/admin-dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Admin Login</h2>
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
            style={styles.input}
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
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
        {/* <p style={styles.registerText}>
          Don't have an account? <span style={styles.registerLink}>Register</span>
        </p> */}
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
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.9rem',
    fontSize: '1rem',
    color: '#333', // Text color for input fields
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#f7f7f7',
    transition: 'border-color 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '1rem',
    fontSize: '1.1rem',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  registerText: {
    marginTop: '1rem',
    textAlign: 'center',
    color: '#777',
    fontSize: '0.9rem',
  },
  registerLink: {
    color: '#007BFF',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default AdminLogin;
