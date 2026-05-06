import React, { useState } from "react";
import "./styles/Cleaning.css";

function Cleaning() {
  const [checkedTasks, setCheckedTasks] = useState({
    1: true,
    2: false,
    3: true,
    4: false
  });

  const cleaningTasks = [
    {
      id: 1,
      task: "Limpiar superficies de la cocina",
      frequency: "Diariamente",
      importance: "Alta",
      tips: "Usar desinfectante después de preparar comidas",
      icon: "🍽️",
      time: "15 min"
    },
    {
      id: 2,
      task: "Limpiar baño (sanitarios y espejo)",
      frequency: "2-3 veces/semana",
      importance: "Alta",
      tips: "Usar guantes y garantizar buena ventilación",
      icon: "🚿",
      time: "20 min"
    },
    {
      id: 3,
      task: "Cambiar sábanas de cama",
      frequency: "1-2 veces/semana",
      importance: "Media",
      tips: "Lavar a 60°C para mayor higiene",
      icon: "🛏️",
      time: "10 min"
    },
    {
      id: 4,
      task: "Limpiar pisos y barrer",
      frequency: "3-4 veces/semana",
      importance: "Alta",
      tips: "Barrer primero, luego pasar aspiradora",
      icon: "🧹",
      time: "30 min"
    },
    {
      id: 5,
      task: "Desinfectar manijas de puertas",
      frequency: "Diariamente",
      importance: "Alta",
      tips: "Usar toallitas desinfectantes reutilizables",
      icon: "🚪",
      time: "5 min"
    },
    {
      id: 6,
      task: "Limpiar ventiladores y aires acondicionados",
      frequency: "1 vez/mes",
      importance: "Media",
      tips: "Apagar aparato antes de limpiar",
      icon: "❄️",
      time: "20 min"
    }
  ];

  const toggleTask = (taskId) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const completedCount = Object.values(checkedTasks).filter(Boolean).length;

  return (
    <div className="cleaning-container">
      <div className="cleaning-header">
        <h1>🧹 Limpieza e Higiene de ISMAEL</h1>
        <p className="cleaning-subtitle">Plan de higiene personalizado para ISMAEL - Mantén tu entorno limpio y saludable</p>
      </div>

      <div className="progress-section">
        <div className="progress-stats">
          <div className="progress-card">
            <h3>Progreso Semanal</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${(completedCount / cleaningTasks.length) * 100}%`}}></div>
            </div>
            <p className="progress-text">{completedCount} de {cleaningTasks.length} tareas completadas</p>
          </div>
        </div>
      </div>

      <div className="cleaning-tips">
        <h2>💡 Consejos de Higiene</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-emoji">🧴</span>
            <h4>Productos Recomendados</h4>
            <p>Usar productos con cloro, alcohol 70% o desinfectantes certificados</p>
          </div>
          <div className="tip-card">
            <span className="tip-emoji">🧤</span>
            <h4>Protección Personal</h4>
            <p>Usar guantes y mascarilla si es necesario al usar químicos fuertes</p>
          </div>
          <div className="tip-card">
            <span className="tip-emoji">🌬️</span>
            <h4>Ventilación</h4>
            <p>Mantener espacios bien ventilados durante y después de limpiar</p>
          </div>
        </div>
      </div>

      <div className="tasks-list">
        <h2>📋 Tareas de Limpieza</h2>
        {cleaningTasks.map((task) => (
          <div key={task.id} className={`task-item ${checkedTasks[task.id] ? 'completed' : ''}`}>
            <div className="task-header">
              <div className="task-checkbox">
                <input 
                  type="checkbox" 
                  checked={checkedTasks[task.id] || false}
                  onChange={() => toggleTask(task.id)}
                />
              </div>
              <div className="task-icon">{task.icon}</div>
              <div className="task-main-info">
                <h3>{task.task}</h3>
                <p className="task-frequency">{task.frequency}</p>
              </div>
              <div className="task-meta">
                <span className={`importance ${task.importance.toLowerCase()}`}>{task.importance}</span>
                <span className="time-estimate">{task.time}</span>
              </div>
            </div>
            <div className="task-tips">
              <p><strong>💡 Consejo:</strong> {task.tips}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cleaning-actions">
        <button className="btn-primary" onClick={() => alert('📅 Crear horario de limpieza personalizado')}>📅 Crear Horario de Limpieza</button>
        <button className="btn-secondary" onClick={() => alert('🔔 Recordatorios configurados')}>🔔 Configurar Recordatorios</button>
        <button className="btn-secondary" onClick={() => alert('📊 Historial de limpieza mostrado')}>📊 Ver Historial</button>
        <button className="btn-secondary" onClick={() => alert('💬 Obtener consejos de experto')}>💬 Consejos de Experto</button>
      </div>
    </div>
  );
}

export default Cleaning;
