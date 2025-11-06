import { useState } from "react";
import axios from "axios";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid number.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.get(`http://localhost:3001/api/currency?amount=${amount}`);
      setResult(res.data);
    } catch {
      setError("Conversion failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module">
      <h2>Currency Converter (INR → USD / EUR)</h2>

      <div className="input-group">
        <input
          type="number"
          placeholder="Enter amount in INR"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleConvert}>Convert</button>
      </div>

      {loading && <p>Converting...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {result && (
        <>
          <p>INR: ₹{result.inr}</p>
          <p>USD: ${result.usd}</p>
          <p>EUR: €{result.eur}</p>
        </>
      )}
    </div>
  );
}
