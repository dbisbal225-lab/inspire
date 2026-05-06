import React, { useState } from "react";
import "./styles/MedicalHistory.css";
import { createPdfDocument, addPdfHeader, savePdf } from "../utils/pdfGenerator";

function MedicalHistory() {
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const generateMedicalReportPdf = async (record) => {
    const doc = createPdfDocument();
    await addPdfHeader(doc, 'Informe Médico Personalizado', 'Informe Médico Personalizado - ISMAEL');

    const lines = [
      `Fecha del informe: ${record.date}`,
      `Paciente: ISMAEL`,
      `Hospital: Hospital del Mar`,
      `Servicio: Neumología`,
      `Médico responsable: ${record.doctor}`,
      `Especialidad: ${record.specialty}`,
      ``,
      `Diagnóstico: ${record.diagnosis}`,
      `Tratamiento: ${record.treatment}`,
      `Notas del médico: ${record.notes}`,
      ``,
      `Este informe ha sido generado por InSpire para el Hospital del Mar.`
    ];

    let y = 70;
    doc.setFontSize(11);
    lines.forEach((line) => {
      const split = doc.splitTextToSize(line, 180);
      doc.text(split, 15, y);
      y += split.length * 6;
    });

    savePdf(doc, `Informe_Medico_ISMAEL_${record.date.replace(/\//g, '-')}.pdf`);
  };

  const generateFullMedicalReportPdf = async () => {
    const doc = createPdfDocument();
    await addPdfHeader(doc, 'Informe Médico Completo', 'Informe Médico Completo - ISMAEL');

    let y = 70;
    doc.setFontSize(11);
    medicalRecords.forEach((record, index) => {
      const lines = [
        `Fecha: ${record.date}`,
        `Médico: ${record.doctor}`,
        `Especialidad: ${record.specialty}`,
        `Diagnóstico: ${record.diagnosis}`,
        `Tratamiento: ${record.treatment}`,
        `Notas: ${record.notes}`,
        `Estado: ${record.status === 'activo' ? 'Activo' : 'Cerrado'}`,
        `----------------------------------------`
      ];

      lines.forEach((line) => {
        const split = doc.splitTextToSize(line, 180);
        doc.text(split, 15, y);
        y += split.length * 6;
      });

      if (index < medicalRecords.length - 1 && y > 250) {
        doc.addPage();
        y = 20;
      }
    });

    savePdf(doc, `Informe_Medico_Completo_ISMAEL_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  const medicalRecords = [
    {
      id: 1,
      date: "28/04/2026",
      doctor: "Dr. Juan Rodríguez Martínez",
      specialty: "Neumología",
      diagnosis: "Presión arterial elevada (140/90)",
      treatment: "Losartán 50mg diario + Ejercicio regular",
      notes: "Próximo control en 2 meses. Reducir sal en dieta",
      status: "activo"
    },
    {
      id: 2,
      date: "12/04/2026",
      doctor: "Dra. Lucía Fernández Campos",
      specialty: "Medicina General",
      diagnosis: "Revisión preventiva anual",
      treatment: "Análisis de sangre: Colesterol elevado detectado",
      notes: "Recomendar dieta equilibrada y ejercicio 30 min/día",
      status: "cerrado"
    },
    {
      id: 3,
      date: "25/03/2026",
      doctor: "Dr. Carlos López Sánchez",
      specialty: "Neumología",
      diagnosis: "Asma leve intermitente",
      treatment: "Salbutamol inhalador según necesidad",
      notes: "Evitar alérgenos. Control cada 6 meses",
      status: "activo"
    },
    {
      id: 4,
      date: "10/02/2026",
      doctor: "Dr. Miguel Ángel Torres",
      specialty: "Oftalmología",
      diagnosis: "Miopía moderada",
      treatment: "Nuevas gafas recetadas",
      notes: "Próximo control en 1 año",
      status: "cerrado"
    }
  ];

  return (
    <div className="medical-history-container">
      <div className="history-header">
        <h1>📋 Historial Médico de ISMAEL</h1>
        <p className="history-subtitle">Tu perfil médico completo y actualizado - 28 años - Barcelona, España</p>
      </div>

      <div className="records-summary">
        <div className="summary-card">
          <span className="summary-icon">👤</span>
          <div>
            <p className="summary-label">Paciente</p>
            <p className="summary-value">ISMAEL</p>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">🏥</span>
          <div>
            <p className="summary-label">Total de Visitas</p>
            <p className="summary-value">23</p>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">⚕️</span>
          <div>
            <p className="summary-label">Médicos</p>
            <p className="summary-value">8</p>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">🔴</span>
          <div>
            <p className="summary-label">Condiciones Activas</p>
            <p className="summary-value">2</p>
          </div>
        </div>
      </div>

      <div className="records-filters">
        <div className="filter-group">
          <input 
            type="text" 
            placeholder="🔍 Buscar por doctor, especialidad o diagnóstico..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-buttons">
          <button className={`filter-btn ${filterStatus === 'todos' ? 'active' : ''}`} onClick={() => setFilterStatus('todos')}>Todos</button>
          <button className={`filter-btn ${filterStatus === 'activo' ? 'active' : ''}`} onClick={() => setFilterStatus('activo')}>🟢 Activos</button>
          <button className={`filter-btn ${filterStatus === 'cerrado' ? 'active' : ''}`} onClick={() => setFilterStatus('cerrado')}>⚪ Cerrados</button>
        </div>
      </div>

      <div className="records-list">
        <h2>Últimas Visitas</h2>
        {medicalRecords
          .filter(record => {
            const matchesStatus = filterStatus === 'todos' || record.status === filterStatus;
            const matchesSearch = searchTerm === '' || record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) || record.specialty.toLowerCase().includes(searchTerm.toLowerCase()) || record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
          })
          .map((record) => (
          <div key={record.id} className="record-item">
            <div className="record-header" onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}>
              <div className="record-title-section">
                <span className={`status-badge ${record.status}`}>{record.status === 'activo' ? '🟢 Activo' : '⚪ Cerrado'}</span>
                <div>
                  <h3>{record.specialty}</h3>
                  <p className="record-date">{record.date}</p>
                </div>
              </div>
              <button className="expand-btn">{expandedRecord === record.id ? '▲' : '▼'}</button>
            </div>
            
            {expandedRecord === record.id && (
              <div className="record-details">
                <div className="detail-row">
                  <span className="detail-label">👨‍⚕️ Médico:</span>
                  <span className="detail-value">{record.doctor}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">🔍 Diagnóstico:</span>
                  <span className="detail-value">{record.diagnosis}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">💊 Tratamiento:</span>
                  <span className="detail-value">{record.treatment}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">📝 Notas:</span>
                  <span className="detail-value">{record.notes}</span>
                </div>
                <div className="record-actions">
                  <button className="btn-primary" onClick={() => generateMedicalReportPdf(record)}>📥 Descargar Informe</button>
                  <button className="btn-secondary" onClick={() => alert('🔐 Accediendo a datos privados de ISMAEL...')}>🔐 Ver Datos Privados</button>
                  <button className="btn-secondary" onClick={() => alert('📅 Cita programada con el equipo de Hospital del Mar')}>📅 Agendar Cita</button>
                  <button className="btn-secondary" onClick={() => alert('💬 Mensaje enviado al médico responsable')}>💬 Contactar Médico</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button className="btn-primary" onClick={generateFullMedicalReportPdf}>📥 Descargar Informe Completo</button>
        <button className="btn-secondary" onClick={() => alert('🔐 Accediendo a datos privados de ISMAEL...')}>🔐 Ver Datos Privados</button>
      </div>
    </div>
  );
}

export default MedicalHistory;