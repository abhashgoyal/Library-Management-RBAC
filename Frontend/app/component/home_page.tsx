import React from "react";

const HomePage = () => {
  return (
    <main style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to the Library Management System</h1>
        <p style={styles.subtitle}>
          <span style={styles.highlight}>Your gateway to knowledge.</span>
          <br />
          {/* <span style={styles.description}>
            Browse books, rent, and manage with ease.
          </span> */}
        </p>
      </div>
    </main>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url(https://source.unsplash.com/1600x900/?library,books)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    fontFamily: "'Poppins', Arial, sans-serif",
    textAlign: "center",
    position: "relative",
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
    padding: "2rem 3rem",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontWeight: 600,
  },
  subtitle: {
    fontSize: "1.2rem",
    lineHeight: "1.8",
    color: "#d1d1d1",
  },
  highlight: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#FFD700",
    display: "block",
    marginBottom: "0.5rem",
  },
  description: {
    fontSize: "1.2rem",
    color: "#f0f0f0",
  },
};

export default HomePage;

