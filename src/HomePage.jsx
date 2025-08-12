// src/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Sugiro instalar react-icons: npm install react-icons
import { FaTachometerAlt, FaRegFileAlt, FaPaperPlane, FaCalendarAlt, FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [metrics, setMetrics] = useState({
    totalSent: 0,
    totalScheduled: 0,
    totalFailed: 0,
    successRate: 0,
  });
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split("T")[0]);
  const [temperature, setTemperature] = useState(26); // Simulação

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Simulação de dados
  useEffect(() => {
    // Exemplo: fetch(`/api/metrics?date=${dateFilter}`).then(r => r.json()).then(setMetrics);
    setMetrics({
      totalSent: 1250,
      totalScheduled: 340,
      totalFailed: 25,
      successRate: 97.5,
    });

    // Exemplo de temperatura (mock)
    setTemperature(28);
  }, [dateFilter]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
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
            <h2 style={styles.logoText}>WhatsApp Bot</h2>

            {/* Menu */}
            <ul style={styles.menu}>
              <li style={styles.menuItem}><FaTachometerAlt /> Dashboard</li>
              <li style={styles.menuItem}><FaRegFileAlt /> Templates</li>
              <li style={styles.menuItem}><FaPaperPlane /> Envios</li>
              <li style={styles.menuItem}><FaCalendarAlt /> Agendamentos</li>
              <li style={styles.menuItem}><FaCog /> Configurações</li>
              <li style={styles.menuItem} onClick={handleLogout}><FaSignOutAlt /> Sair</li>
            </ul>
          </>
        )}
      </div>

      {/* Conteúdo */}
      <div style={styles.content}>
        {/* Barra superior */}
        <div style={styles.topBar}>
          <button style={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "← Fechar" : "☰ Abrir"}
          </button>
          <div style={styles.profileMenu} onClick={() => navigate("/perfil")}>
            <FaUserCircle size={40} color="#007bff" />
            <div>
              <strong style={{ color: "#333" }}>Felipe</strong>
              <div style={{ fontSize: "0.85rem", color: "#555" }}>Ver perfil</div>
            </div>
          </div>
        </div>

        {/* Header Bonito */}
        <div style={styles.headerCard}>
          <h2>{getGreeting()}, Felipe! 👋</h2>
          <p>Hoje é {new Date().toLocaleDateString("pt-BR")} | 🌡 {temperature}°C</p>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Aqui está um resumo das atividades do seu disparo automático de WhatsApp.
          </p>
        </div>

        {/* Filtro de Data */}
<div style={styles.filterSection}>
  <label htmlFor="dateFilter" style={styles.filterLabel}>📅 Filtrar por data:</label>
  <input
    type="date"
    id="dateFilter"
    value={dateFilter}
    onChange={(e) => setDateFilter(e.target.value)}
    style={styles.dateInput}
  />
</div>

        {/* Métricas */}
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <h3>Mensagens Enviadas</h3>
            <p>{metrics.totalSent}</p>
          </div>
          <div style={styles.metricCard}>
            <h3>Mensagens Agendadas</h3>
            <p>{metrics.totalScheduled}</p>
          </div>
          <div style={styles.metricCard}>
            <h3>Falhas</h3>
            <p>{metrics.totalFailed}</p>
          </div>
          <div style={styles.metricCard}>
            <h3>Taxa de Sucesso</h3>
            <p>{metrics.successRate}%</p>
          </div>
        </div>
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
    gap: "0.6rem",
  },
  content: {
    flex: 1,
    padding: "1rem 2rem",
    transition: "margin-left 0.3s ease",
  },
  toggleBtn: {
    marginRight: "1rem",
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
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  profileMenu: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    background: "#fff",
    padding: "0.4rem 0.8rem",
    borderRadius: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  headerCard: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "1rem",
  },
  filterSection: {
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  dateInput: {
    padding: "0.4rem 0.6rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
  },
  metricCard: {
    background: "#fff",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};
