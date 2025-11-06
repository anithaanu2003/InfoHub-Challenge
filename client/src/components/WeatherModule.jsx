import { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherModule() {
  const [city, setCity] = useState("Hyderabad");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:3001/api/weather?city=${cityName}`);
      setWeather(res.data);
    } catch {
      setError("Could not load weather data. Please check the city name.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = () => {
    if (city) fetchWeather(city);
  };

  return (
    <div className="module">
      <h2>Weather Info</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading weather...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {weather && (
        <>
          <p>City: {weather.city}</p>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.condition}</p>
        </>
      )}
    </div>
  );
}
