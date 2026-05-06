import React, { useState } from "react";
import "./styles/News.css";

function News() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [savedNews, setSavedNews] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const newsItems = [
    {
      id: 1,
      title: "Nuevos Beneficios del Ejercicio Regular en Personas Mayores",
      category: "Ejercicio",
      date: "02/05/2026",
      source: "Servicio de Neumología - Hospital del Mar",
      image: "🏋️",
      excerpt: "Estudios recientes demuestran que ejercicio moderado diario reduce riesgo de caídas en 30%...",
      content: "Los expertos recomiendan 30 minutos de actividad física moderada diaria. Esto incluye caminar, nadar o ejercicios de fortalecimiento."
    },
    {
      id: 2,
      title: "Importancia de la Salud Mental en el Trabajo",
      category: "Bienestar Mental",
      date: "01/05/2026",
      source: "OMS",
      image: "🧠",
      excerpt: "El estrés laboral afecta a millones. Conoce las estrategias para mejorar tu salud mental...",
      content: "La meditación, descansos regulares y una buena comunicación con colegas son clave para mantener la salud mental en el trabajo."
    },
    {
      id: 3,
      title: "Alimentación Sostenible y Saludable para el Futuro",
      category: "Nutrición",
      date: "30/04/2026",
      source: "Unidad de Nutrición - Hospital del Mar",
      image: "🌱",
      excerpt: "Comer alimentos locales y de temporada no solo es saludable sino también ecológico...",
      content: "La dieta mediterránea se posiciona como una de las más saludables y sostenibles del mundo."
    },
    {
      id: 4,
      title: "Nuevas Terapias para Dolor Crónico",
      category: "Medicina",
      date: "28/04/2026",
      source: "Servicio de Neumología - Hospital del Mar",
      image: "⚕️",
      excerpt: "Descubre los últimos avances en tratamientos para dolor crónico sin efectos secundarios...",
      content: "La terapia física combinada con medicinas naturales muestra resultados prometedores en pacientes con dolor crónico."
    },
    {
      id: 5,
      title: "Dormir Bien: La Medicina Natural Más Poderosa",
      category: "Sueño",
      date: "25/04/2026",
      source: "Unidad del Sueño - Hospital del Mar",
      image: "😴",
      excerpt: "7-9 horas de sueño pueden prevenir enfermedades y mejorar tu calidad de vida...",
      content: "Una buena higiene del sueño es fundamental para la salud. Apaga dispositivos 1 hora antes de dormir."
    },
    {
      id: 6,
      title: "Prevención del COVID-19: Guía Actualizada",
      category: "Prevención",
      date: "23/04/2026",
      source: "Servicio de Salud Pública - Hospital del Mar",
      image: "🛡️",
      excerpt: "Las vacunas siguen siendo la mejor defensa. Conoce las últimas recomendaciones...",
      content: "Mantener la ventilación, higiene de manos y usar mascarilla en lugares concurridos sigue siendo importante."
    }
  ];

  const categories = ["Todas", "Ejercicio", "Nutrición", "Medicina", "Bienestar Mental", "Prevención", "Sueño"];
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredNews = (selectedCategory === "Todas" 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory))
    .filter(item => 
      searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const toggleSave = (newsId) => {
    setSavedNews(prev => ({
      ...prev,
      [newsId]: !prev[newsId]
    }));
  };

  return (
    <div className="news-container">
      <div className="news-header">
        <div className="search-news">
          <input 
            type="text"
            placeholder="🔍 Buscar noticias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="news-search-input"
          />
        </div>

        <h1>📰 Noticias de Salud</h1>
        <p className="news-subtitle">Mantente informado sobre los últimos avances en salud y bienestar</p>
      </div>

      <div className="categories-filter">
        <h3>Filtrar por Categoría:</h3>
        <div className="categories-buttons">
          {categories.map((cat) => (
            <button 
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="news-list">
        {filteredNews.map((news) => (
          <div key={news.id} className="news-card">
            <div className="news-card-header">
              <div className="news-image">{news.image}</div>
              <div className="news-header-info">
                <span className="news-category">{news.category}</span>
                <span className="news-date">📅 {news.date}</span>
              </div>
              <button 
                className={`save-btn ${savedNews[news.id] ? 'saved' : ''}`}
                onClick={() => toggleSave(news.id)}
                title="Guardar noticia"
              >
                {savedNews[news.id] ? '❤️' : '🤍'}
              </button>
            </div>

            <div className="news-content">
              <h3>{news.title}</h3>
              <p className="news-excerpt">{news.excerpt}</p>
              
              {selectedNews === news.id && (
                <div className="news-full-content">
                  <p>{news.content}</p>
                  <p className="news-source">Fuente: {news.source}</p>
                </div>
              )}

              <button 
                className="read-more-btn"
                onClick={() => setSelectedNews(selectedNews === news.id ? null : news.id)}
              >
                {selectedNews === news.id ? 'Leer menos ▲' : 'Leer más ▼'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="news-actions">
        <button className="btn-primary" onClick={() => alert('⭐ Mostrando noticias guardadas')}>⭐ Ver Noticias Guardadas</button>
        <button className="btn-secondary" onClick={() => alert('📬 Suscripción a noticias confirmada')}>📬 Suscribirse a Noticias</button>
        <button className="btn-secondary" onClick={() => alert('🔔 Recordatorios de salud activados')}>🔔 Activar Recordatorios</button>
        <button className="btn-secondary" onClick={() => alert('📧 Compartiendo noticias...')}>📧 Compartir</button>
      </div>
    </div>
  );
}

export default News;
