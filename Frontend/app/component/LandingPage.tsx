"use client";
import { useRouter } from "next/navigation";
import React from "react";

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = (role: string) => {
    console.log(`Login as ${role}`);
    if (role === "user") {
      router.push("/login/user-login");
    } else if (role === "admin") {
      router.push("/login/admin-login");
    } else if (role === "moderator") {
      router.push("/login/moderator-login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.title}>Library Management System</h1>
        <div style={styles.buttons}>
          <button style={styles.button} onClick={() => handleLogin("user")}>
            Login as User
          </button>
          <button style={styles.button} onClick={() => handleLogin("admin")}>
            Login as Admin
          </button>
          <button style={styles.button} onClick={() => handleLogin("moderator")}>
            Login as Moderator
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundImage: "url(https://source.unsplash.com/1600x900/?library,books)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "'Poppins', Arial, sans-serif",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    zIndex: 1,
    textAlign: "center",
    padding: "2rem",
    borderRadius: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "2rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontWeight: 600,
    animation: "fadeInDown 1s ease-out",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  button: {
    padding: "0.8rem 1.5rem", 
    fontSize: "1rem", 
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "6px", 
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
    transform: "scale(1.05)",
  },
};

export default LandingPage;
