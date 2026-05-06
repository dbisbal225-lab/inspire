import React, { useState } from "react";
import "./styles/Nutrition.css";
import { createPdfDocument, addPdfHeader, savePdf } from "../utils/pdfGenerator";

function Nutrition() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [completedMeals, setCompletedMeals] = useState({
    1: true,
    2: true,
    3: false,
    4: false
  });
  const [nutritionMessage, setNutritionMessage] = useState('');

  const dailyMeals = [
    {
      id: 1,
      name: "Desayuno ISMAEL",
      time: "07:00 - 08:00",
      icon: "🥣",
      calories: 380,
      suggested: ["Avena integral (1 taza)", "Plátano", "Almendras (puñado)", "Café con leche desnatada"],
      nutrients: { proteína: "12g", fibra: "7g", carbohidratos: "50g" }
    },
    {
      id: 2,
      name: "Almuerzo ISMAEL",
      time: "13:00 - 14:00",
      icon: "🍽️",
      calories: 650,
      suggested: ["Pechuga de pollo a la parrilla (150g)", "Ensalada (lechuga, tomate, pepino)", "Arroz integral (1 taza)", "Agua con limón"],
      nutrients: { proteína: "38g", fibra: "5g", carbohidratos: "75g" }
    },
    {
      id: 3,
      name: "Merienda ISMAEL",
      time: "17:00 - 18:00",
      icon: "🥤",
      calories: 160,
      suggested: ["Manzana con mantequilla de cacahuete", "Yogurt griego (150g)", "Té verde sin azúcar"],
      nutrients: { proteína: "8g", fibra: "4g", carbohidratos: "22g" }
    },
    {
      id: 4,
      name: "Cena ISMAEL",
      time: "20:00 - 21:00",
      icon: "🍲",
      calories: 420,
      suggested: ["Filete de salmón (120g)", "Brócoli al vapor (200g)", "Batata (150g)", "Aceite de oliva (1 cucharada)"],
      nutrients: { proteína: "32g", fibra: "6g", carbohidratos: "48g" }
    }
  ];

  const totalCalories = dailyMeals.reduce((acc, meal) => acc + meal.calories, 0);

  const generateNutritionPlanPdf = async () => {
    const doc = createPdfDocument();
    await addPdfHeader(doc, 'Plan Nutricional INSPIRE', 'Plan Nutricional INSPIRE - ISMAEL');

    let y = 70;
    doc.setFontSize(11);
    const lines = [
      `Objetivo diario: 2000 kcal`,
      `Total planificado: ${totalCalories} kcal`,
      '',
      ...dailyMeals.flatMap((meal) => [
        `${meal.name} (${meal.time})`,
        `Calorías: ${meal.calories} kcal`,
        `Alimentos sugeridos: ${meal.suggested.join(', ')}`,
        `Nutrientes: Proteína ${meal.nutrients.proteína}, Fibra ${meal.nutrients.fibra}, Carbohidratos ${meal.nutrients.carbohidratos}`,
        ''
      ]),
      'Recomendaciones:',
      '- Beber al menos 8 vasos de agua al día',
      '- Comer despacio y mantener horarios regulares',
      '- Limitar sal, azúcar y grasas saturadas',
      '- Combinar este plan con ejercicio moderado',
      '',
      'Este plan ha sido generado por InSpire para el Hospital del Mar.'
    ];

    lines.forEach((line) => {
      const split = doc.splitTextToSize(line, 180);
      doc.text(split, 15, y);
      y += split.length * 6;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    savePdf(doc, `Plan_Nutricional_ISMAEL_${new Date().toISOString().slice(0,10)}.pdf`);
    setNutritionMessage('Plan de nutrición generado y descargado para Hospital del Mar.');
  };

  const generateNutritionAnalysisPdf = async () => {
    const doc = createPdfDocument();
    await addPdfHeader(doc, 'Análisis Nutricional', 'Análisis Nutricional INSPIRE - ISMAEL');

    let y = 70;
    doc.setFontSize(11);
    dailyMeals.forEach((meal) => {
      const lines = [
        `${meal.name}: ${meal.calories} kcal`,
        `Proteína: ${meal.nutrients.proteína}`,
        `Fibra: ${meal.nutrients.fibra}`,
        `Carbohidratos: ${meal.nutrients.carbohidratos}`,
        ''
      ];
      lines.forEach((line) => {
        const split = doc.splitTextToSize(line, 180);
        doc.text(split, 15, y);
        y += split.length * 6;
      });
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    savePdf(doc, `Analisis_Nutricional_ISMAEL_${new Date().toISOString().slice(0,10)}.pdf`);
    setNutritionMessage('Análisis nutricional descargado.');
  };

  const generateShoppingListPdf = async () => {
    const doc = createPdfDocument();
    await addPdfHeader(doc, 'Lista de Compras Nutricional', 'Lista de Compras INSPIRE - ISMAEL');

    const shoppingItems = [
      'Avena integral',
      'Plátanos',
      'Almendras',
      'Pollo a la parrilla',
      'Lechuga, tomate, pepino',
      'Arroz integral',
      'Manzanas',
      'Yogurt griego',
      'Salmón',
      'Brócoli',
      'Batatas',
      'Aceite de oliva'
    ];

    let y = 70;
    doc.setFontSize(11);
    shoppingItems.forEach((item) => {
      doc.text(`- ${item}`, 15, y);
      y += 8;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    savePdf(doc, `Lista_Compra_ISMAEL_${new Date().toISOString().slice(0,10)}.pdf`);
    setNutritionMessage('Lista de compras generada y descargada para Hospital del Mar.');
  };

  const healthyFoods = [
    { name: "Frutas y Verduras", icon: "🥗", benefits: "Vitaminas, minerales, fibra" },
    { name: "Proteína Magra", icon: "🍗", benefits: "Construcción muscular, saciedad" },
    { name: "Granos Integrales", icon: "🌾", benefits: "Energía sostenida, fibra" },
    { name: "Grasas Saludables", icon: "🥑", benefits: "Corazón, cerebro, absorción vitaminas" }
  ];

  return (
    <div className="nutrition-container">
      <div className="nutrition-header">
        <h1>🥗 Plan Nutricional de ISMAEL</h1>
        <p className="nutrition-subtitle">Comidas equilibradas y saludables para ISMAEL - Meta: 2000 kcal/día</p>
      </div>

      <div className="calorie-counter">
        <div className="calorie-box">
          <h3>Calorías Diarias</h3>
          <p className="calorie-number">{totalCalories}</p>
          <p className="calorie-target">/ 2000 kcal (Meta diaria)</p>
          <div className="calorie-bar">
            <div className="calorie-fill" style={{width: `${Math.min((totalCalories / 2000) * 100, 100)}%`}}></div>
          </div>
        </div>
      </div>

      <div className="healthy-foods">
        <h2>🌟 Grupos de Alimentos Esenciales</h2>
        <div className="foods-grid">
          {healthyFoods.map((food, idx) => (
            <div key={idx} className="food-card">
              <span className="food-icon">{food.icon}</span>
              <h4>{food.name}</h4>
              <p>{food.benefits}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="meals-plan">
        <h2>📅 Plan de Comidas Diario</h2>
        <div className="meals-list">
          {dailyMeals.map((meal) => (
            <div 
              key={meal.id} 
              className={`meal-card ${selectedMeal === meal.id ? 'active' : ''}`}
              onClick={() => setSelectedMeal(selectedMeal === meal.id ? null : meal.id)}
            >
              <div className="meal-header">
                <span className="meal-icon">{meal.icon}</span>
                <div className="meal-title-section">
                  <h3>{meal.name}</h3>
                  <p className="meal-time">{meal.time}</p>
                </div>
                <span className="meal-calories">{meal.calories} kcal</span>
              </div>

              {selectedMeal === meal.id && (
                <div className="meal-details">
                  <button 
                    className={`meal-completed-btn ${completedMeals[meal.id] ? 'completed' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCompletedMeals(prev => ({...prev, [meal.id]: !prev[meal.id]}));
                    }}
                  >
                    {completedMeals[meal.id] ? '✓ Comida Realizada' : '○ Marcar como Hecha'}
                  </button>

                  <div className="suggested-foods">
                    <h4>🍲 Alimentos Sugeridos</h4>
                    <ul>
                      {meal.suggested.map((food, idx) => (
                        <li key={idx}>✓ {food}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="meal-nutrients">
                    <h4>📊 Nutrientes</h4>
                    <div className="nutrients-row">
                      <span className="nutrient"><strong>Proteína:</strong> {meal.nutrients.proteína}</span>
                      <span className="nutrient"><strong>Fibra:</strong> {meal.nutrients.fibra}</span>
                      <span className="nutrient"><strong>Carbohidratos:</strong> {meal.nutrients.carbohidratos}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="nutrition-tips">
        <h2>💡 Recomendaciones de Nutrición</h2>
        <ul className="tips-list">
          <li>💧 Beber al menos 8 vasos de agua diaria</li>
          <li>🍽️ Comer despacio y masticar bien (20-30 minutos por comida)</li>
          <li>🥗 Llenar la mitad del plato con verduras</li>
          <li>⏰ Mantener horarios regulares de comidas</li>
          <li>🚫 Limitar sal, azúcar y grasas saturadas</li>
          <li>🏃 Combinar dieta saludable con ejercicio regular</li>
        </ul>
      </div>

      <div className="nutrition-actions">
        <button className="btn-primary" onClick={generateNutritionPlanPdf}>📝 Crear Plan de Comidas</button>
        <button className="btn-secondary" onClick={generateNutritionAnalysisPdf}>📊 Ver Análisis Nutricional</button>
        <button className="btn-secondary" onClick={generateShoppingListPdf}>🛒 Generar Lista de Compras</button>
      </div>
      {nutritionMessage && <p className="nutrition-message">{nutritionMessage}</p>}
    </div>
  );
}

export default Nutrition;