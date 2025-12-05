import React from "react";
import "./App.css";
import RadioPlayer from "./components/RadioPlayer";
import EncyclopediaTabs from "./components/EncyclopediaTabs";

export default function App() {
  return (
    <div className="app-container">
      <h1>📚 KNOWLEDGE HUB</h1>

      <div className="welcome-section">
        <p>Explore 43 subjects • Live radio • Real-time news</p>
      </div>

      <RadioPlayer />

      <div className="content-area">
        <EncyclopediaTabs />
      </div>
    </div>
  );
}
