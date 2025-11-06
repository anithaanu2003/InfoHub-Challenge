import { useState } from "react";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("weather");

  return (
    <div className="app-container">
      {/* Animated Background Blobs */}
      <div className="background-blobs"></div>

      {/* Header */}
      <header className="w-full text-center py-6 relative z-10">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">🌐 InfoHub</h1>
        <p className="text-lg text-white drop-shadow-md mt-1">
          Your daily hub for info & inspiration
        </p>
      </header>

      {/* Tabs */}
      <nav className="flex gap-4 mt-8 z-10">
        {["weather", "currency", "quote"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-semibold ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-blue-200 text-blue-800"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Modules */}
      <main className="flex justify-center items-center mt-10 w-full px-4 z-10">
        <div className="w-full max-w-md flex justify-center">
          {activeTab === "weather" && <WeatherModule />}
          {activeTab === "currency" && <CurrencyConverter />}
          {activeTab === "quote" && <QuoteGenerator />}
        </div>
      </main>

      <footer className="mt-auto py-4 text-sm text-white z-10">
        Made with 💙 for ByteXL Coding Challenge
      </footer>
    </div>
  );
}
