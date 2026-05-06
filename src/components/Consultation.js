import React, { useState } from "react";
import "./styles/Consultation.css";

function Consultation() {
  const [messages, setMessages] = useState([
    { sender: "ia", text: "👨‍⚕️ Hola ISMAEL, bienvenido a tu consulta médica virtual. Veo que tienes hipertensión y asma leve. ¿Cómo te sientes hoy? Describe cualquier síntoma que tengas." }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getAIResponse = async (message) => {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    return data.reply;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);

    const userMsg = { sender: "user", text: input }; 
    setMessages(prev => [...prev, userMsg]);

    try {
      const aiText = await getAIResponse(input);
      const aiMsg = { sender: "ia", text: aiText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg = { sender: "ia", text: "Lo siento, hubo un error. Por favor intenta de nuevo." };
      setMessages(prev => [...prev, errorMsg]);
    }
    
    setInput("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickOptions = [
    { icon: "�", label: "Problemas Respiratorios", text: "Tengo dificultad para respirar" },
    { icon: "🤧", label: "Tos", text: "Tengo tos persistente" },
    { icon: "🤒", label: "Fiebre", text: "Tengo fiebre alta" },
    { icon: "😰", label: "Ansiedad", text: "Me siento ansioso" },
    { icon: "💪", label: "Debilidad", text: "Me siento débil" },
    { icon: "🩹", label: "Dolores", text: "Tengo dolores en el pecho" },
    { icon: "⚠️", label: "Emergencia", text: "Necesito ayuda urgente" },
    { icon: "💊", label: "Medicación", text: "Pregunta sobre mi medicación" }
  ];

  const categories = [
    { id: 'respiratory', name: '🫁 Respiratorias', color: '#3498db' },
    { id: 'symptoms', name: '🤒 Síntomas', color: '#e74c3c' },
    { id: 'medication', name: '💊 Medicación', color: '#9b59b6' },
    { id: 'lifestyle', name: '🏃 Estilo de Vida', color: '#2ecc71' },
    { id: 'emergency', name: '🚨 Emergencia', color: '#f39c12' }
  ];

  return (
    <div className="consultation-container">
      <div className="consultation-header">
        <h1>👨‍⚕️ Consulta Médica Virtual para ISMAEL</h1>
        <p className="consultation-subtitle">Asistencia médica de IA - Personalizada para ISMAEL - Disponible 24/7</p>
      </div>

      <div className="consultation-info">
        <div className="info-box">
          <span className="info-icon">ℹ️</span>
          <p>Esta consulta proporciona orientación general. No reemplaza atención médica profesional. En caso de emergencia, contacta a emergencias (112).</p>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.sender}`}>
              <div className={`chat-message ${msg.sender}`}>
                {msg.sender === "ia" && <span className="message-avatar">🤖</span>}
                <p className="message-text">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="message-wrapper ia">
              <div className="chat-message ia">
                <span className="message-avatar">🤖</span>
                <p className="message-text">Procesando tu consulta...</p>
              </div>
            </div>
          )}
        </div>

        <div className="category-panel">
          <h3>📋 Categorías de Consulta:</h3>
          <div className="category-buttons">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                style={{borderTopColor: cat.color}}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {selectedCategory && (
            <div className="quick-questions-detail">
              <h4>Preguntas Rápidas:</h4>
              <div className="quick-buttons">
                {quickOptions.map((option, idx) => (
                  <button 
                    key={idx}
                    className="quick-btn"
                    onClick={() => {
                      setInput(option.text);
                      handleSend();
                    }}
                  >
                    <span>{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="chat-input-section">
        <textarea
          className="chat-input"
          placeholder="Describe tus síntomas o haz una pregunta... (Presiona Enter para enviar)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          rows="3"
        />
        <button 
          className="send-btn"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>

      <div className="consultation-footer">
        <p>💡 <strong>Consejo:</strong> Sé específico en la descripción de tus síntomas para mejores resultados.</p>
      </div>
    </div>
  );
}

export default Consultation;