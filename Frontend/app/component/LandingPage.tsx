"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const LandingPage: React.FC = () => {
    const router = useRouter();
  const handleLogin = (role: string) => {
    console.log(`Login as ${role}`);
    // Redirect logic here
    if (role === 'user') {
        router.push('/login/user-login')
    }
    else if (role === 'admin') {
        router.push('/login/admin-login')
    }
    else if (role === 'moderator') {
        router.push('/login/moderator-login')
    }
    
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.title}>Library Management System</h1>
        <div style={styles.buttons}>
          <button style={styles.button} onClick={() => handleLogin('user')}>
            Login as User
          </button>
          <button style={styles.button} onClick={() => handleLogin('admin')}>
            Login as Admin
          </button>
          <button style={styles.button} onClick={() => handleLogin('moderator')}>
            Login as Moderator
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?library,books)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    zIndex: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1.2rem',
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
};

export default LandingPage;
