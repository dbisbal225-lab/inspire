import React, { useState, useCallback } from "react";
import { translations } from "../i18n/translations";
import { useLanguage } from "../contexts/LanguageContext";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { language } = useLanguage();

  const t = useCallback((key) => translations[language][key] || key, [language]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-container" id="contacte">
      <div className="contact-wrapper">
        {/* Sección de Información */}
        <section className="contact-info">
          <h2 style={{ color: '#0f4c75', marginBottom: '30px', fontSize: '32px' }}>📍 {t('ubicacionContacto')}</h2>
          
          <div className="info-card">
            <div className="info-item">
              <h3>🏥 InSpire - {t('servicioPneumologia')}</h3>
              <p><strong>{t('hospitalDelMar')}</strong></p>
              <p>{t('direccion')}</p>
            </div>

            <div className="info-item">
              <h3>📞 {t('telefono')}</h3>
              <p><a href="tel:+34932483030" style={{ color: '#0f4c75', textDecoration: 'none' }}>+34 932 48 30 30</a></p>
              <p style={{ fontSize: '14px', color: '#666' }}>{t('disponible')}</p>
            </div>

            <div className="info-item">
              <h3>📧 {t('email')}</h3>
              <p><a href="mailto:inspire@hmarfp.cat" style={{ color: '#0f4c75', textDecoration: 'none' }}>inspire@hmarfp.cat</a></p>
              <p><a href="mailto:neumo@hospitaldelmar.cat" style={{ color: '#0f4c75', textDecoration: 'none' }}>neumo@hospitaldelmar.cat</a></p>
            </div>

            <div className="info-item">
              <h3>🌐 {t('web')}</h3>
              <p><a href="https://www.hospitaldelmar.cat" target="_blank" rel="noopener noreferrer" style={{ color: '#0f4c75', textDecoration: 'none' }}>hospitaldelmar.cat</a></p>
            </div>
          </div>

          {/* Mapa */}
          <div className="map-container">
            <iframe
              title="Mapa Hospital del Mar"
              src="https://www.google.com/maps?q=Hospital+del+Mar+Barcelona&output=embed"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "15px" }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>

          {/* Informació del transport */}
          <div className="transport-info">
            <h3>🚌 {t('comoLlegar')}</h3>
            <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
              <li><strong>{t('metro')}</strong> L4 Barceloneta</li>
              <li><strong>{t('autobus')}</strong> 14, 39, 40, H16, V13, D20</li>
              <li><strong>{t('aparcamiento')}</strong> {t('disponible')}</li>
              <li><strong>{t('coche')}</strong> GPS: 41.3851° N, 2.1918° E</li>
            </ul>
          </div>
        </section>

        {/* Sección de Formulario */}
        <section className="contact-form-section">
          <h3 style={{ color: '#0f4c75', marginBottom: '20px' }}>{t('enviaMensaje')}</h3>
          
          {submitted && (
            <div style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #c3e6cb'
            }}>
              ✓ {t('mensajeEnviado')}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>{t('nombre')} *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t('nombreCompleto')}
                style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>{t('email')} *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
                style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>{t('telefonoForm')}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+34 600 000 000"
                style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>{t('mensaje')} *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder={t('mensaje')}
                rows="5"
                style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '12px 30px',
                backgroundColor: '#0f4c75',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1a6fa0'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#0f4c75'}
            >
              {t('enviar')}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Contact;
