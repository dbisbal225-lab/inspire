import React, { useState } from "react";
import "./styles/Medication.css";

function Medication() {
  const [completedToday, setCompletedToday] = useState({
    1: true,  // Losartán tomado
    2: false, // Salbutamol no tomado
    3: false, // Atorvastatina no tomada
    4: true   // Omeprazol tomado
  });
  const [showReminders, setShowReminders] = useState(false);

  const medications = [
    {
      id: 1,
      name: "Losartán (para ISMAEL)",
      dosage: "50mg",
      frequency: "1 vez al día",
      timing: "Mañana",
      times: ["08:00"],
      reason: "Hipertensión arterial",
      sideEffects: "Posible mareo leve. Tomar con desayuno",
      remaining: "85 unidades",
      icon: "💊",
      color: "#3498db"
    },
    {
      id: 2,
      name: "Salbutamol (Inhalador ISMAEL)",
      dosage: "100mcg",
      frequency: "Según sea necesario",
      timing: "Variable",
      times: ["según necesidad"],
      reason: "Asma - rescate de crisis",
      sideEffects: "Taquicardia temporal. Máx 2 dosis/día",
      remaining: "156 dosis",
      icon: "🌬️",
      color: "#e74c3c"
    },
    {
      id: 3,
      name: "Atorvastatina (ISMAEL)",
      dosage: "20mg",
      frequency: "1 vez al día",
      timing: "Noche",
      times: ["21:00"],
      reason: "Colesterol elevado",
      sideEffects: "Ninguno reportado. Tomar con cena",
      remaining: "25 unidades",
      icon: "❤️",
      color: "#9b59b6"
    },
    {
      id: 4,
      name: "Omeprazol (ISMAEL)",
      dosage: "20mg",
      frequency: "1 vez al día",
      timing: "Mañana (en ayunas)",
      times: ["07:00"],
      reason: "Reflujo gástrico ocasional",
      sideEffects: "Ninguno. Tomar 30 min antes del desayuno",
      remaining: "22 unidades",
      icon: "🔄",
      color: "#f39c12"
    }
  ];

  const toggleComplete = (medId) => {
    setCompletedToday(prev => ({
      ...prev,
      [medId]: !prev[medId]
    }));
  };

  return (
    <div className="medication-container">
      <div className="med-header">
        <h1>💊 Medicación de ISMAEL</h1>
        <p className="med-subtitle">Gestión personalizada de medicamentos para ISMAEL - Mantén el control de tus dosis</p>
      </div>

      <div className="med-stats">
        <div className="stat-box">
          <h3>Hoy - ISMAEL</h3>
          <p className="stat-number">2/3</p>
          <p className="stat-label">Medicamentos tomados</p>
        </div>
        <div className="stat-box">
          <h3>Medicamentos</h3>
          <p className="stat-number">4</p>
          <p className="stat-label">Activos para ISMAEL</p>
        </div>
        <div className="stat-box">
          <h3>Próxima Dosis</h3>
          <p className="stat-number">21:00</p>
          <p className="stat-label">Atorvastatina (ISMAEL)</p>
        </div>
      </div>

      <div className="medications-list">
        <h2>📋 Medicamentos Activos</h2>
        
        {medications.map((med) => (
          <div key={med.id} className="medication-card" style={{borderLeftColor: med.color}}>
            <div className="med-card-header">
              <div className="med-icon" style={{backgroundColor: med.color}}>{med.icon}</div>
              <div className="med-info">
                <h3>{med.name}</h3>
                <p className="med-dosage">{med.dosage} - {med.frequency}</p>
              </div>
              {med.timing !== "Variable" && (
                <button 
                  className={`check-btn ${completedToday[med.id] ? 'checked' : ''}`}
                  onClick={() => toggleComplete(med.id)}
                >
                  {completedToday[med.id] ? '✓' : '○'}
                </button>
              )}
            </div>

            <div className="med-details">
              <div className="detail-group">
                <span className="label">⏰ Horario:</span>
                <span className="value">{med.times.join(', ')}</span>
              </div>
              <div className="detail-group">
                <span className="label">🎯 Motivo:</span>
                <span className="value">{med.reason}</span>
              </div>
              <div className="detail-group">
                <span className="label">⚠️ Efectos:</span>
                <span className="value">{med.sideEffects}</span>
              </div>
              <div className="detail-group">
                <span className="label">📦 Restante:</span>
                <span className="value stock">{med.remaining}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="med-actions">
        <button className="btn-primary" onClick={() => setShowReminders(!showReminders)}>
          {showReminders ? '✓ Recordatorios Configurados' : '🔔 Configurar Recordatorios'}
        </button>
        <button className="btn-secondary" onClick={() => alert('📅 Abriendo calendario de medicinas...')}>📅 Ver Calendario</button>
        <button className="btn-secondary" onClick={() => alert('➕ Agregar nueva medicación...')}>➕ Agregar Medicamento</button>
        <button className="btn-secondary" onClick={() => alert('📞 Contactando farmacia...')}>📞 Contactar Farmacia</button>
      </div>

      {showReminders && (
        <div className="reminders-section">
          <h3>🔔 Recordatorios Configurados</h3>
          <div className="reminders-grid">
            <div className="reminder-item">
              <span className="reminder-icon">⏰</span>
              <div>
                <p className="reminder-time">08:00</p>
                <p className="reminder-med">Losartán - Mañana</p>
              </div>
            </div>
            <div className="reminder-item">
              <span className="reminder-icon">⏰</span>
              <div>
                <p className="reminder-time">21:00</p>
                <p className="reminder-med">Atorvastatina - Noche</p>
              </div>
            </div>
            <div className="reminder-item">
              <span className="reminder-icon">⏰</span>
              <div>
                <p className="reminder-time">07:00</p>
                <p className="reminder-med">Omeprazol - En ayunas</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Medication;