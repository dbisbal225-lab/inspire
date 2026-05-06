import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Eres un médico profesional especializado en neumología. Responde de forma clara, profesional y segura."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    let reply = data.choices[0].message.content;

    // ⚠️ AÑADIR MENSAJE MÉDICO OBLIGATORIO
    reply += " ⚠️ Si los síntomas persisten, te recomiendo contactar con tu equipo de Atención Primaria y recordar que esto no sustituye a un médico real.";

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Error en la IA" });
  }
});

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});