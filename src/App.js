import { useState, useCallback, Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { translations } from './i18n/translations';
import { 
  validateInput, 
  getAvatarColor, 
  determineUserRole,
  getInputPlaceholder,
  getInputMaxLength 
} from './utils/validation';

// Context
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AccessibilityProvider, useAccessibility } from './contexts/AccessibilityContext';
import MedicalHistory from './components/MedicalHistory';
import Medication from './components/Medication';
import Consultation from './components/Consultation';
import Nutrition from './components/Nutrition';
import Cleaning from './components/Cleaning';
import News from './components/News';
import MoreOptions from './components/MoreOptions';
import Clothing from './components/Clothing';

// Lazy load componentes de rutas
const Home = lazy(() => import('./components/Home'));
const Profile = lazy(() => import('./components/Profile'));
const Contact = lazy(() => import('./components/Contact'));
const LoginAuth = lazy(() => import('./components/Login'));
const RegisterAuth = lazy(() => import('./components/Register'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    background: 'linear-gradient(135deg, #0f4c75 0%, #1a6fa0 100%)'
  }}>
    <p style={{ color: '#fff', fontSize: '18px' }}>Cargando...</p>
  </div>
);

function AppContent() {
  const { language, changeLanguage } = useLanguage();
  const { blindMode } = useAccessibility();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Función para traducción - con useCallback para memoización
  const t = useCallback((key) => translations[language][key] || key, [language]);

  // Handlers memoizados con useCallback
  const handleLoginMethod = useCallback((method) => {
    setLoginMethod(method);
    setInputValue('');
    setError('');
  }, []);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.length > 0) {
      const validation = validateInput(loginMethod, value, t);
      setError(validation.message);
    } else {
      setError('');
    }
  }, [loginMethod, t]);

  const handleContinue = useCallback(() => {
    if (loginMethod && inputValue.trim() && userName.trim()) {
      const validation = validateInput(loginMethod, inputValue, t);
      if (validation.valid) {
        const profile = {
          name: userName,
          documentType: loginMethod,
          documentNumber: inputValue.toUpperCase(),
          registrationDate: new Date().toLocaleDateString('es-ES'),
          userRole: determineUserRole(loginMethod, t),
          avatar: getAvatarColor(userName),
          initials: userName.split(' ').map(n => n[0]).join('').toUpperCase()
        };
        localStorage.setItem('userProfile', JSON.stringify(profile));
        setIsLoggedIn(true);
      }
    }
  }, [loginMethod, inputValue, userName, t]);

  const handleLanguageChange = useCallback((lng) => {
    changeLanguage(lng);
    setShowLanguageModal(false);
  }, [changeLanguage]);

  const handleToggleLanguageModal = useCallback(() => {
    setShowLanguageModal(!showLanguageModal);
  }, [showLanguageModal]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setLoginMethod(null);
    setInputValue('');
    setUserName('');
    setError('');
    localStorage.removeItem('userProfile');
  }, []);

  // Validar si entrada es válida
  const isInputValid = useCallback(() => {
    if (!loginMethod || !inputValue.trim() || !userName.trim()) return false;
    const validation = validateInput(loginMethod, inputValue, t);
    return validation.valid;
  }, [loginMethod, inputValue, userName, t]);

  // Helper para mostrar mensaje de éxito en diferentes idiomas
  const getSuccessMessage = useCallback(() => {
    const messages = {
      es: 'Listo para continuar',
      en: 'Ready to continue',
      ar: 'جاهز للمتابعة',
      ur: 'شروع کرنے کے لیے تیار'
    };
    return messages[language] || 'Ready';
  }, [language]);

  return (
    <BrowserRouter>
      <div className={`App ${blindMode ? 'blind-mode' : ''}`}>
        {!isLoggedIn ? (
          <div className="login-container">
            {/* Header con menú */}
            <header className="header">
              <div className="logo-container">
                <img 
                  src="/logo.png" 
                  alt="InSpire Logo" 
                  className="header-logo"
                  loading="lazy"
                />
              </div>
              <nav className="navbar">
                <a href="#inicio">{t('inicio')}</a>
                <a href="#docencia">{t('docencia')}</a>
                <button 
                  onClick={() => {
                    const contactElement = document.getElementById("contacto");
                    if (contactElement) {
                      contactElement.scrollIntoView({ behavior: "smooth"});
                    }
                  }}
                  style={{background: "none", border: "none", cursor: "pointer", color: "rgba(255, 255, 255, 0.9)"}}
                  aria-label={t('contacto')}
                >
                  {t('contacto')}
                </button>
                <button 
                  className="language-button"
                  onClick={() => { 
                    handleToggleLanguageModal(); 
                  }} 
                  aria-label="Cambiar idioma"
                  title="Cambiar idioma"
                >
                  🌐 {language.toUpperCase()}
                </button>
                <button
                  className="auth-header-button"
                  onClick={() => setShowRegisterModal(true)}
                  title={t('crearCuenta')}
                >
                  🔐 {t('crearCuenta')}
                </button>
              </nav>
            </header>

            {/* Modal de idiomas */}
            {showLanguageModal && (
              <div 
                className="language-modal-overlay" 
                onClick={() => setShowLanguageModal(false)}
                role="dialog"
                aria-label={t('seleccionarIdioma')}
              >
                <div 
                  className="language-modal" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header">
                    <h3>🌐 {t('seleccionarIdioma')}</h3>
                    <button 
                      className="modal-close"
                      onClick={() => setShowLanguageModal(false)}
                      aria-label={t('cerrar')}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="language-options">
                    {[
                      { code: 'es', name: 'Castellano', flag: '🇪🇸' },
                      { code: 'ca', name: 'Català', flag: '🏴' },
                      { code: 'en', name: 'English', flag: '🇬🇧' },
                      { code: 'ar', name: 'العربية', flag: '🇸🇦' },
                      { code: 'ur', name: 'اردو', flag: '🇵🇰' }
                    ].map((lang) => (
                      <button 
                        key={lang.code}
                        className={`lang-button ${language === lang.code ? 'active' : ''}`}
                        onClick={() => handleLanguageChange(lang.code)}
                        aria-pressed={language === lang.code}
                      >
                        <span className="lang-flag">{lang.flag}</span>
                        <span className="lang-name">{lang.name}</span>
                        {language === lang.code && <span className="lang-check">✓</span>}
                      </button>
                    ))}
                  </div>
                  <div className="modal-footer">
                    <p>{t('idiomaActual')} <strong>{language.toUpperCase()}</strong></p>
                  </div>
                </div>
              </div>
            )}

            {/* Contenido principal */}
            <main className="login-content">
              <h2 className="welcome-text">{t('bienvenida')}</h2>
              <h1 className="main-title">{t('titulo')}</h1>
              
              {/* Blokeo informativo de neumología */}
              <section className="hospital-info-section">
                <div className="hospital-brad">
                  <span className="hospital-badge">🫁</span>
                  <div>
                    <h3>{t('servicioPneumologia')} - {t('hospitalDelMar')}</h3>
                    <p>{t('servicioPneumologiaDesc')}</p>
                  </div>
                </div>
                <div className="hospital-metrics">
                  <div>
                    <strong>1200+</strong>
                    <span>{t('pacientesAtendidos')}</span>
                  </div>
                  <div>
                    <strong>24/7</strong>
                    <span>{t('soporteUrgencia')}</span>
                  </div>
                  <div>
                    <strong>96%</strong>
                    <span>{t('satisfaccionSeguimiento')}</span>
                  </div>
                </div>
              </section>

              {/* Opciones de login */}
              <div className="login-methods">
                {['DNI', 'NIE', 'PASSPORT'].map((method, idx) => (
                  <div key={method}>
                    {idx > 0 && <span className="separator">|</span>}
                    <button 
                      className={`method-button ${loginMethod === method ? 'active' : ''}`}
                      onClick={() => handleLoginMethod(method)}
                      aria-pressed={loginMethod === method}
                    >
                      {method}
                    </button>
                  </div>
                ))}
              </div>

              {/* Campo de entrada dinámico */}
              {loginMethod && (
                <div className="input-container">
                  <input
                    type="text"
                    className="document-input"
                    placeholder={t('nombreCompleto')}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    autoFocus
                    aria-label="Nombre completo"
                  />
                  <input
                    type="text"
                    className={`document-input ${error ? 'input-error' : ''} ${isInputValid() ? 'input-valid' : ''}`}
                    placeholder={getInputPlaceholder(loginMethod, t)}
                    maxLength={getInputMaxLength(loginMethod)}
                    value={inputValue}
                    onChange={handleInputChange}
                    aria-label={`Número de ${loginMethod}`}
                  />
                  {error && <p className="error-message" role="alert">{error}</p>}
                  {isInputValid() && <p className="success-message">✓ {getSuccessMessage()}</p>}
                </div>
              )}

              {/* Logo central */}
              <div className="central-logo">
                <img 
                  src="/logo.png" 
                  alt="InSpire Badge" 
                  className="inspire-badge"
                  loading="lazy"
                />
              </div>
            </main>

            {/* Footer */}
            <footer className="login-footer">
              <div className="footer-left">
                <p>{t('hospitalInfo')}</p>
                <p>{t('ciudad')}</p>
              </div>
              <button 
                className="continue-button" 
                onClick={handleContinue} 
                disabled={!isInputValid()}
                aria-label={t('comezar')}
              >
                {t('comezar')}
              </button>
            </footer>

            {/* SECCIÓN DE CONTACTO */}
            <Suspense fallback={<LoadingFallback />}>
              <Contact />
            </Suspense>

            {/* MODAL DE REGISTRO */}
            {showRegisterModal && (
              <div 
                className="auth-modal-overlay"
                onClick={() => setShowRegisterModal(false)}
              >
                <div 
                  className="auth-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="auth-modal-close"
                    onClick={() => setShowRegisterModal(false)}
                  >
                    ✕
                  </button>
                  <Suspense fallback={<LoadingFallback />}>
                    <RegisterAuth />
                  </Suspense>
                </div>
              </div>
            )}

            {/* MODAL DE LOGIN */}
            {showLoginModal && (
              <div 
                className="auth-modal-overlay"
                onClick={() => setShowLoginModal(false)}
              >
                <div 
                  className="auth-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="auth-modal-close"
                    onClick={() => setShowLoginModal(false)}
                  >
                    ✕
                  </button>
                  <Suspense fallback={<LoadingFallback />}>
                    <LoginAuth />
                  </Suspense>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* HEADER DEL DASHBOARD */}
            <header className="dashboard-header">
              <div className="dashboard-logo">
                <img 
                  src="/logo.png" 
                  alt="InSpire Logo" 
                  loading="lazy"
                />
                <h1>InSpire</h1>
              </div>
              <button 
                className="logout-button"
                onClick={handleLogout}
                aria-label={t('cerrarSesion')}
              >
                🚪 {t('cerrarSesion')}
              </button>
            </header>

            {/* CONTENIDO CON LAZY LOADING */}
            <Suspense fallback={<LoadingFallback />}>
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/perfil" element={<Profile />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/historial" element={<MedicalHistory />} />
                  <Route path="/medicacion" element={<Medication />} />
                  <Route path="/consulta" element={<Consultation />} />
                  <Route path="/nutricion" element={<Nutrition />} />
                  <Route path="/limpieza" element={<Cleaning />} />
                  <Route path="/noticias" element={<News />} />
                  <Route path="/opciones" element={<MoreOptions />} />
                  <Route path="/ropa" element={<Clothing />} />
                </Routes>
              </div>
            </Suspense>

            {/* MENÚ INFERIOR (TIPO APP) */}
            <nav className="bottom-nav">
              <Link to="/">🏠 {t('inicio')}</Link>
              <Link to="/perfil">👤 {t('verPerfil')}</Link>
              <Link to="/contacto">📍 {t('contacto')}</Link>
            </nav>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <AppContent />
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
