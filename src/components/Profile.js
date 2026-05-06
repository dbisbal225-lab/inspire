import React, { useState } from "react";
import "./styles/Profile.css";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Datos de ISMAEL
  const ismaelData = {
    name: "ISMAEL",
    age: 28,
    gender: "Masculino",
    location: "Barcelona, España",
    email: "ismael@inspire-health.com",
    phone: "+34 600 123 456",
    bloodType: "O+",
    height: "180 cm",
    weight: "78 kg",
    bmi: 24.1,
    allergies: "Ninguna conocida",
    chronicConditions: ["Hipertensión arterial leve", "Asma leve intermitente"],
    primaryDoctor: "Dr. Juan Rodríguez Martínez",
    specialty: "Neumología",
    hospital: "Hospital del Mar",
    bloodPressure: "130/85 mmHg",
    heartRate: "72 bpm",
    lastCheckup: "28/04/2026",
    nextCheckup: "12/05/2026",
    exercise: "3-4 veces por semana (Correr, ciclismo, natación)",
    sleep: "7-8 horas/noche",
    diet: "Dieta Mediterránea modificada",
    smoking: "No",
    alcohol: "Ocasional",
    // Estado de ingreso hospitalario
    isHospitalized: true,
    hospitalizationFloor: "Neumología",
    hospitalizationDate: "02/05/2026"
  };

  const profile = ismaelData;

  return (
    <div className="profile-container">
      {/* ICONO DE ESTADO DE INGRESO - Arriba a la derecha */}
      <div className="hospitalization-badge">
        {profile.isHospitalized ? (
          <div className="badge-content badge-hospitalized">
            <span className="badge-icon">🏥</span>
            <div className="badge-info">
              <p className="badge-status">Ingresado</p>
              <p className="badge-floor">Planta: {profile.hospitalizationFloor}</p>
              <p className="badge-date">Desde: {profile.hospitalizationDate}</p>
            </div>
          </div>
        ) : (
          <div className="badge-content badge-not-hospitalized">
            <span className="badge-icon">✅</span>
            <div className="badge-info">
              <p className="badge-status">No ingresado</p>
              <p className="badge-message">Paciente ambulatorio</p>
            </div>
          </div>
        )}
      </div>

      <div className="profile-header">
        <div className="avatar">
          <span className="avatar-initial">I</span>
        </div>
        <div className="header-info">
          <h1>{profile.name}</h1>
          <p className="age-location">{profile.age} años • {profile.location}</p>
        </div>
        <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? '❌' : '✏️'} {isEditing ? 'Cancelar' : 'Editar'}
        </button>
      </div>

      {/* DATOS PERSONALES */}
      <div className="profile-section">
        <h2>👤 Datos Personales de ISMAEL</h2>
        <div className="profile-grid">
          <div className="profile-item">
            <label>Nombre Completo</label>
            <p>{profile.name}</p>
          </div>
          <div className="profile-item">
            <label>Edad</label>
            <p>{profile.age} años</p>
          </div>
          <div className="profile-item">
            <label>Género</label>
            <p>{profile.gender}</p>
          </div>
          <div className="profile-item">
            <label>Ubicación</label>
            <p>{profile.location}</p>
          </div>
          <div className="profile-item">
            <label>Email</label>
            <p>{profile.email}</p>
          </div>
          <div className="profile-item">
            <label>Teléfono</label>
            <p>{profile.phone}</p>
          </div>
        </div>
      </div>

      {/* DATOS MÉDICOS */}
      <div className="profile-section">
        <h2>🏥 Información Médica de ISMAEL</h2>
        <div className="medical-grid">
          <div className="medical-card">
            <h3>Biometría</h3>
            <div className="medical-item">
              <span>Tipo de Sangre:</span>
              <strong>{profile.bloodType}</strong>
            </div>
            <div className="medical-item">
              <span>Altura:</span>
              <strong>{profile.height}</strong>
            </div>
            <div className="medical-item">
              <span>Peso:</span>
              <strong>{profile.weight}</strong>
            </div>
            <div className="medical-item">
              <span>IMC:</span>
              <strong>{profile.bmi} (Normal)</strong>
            </div>
          </div>

          <div className="medical-card">
            <h3>Parámetros Actuales</h3>
            <div className="medical-item">
              <span>Presión Arterial:</span>
              <strong>{profile.bloodPressure}</strong>
            </div>
            <div className="medical-item">
              <span>Frecuencia Cardíaca:</span>
              <strong>{profile.heartRate}</strong>
            </div>
            <div className="medical-item">
              <span>Última Revisión:</span>
              <strong>{profile.lastCheckup}</strong>
            </div>
            <div className="medical-item">
              <span>Próxima Cita:</span>
              <strong>{profile.nextCheckup}</strong>
            </div>
          </div>

          <div className="medical-card">
            <h3>Condiciones de Salud</h3>
            <div className="medical-item">
              <span>Alergias:</span>
              <strong>{profile.allergies}</strong>
            </div>
            <div className="medical-item">
              <span>Condiciones Crónicas:</span>
              <div className="conditions-list">
                {profile.chronicConditions.map((cond, idx) => (
                  <span key={idx} className="condition-tag">{cond}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MÉDICO PRINCIPAL */}
      <div className="profile-section">
        <h2>⚕️ Médico Principal de ISMAEL</h2>
        <div className="doctor-card">
          <div className="doctor-info">
            <h3>{profile.primaryDoctor}</h3>
            <p className="specialty">Especialidad: {profile.specialty}</p>
            <p className="hospital">Hospital: {profile.hospital}</p>
          </div>
          <div className="doctor-contact">
            <div className="contact-item">
              <span>📞 Teléfono:</span>
              <p>+34 932 275 400</p>
            </div>
            <div className="contact-item">
              <span>📧 Email:</span>
              <p>j.rodriguez@hospitalmar.cat</p>
            </div>
          </div>
        </div>
      </div>

      {/* ESTILO DE VIDA */}
      <div className="profile-section">
        <h2>🏃 Estilo de Vida de ISMAEL</h2>
        <div className="lifestyle-grid">
          <div className="lifestyle-item">
            <span className="lifestyle-icon">🏃</span>
            <div>
              <h4>Ejercicio</h4>
              <p>{profile.exercise}</p>
            </div>
          </div>
          <div className="lifestyle-item">
            <span className="lifestyle-icon">😴</span>
            <div>
              <h4>Sueño</h4>
              <p>{profile.sleep}</p>
            </div>
          </div>
          <div className="lifestyle-item">
            <span className="lifestyle-icon">🍽️</span>
            <div>
              <h4>Dieta</h4>
              <p>{profile.diet}</p>
            </div>
          </div>
          <div className="lifestyle-item">
            <span className="lifestyle-icon">🚭</span>
            <div>
              <h4>Tabaco</h4>
              <p>{profile.smoking}</p>
            </div>
          </div>
          <div className="lifestyle-item">
            <span className="lifestyle-icon">🍷</span>
            <div>
              <h4>Alcohol</h4>
              <p>{profile.alcohol}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTONES DE ACCIÓN */}
      <div className="profile-actions">
        <button className="btn-primary">📥 Descargar Resumen Médico</button>
        <button className="btn-secondary">📞 Contactar Médico</button>
        <button className="btn-secondary">📋 Ver Historial Completo</button>
      </div>
    </div>
  );
}

export default Profile;