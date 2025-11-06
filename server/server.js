import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config(); // Load .env file

const app = express();
app.use(cors());
app.use(express.json());

// ===== WEATHER API =====
app.get("/api/weather", async (req, res) => {
  const { city = "Hyderabad" } = req.query; // Default city
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    const data = response.data;
    res.json({
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch weather data. Please check city name." });
  }
});

// ===== CURRENCY API =====
app.get("/api/currency", async (req, res) => {
  const { amount = 1 } = req.query;
  try {
    const response = await axios.get("https://api.exchangerate-api.com/v4/latest/INR");
    const rates = response.data.rates;
    const usd = (amount * rates.USD).toFixed(2);
    const eur = (amount * rates.EUR).toFixed(2);
    res.json({ inr: amount, usd, eur });
  } catch (error) {
    res.status(500).json({ error: "Currency conversion failed" });
  }
});

// ===== QUOTES API =====
app.get("/api/quote", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    const data = response.data[0];
    res.json({
      quote: data.q,
      author: data.a,
    });
  } catch (error) {
    console.error("Error fetching quote:", error.message);
    res.status(500).json({ error: "Could not fetch quote" });
  }
});

// ===== START SERVER =====
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
