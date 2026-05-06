import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function ChartComponent() {
  const [loading, setLoading] = useState(false);

  const guardarDato = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "sintomas"), {
        nivel: Math.floor(Math.random() * 5) + 1,
        fecha: new Date()
      });
      alert("Dato guardado en Firebase 🚀");
    } catch (error) {
      console.error(error);
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const data = {
    labels: ["L", "M", "X", "J", "V"],
    datasets: [
      {
        label: "Salud",
        data: [3, 4, 2, 5, 4],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.1)"
      }
    ]
  };

  return (
    <div style={{ padding: "20px" }}>
      <Line data={data} />
      <button onClick={guardarDato} disabled={loading}>
        {loading ? "Guardando..." : "Guardar síntoma"}
      </button>
    </div>
  );
}

export default ChartComponent;