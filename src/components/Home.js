import React from "react";
import { useLanguage } from '../contexts/LanguageContext';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { translations } from '../i18n/translations';
import { useNavigate } from "react-router-dom";

function Home() {
  const { language } = useLanguage();
  const { blindMode, toggleBlindMode } = useAccessibility();
  const t = (key) => translations[language][key] || key;
  const navigate = useNavigate();

  const ismaelData = {
    name: "ISMAEL",
    age: 28,
    location: "Barcelona, España",
    healthScore: 84,
    tasksCompleted: 7,
    totalTasks: 12,
    bloodPressure: "125/80",
    weight: "78 kg",
    nextAppointment: "12/05/2026",
    nextDoctor: "Dr. Juan Rodríguez Martínez",
    // Estado de ingreso hospitalario
    isHospitalized: true,
    hospitalizationFloor: "Neumología",
    hospitalizationDate: "02/05/2026"
  };

  const quickStats = [
    { label: t('puntuacionSalud'), value: ismaelData.healthScore + "%", icon: "💚" },
    { label: t('tareasCompletadas'), value: ismaelData.tasksCompleted + "/" + ismaelData.totalTasks, icon: "✅" },
    { label: t('presionArterial'), value: ismaelData.bloodPressure, icon: "❤️" },
    { label: t('peso'), value: ismaelData.weight, icon: "⚖️" }
  ];

  const todaysMeds = [
    { name: "Losartán", time: "08:00", taken: true },
    { name: "Salbutamol", time: "10:00", taken: false },
    { name: "Atorvastatina", time: "20:00", taken: false },
  ];

  const dashboardItems = [
    { id: 1, title: "Historial Médico", icon: '📋', color: '#00a8cc', path: '/historial' },
    { id: 2, title: "Medicación", icon: '💊', color: '#0088aa', path: '/medicacion' },
    { id: 3, title: "Consulta Médica", icon: '👨‍⚕️', color: '#1a3a52', path: '/consulta' },
    { id: 4, title: "Ropa", icon: '👕', color: '#5a7a8f', path: '/ropa' },
    { id: 5, title: "Limpieza", icon: '🧼', color: '#00a8cc', path: '/limpieza' },
    { id: 6, title: "Nutrición", icon: '🥗', color: '#0088aa', path: '/nutricion' },
    { id: 7, title: "Noticias", icon: '📰', color: '#1a3a52', path: '/noticias' },
    { id: 8, title: "Más Opciones", icon: '⚙️', color: '#5a7a8f', path: '/opciones' }
  ];

  return (
    <div className="home-container">
      {/* ICONO FIJO DE ESTADO DE INGRESO - Arriba a la derecha */}
      <div className="hospitalization-badge-fixed">
        {ismaelData.isHospitalized ? (
          <div className="badge-content badge-hospitalized">
            <span className="badge-icon">🏥</span>
            <div className="badge-info">
              <p className="badge-status">Ingresado</p>
              <p className="badge-floor">Planta: {ismaelData.hospitalizationFloor}</p>
              <p className="badge-date">Desde: {ismaelData.hospitalizationDate}</p>
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

      {/* Welcome Header */}
      <div className="welcome-header">
        <div className="welcome-content">
          <h1>{t('bienvenidoNombre').replace('{name}', ismaelData.name)}</h1>
          <p>{t('gestionaSaludPersonalizada')}</p>
        </div>
        <button
          className={`blind-mode-toggle ${blindMode ? 'active' : ''}`}
          onClick={toggleBlindMode}
          aria-pressed={blindMode}
          title={blindMode ? t('modoCiegoActivo') : t('modoCiegoInactivo')}
        >
          {blindMode ? '🟡 ' + t('modoCiegoActivo') : '⚪ ' + t('modoCiego')}
        </button>
        <div className="welcome-avatar">
          <span>{ismaelData.name.charAt(0)}</span>
          <div className="avatar-info">
            <p className="avatar-age">{ismaelData.age} {t('anos')}</p>
            <p className="avatar-location">{t('ubicacion')} {ismaelData.location}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="quick-stats-grid">
        {quickStats.map((stat, idx) => (
          <div key={idx} className="quick-stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts and Next Appointment */}
      <div className="alerts-section">
        <div className="alert-card alert-appointment">
          <h3>📅 {t('proximaCita')}</h3>
          <p className="appointment-date">{ismaelData.nextAppointment}</p>
          <p className="appointment-doctor">{ismaelData.nextDoctor}</p>
          <button onClick={() => navigate('/historial')} className="alert-button">{t('verDetalles')}</button>
        </div>

        <div className="alert-card alert-medications">
          <h3>💊 {t('medicacionHoy')}</h3>
          <div className="meds-list">
            {todaysMeds.map((med, idx) => (
              <div key={idx} className="med-item">
                <span className={`med-status ${med.taken ? 'taken' : ''}`}>
                  {med.taken ? '✓' : '•'}
                </span>
                <div className="med-info">
                  <p className="med-name">{med.name}</p>
                  <p className="med-time">{med.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/medicacion')} className="alert-button">{t('gestionarMedicacion')}</button>
        </div>
      </div>

      {/* Dashboard Items Grid */}
      <div className="dashboard-section">
        <h2 style={{ color: '#1a3a52', marginBottom: '20px', fontSize: '1.5rem', fontWeight: '600' }}>{t('misServiciosSalud')}</h2>
        <div className="dashboard-grid">
          {dashboardItems.map((item) => (
            <div 
              key={item.id} 
              className="dashboard-card"
              style={{ borderLeftColor: item.color }}
              onClick={() => navigate(item.path)}
            >
              <div className="card-icon-wrapper" style={{ backgroundColor: item.color }}>
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p className="card-access">{t('accederCard')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Health Tips */}
      <div className="health-tips-section">
        <h2 style={{ color: '#1a3a52', marginBottom: '20px', fontSize: '1.5rem', fontWeight: '600' }}>{t('consejosSalud')}</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">💧</span>
            <h4>{t('mantenteHidratado')}</h4>
            <p>{t('bebeAgua')}</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🏃‍♂️</span>
            <h4>{t('ejercicioRegular')}</h4>
            <p>{t('realizaEjercicio')}</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">😴</span>
            <h4>{t('duermeSuficiente')}</h4>
            <p>{t('intentaDormir')}</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🥗</span>
            <h4>{t('dietaEquilibrada')}</h4>
            <p>{t('consumeVariedad')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
