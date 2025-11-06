import { useState, useEffect } from "react";
import axios from "axios";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("https://infohub-backend-lov3.onrender.com/api/quote");
      setQuote(res.data);
    } catch {
      setError("Failed to fetch quote.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="module">
      <h2>Motivational Quote</h2>

      {loading && <p>Loading quote...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {quote && (
        <>
          <p>"{quote.quote}"</p>
          <p>- {quote.author}</p>
        </>
      )}

      <button onClick={fetchQuote}>New Quote</button>
    </div>
  );
}
