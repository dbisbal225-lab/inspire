import React, { useState } from "react";
import "./styles/MoreOptions.css";

function MoreOptions() {
  const [expandedOption, setExpandedOption] = useState(null);

  const options = [
    {
      id: 1,
      title: "Citas Médicas",
      icon: "📅",
      description: "Gestiona y programa tus citas",
      features: ["Agendar citas", "Recordatorios", "Historial de citas", "Video llamadas"],
      color: "#3498db"
    },
    {
      id: 2,
      title: "Historial de Síntomas",
      icon: "🤒",
      description: "Registra y monitorea síntomas",
      features: ["Log diario de síntomas", "Gráficos de evolución", "Alertas automáticas", "Exportar reportes"],
      color: "#e74c3c"
    },
    {
      id: 3,
      title: "Ejercicio y Actividad",
      icon: "🏃",
      description: "Monitorea tu actividad física",
      features: ["Contador de pasos", "Planes de ejercicio", "Calorías quemadas", "Desafíos semanales"],
      color: "#2ecc71"
    },
    {
      id: 4,
      title: "Vacunación",
      icon: "💉",
      description: "Calendario de vacunación",
      features: ["Registro de vacunas", "Próximas dosis", "Certificados digitales", "Recordatorios"],
      color: "#f39c12"
    },
    {
      id: 5,
      title: "Control de Presión Arterial",
      icon: "💓",
      description: "Monitorea tu presión arterial",
      features: ["Registro diario", "Gráficas de tendencias", "Alertas de riesgo", "Exportar a médico"],
      color: "#9b59b6"
    },
    {
      id: 6,
      title: "Contacto de Emergencia",
      icon: "🚨",
      description: "Números y contactos importantes",
      features: ["Ambulancia 112", "Médico de guardia", "Contactos de familia", "Datos de alergias"],
      color: "#e74c3c"
    },
    {
      id: 7,
      title: "Recetas y Medicinas",
      icon: "📜",
      description: "Gestiona tus recetas médicas",
      features: ["Historial de recetas", "Renovación automática", "Farmacia asociada", "Código QR"],
      color: "#1abc9c"
    },
    {
      id: 8,
      title: "Diario de Bienestar",
      icon: "📔",
      description: "Refleja sobre tu salud emocional",
      features: ["Notas diarias", "Seguimiento emocional", "Meditación guiada", "Análisis de patrones"],
      color: "#34495e"
    },
    {
      id: 9,
      title: "Profesionales de Salud",
      icon: "👨‍⚕️",
      description: "Directorio de médicos y especialistas",
      features: ["Búsqueda por especialidad", "Ratings y opiniones", "Ubicación", "Disponibilidad"],
      color: "#16a085"
    },
    {
      id: 10,
      title: "Seguros Médicos",
      icon: "🛡️",
      description: "Información sobre tu cobertura",
      features: ["Póliza actual", "Coberturas", "Reclamaciones", "Documentos"],
      color: "#d35400"
    },
    {
      id: 11,
      title: "Configuración de Privacidad",
      icon: "🔐",
      description: "Controla tus datos personales",
      features: ["2FA", "Permisos de acceso", "Datos compartidos", "Eliminar cuenta"],
      color: "#2c3e50"
    },
    {
      id: 12,
      title: "Ayuda y Soporte",
      icon: "❓",
      description: "Obtén asistencia técnica",
      features: ["FAQ", "Chat de soporte", "Tutoriales", "Reportar problema"],
      color: "#3498db"
    }
  ];

  return (
    <div className="more-options-container">
      <div className="more-header">
        <h1>⚙️ Más Opciones de ISMAEL</h1>
        <p className="more-subtitle">Centro de control completo para la salud y bienestar de ISMAEL</p>
      </div>

      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-icon">�</span>
          <div>
            <p className="stat-label">Usuario</p>
            <p className="stat-value">ISMAEL</p>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">📊</span>
          <div>
            <p className="stat-label">Índice Salud</p>
            <p className="stat-value">84%</p>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">✅</span>
          <div>
            <p className="stat-label">Tareas Completadas Hoy</p>
            <p className="stat-value">7/12</p>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">📅</span>
          <div>
            <p className="stat-label">Próxima Cita</p>
            <p className="stat-value">12/05/26</p>
          </div>
        </div>
      </div>

      <div className="options-grid">
        {options.map((option) => (
          <div 
            key={option.id} 
            className="option-card"
            style={{borderTopColor: option.color}}
            onClick={() => setExpandedOption(expandedOption === option.id ? null : option.id)}
          >
            <div className="option-card-header">
              <span className="option-icon" style={{backgroundColor: `${option.color}20`}}>
                {option.icon}
              </span>
              <div className="option-title-section">
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
              <span className="expand-icon">{expandedOption === option.id ? '▲' : '▼'}</span>
            </div>

            {expandedOption === option.id && (
              <div className="option-features">
                <ul>
                  {option.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="feature-bullet">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="feature-btn" onClick={() => alert(`Abriendo ${option.title}...`)}>Ir a {option.title}</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="help-section">
        <h2>❓ ¿Necesitas Ayuda?</h2>
        <div className="help-cards">
          <div className="help-card">
            <h4>📞 Chat de Soporte</h4>
            <p>Habla con nuestro equipo disponible 24/7</p>
            <button className="help-btn" onClick={() => alert('💬 Iniciando chat de soporte...')}>Iniciar Chat</button>
          </div>
          <div className="help-card">
            <h4>📚 Centro de Ayuda</h4>
            <p>Accede a tutoriales y guías</p>
            <button className="help-btn" onClick={() => alert('📚 Centro de ayuda abierto')}>Ver Guías</button>
          </div>
          <div className="help-card">
            <h4>🐛 Reportar Problema</h4>
            <p>Cuéntanos si algo no funciona</p>
            <button className="help-btn" onClick={() => alert('🐛 Formulario de reporte enviado')}>Reportar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreOptions;
