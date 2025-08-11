// src/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("❌ Usuário ou senha inválidos");
      } else {
        setMessage("⚠️ Erro no servidor");
      }
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        {/* Logo da empresa */}
        <div style={styles.logoContainer}>
          <img src="/logo.png" alt="Logo" style={styles.logo} />
        </div>

        <h2 style={styles.title}>Bem-vindo</h2>
        <p style={styles.subtitle}>Entre com suas credenciais</p>

        <input
          style={styles.input}
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} type="submit">
          Entrar
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #007bff, #0056b3)",
  },
  form: {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "15px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  },
  logoContainer: {
    marginBottom: "1rem",
  },
  logo: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#fff",
    padding: "5px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "0.2rem",
    color: "#0056b3",
  },
  subtitle: {
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
    color: "#666",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    transition: "border 0.3s ease, box-shadow 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "0.8rem",
    background: "linear-gradient(90deg, #007bff, #0056b3)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s ease, transform 0.2s ease",
  },
  message: {
    marginTop: "1rem",
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
  },
};

// Efeito de foco para inputs
styles.input[":focus"] = {
  border: "1px solid #007bff",
  boxShadow: "0 0 8px rgba(0, 123, 255, 0.4)",
};
