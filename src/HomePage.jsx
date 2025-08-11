// src/HomePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div
        style={{
          ...styles.sidebar,
          width: isOpen ? "250px" : "0",
          padding: isOpen ? "1rem" : "0",
          overflow: "hidden",
        }}
      >
        {isOpen && (
          <>
            {/* Logo */}
            <div style={styles.logoContainer}>
              <img
                src="/logo.png"
                alt="Logo da Empresa"
                style={styles.logoImage}
              />
            </div>

            {/* Nome App */}
            <h2 style={styles.logoText}>Minha App</h2>

            {/* Menu */}
            <ul style={styles.menu}>
              <li style={styles.menuItem}>🏠 Dashboard</li>
              <li style={styles.menuItem}>📁 Opção 1</li>
              <li style={styles.menuItem}>⚙️ Configurações</li>
              <li style={styles.menuItem} onClick={handleLogout}>
                🚪 Sair
              </li>
            </ul>
          </>
        )}
      </div>

      {/* Conteúdo */}
      <div style={styles.content}>
        <button style={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "← Fechar" : "☰ Abrir"}
        </button>
        <h1>Bem-vindo à Home</h1>
        <p>Essa é a página inicial após o login.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#f8f9fa",
  },
  sidebar: {
    background: "linear-gradient(180deg, #007bff, #0056b3)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
    alignItems: "center",
    boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
  },
  logoContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  logoImage: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    padding: "5px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  logoText: {
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    letterSpacing: "1px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    flexGrow: 1,
    width: "100%",
  },
  menuItem: {
    padding: "0.8rem",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "0.3s",
    textAlign: "left",
    margin: "0.3rem 0",
    paddingLeft: "1.2rem",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: "2rem",
    transition: "margin-left 0.3s ease",
  },
  toggleBtn: {
    marginBottom: "1rem",
    padding: "0.5rem 1rem",
    background: "linear-gradient(90deg, #007bff, #0056b3)",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    transition: "0.3s",
  },
};
