import React, { useState } from "react";
import "./styles/Clothing.css";

function Clothing() {
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  const outfitRecommendations = [
    {
      id: 1,
      condition: "Soleado y Caluroso (25-30°C)",
      icon: "☀️",
      clothing: ["Camiseta ligera", "Pantalones cortos", "Gafas de sol"],
      additional: "Protector solar SPF 50+, sombrero",
      hydration: "Aumentar ingesta de agua: 3L diarios"
    },
    {
      id: 2,
      condition: "Nublado y Templado (15-20°C)",
      icon: "⛅",
      clothing: ["Camiseta de manga larga", "Chaqueta ligera", "Pantalones largos"],
      additional: "Zapatos cómodos, bolsa de tela",
      hydration: "Consumir 2L de agua"
    },
    {
      id: 3,
      condition: "Frío (5-10°C)",
      icon: "❄️",
      clothing: ["Jersey grueso", "Abrigo", "Pantalones largos", "Calcetines térm."],
      additional: "Gorro, guantes, bufanda, botas impermeables",
      hydration: "Té caliente, 2L agua"
    },
    {
      id: 4,
      condition: "Lluvia",
      icon: "🌧️",
      clothing: ["Impermeable", "Pantalones ajustados", "Zapatos impermeables"],
      additional: "Paraguas, bolsa impermeable para dispositivos",
      hydration: "Evitar acumulación de humedad en ropa"
    },
    {
      id: 5,
      condition: "Para Hacer Ejercicio",
      icon: "🏃",
      clothing: ["Ropa deportiva transpirable", "Zapatillas deportivas", "Pantalones deportivos"],
      additional: "Brazalete para móvil, botella de agua",
      hydration: "500ml agua antes, 200ml cada 15 min durante"
    },
    {
      id: 6,
      condition: "Para Dormir",
      icon: "😴",
      clothing: ["Pijama cómodo", "Medias de algodón", "Ropa interior de tela natural"],
      additional: "Almohada ergonómica, sábanas frescas",
      hydration: "Agua tibia antes de dormir (no excesiva)"
    }
  ];

  return (
    <div className="clothing-container">
      <div className="clothing-header">
        <h1>👕 Vestuario de ISMAEL</h1>
        <p className="clothing-subtitle">Recomendaciones de ropa para ISMAEL - Adaptadas a clima y actividades</p>
      </div>

      <div className="weather-info">
        <div className="weather-card">
          <h3>🌡️ Clima Actual (Barcelona/España)</h3>
          <p className="weather-temp">24°C</p>
          <p className="weather-condition">Soleado con ligera brisa</p>
          <p className="recommendation-tip">✓ Para ISMAEL: Camiseta ligera + Shorts + Gafas de sol</p>
        </div>
      </div>

      <div className="outfits-grid">
        <h2>📋 Recomendaciones por Clima</h2>
        <div className="outfits-container">
          {outfitRecommendations.map((outfit) => (
            <div 
              key={outfit.id} 
              className={`outfit-card ${selectedOutfit === outfit.id ? 'active' : ''}`}
              onClick={() => setSelectedOutfit(selectedOutfit === outfit.id ? null : outfit.id)}
            >
              <div className="outfit-header">
                <span className="weather-icon">{outfit.icon}</span>
                <h3>{outfit.condition}</h3>
              </div>
              
              {selectedOutfit === outfit.id && (
                <div className="outfit-details">
                  <div className="detail-section">
                    <h4>👕 Prendas Recomendadas</h4>
                    <ul>
                      {outfit.clothing.map((item, idx) => (
                        <li key={idx}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="detail-section">
                    <h4>✨ Complementos</h4>
                    <p>{outfit.additional}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h4>💧 Hidratación</h4>
                    <p>{outfit.hydration}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="health-tips">
        <h2>💡 Consejos de Salud</h2>
        <div className="tips-list">
          <div className="tip-item">
            <span className="tip-icon">✓</span>
            <p><strong>Capas:</strong> Usar varias capas permite ajustar la temperatura corporal</p>
          </div>
          <div className="tip-item">
            <span className="tip-icon">✓</span>
            <p><strong>Materiales:</strong> Preferir algodón natural que transpira mejor que sintéticos</p>
          </div>
          <div className="tip-item">
            <span className="tip-icon">✓</span>
            <p><strong>Comodidad:</strong> La ropa ajustada afecta la circulación; elige tallas correctas</p>
          </div>
          <div className="tip-item">
            <span className="tip-icon">✓</span>
            <p><strong>Protección:</strong> Protector solar incluso en días nublados</p>
          </div>
        </div>
      </div>

      <div className="clothing-actions">
        <button className="btn-primary" onClick={() => alert('📅 Creando guardarropa semanal personalizado')}>📅 Crear Guardarropa Semanal</button>
        <button className="btn-secondary" onClick={() => alert('🌤️ Mostrando pronóstico de clima')}>🌤️ Ver Pronóstico de Clima</button>
        <button className="btn-secondary" onClick={() => alert('👕 Mostrando mis prendas favoritas')}>👕 Mis Prendas Favoritas</button>
        <button className="btn-secondary" onClick={() => alert('🎨 Generar outfit del día')}>🎨 Outfit del Día</button>
      </div>
    </div>
  );
}

export default Clothing;
