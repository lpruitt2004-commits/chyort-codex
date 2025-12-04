import React, { useState } from "react";
import ModelSelector from "./components/ModelSelector";
import ConnectionModeSelector from "./components/ConnectionModeSelector";
import EncyclopediaTabs from "./components/EncyclopediaTabs";

export default function App() {
  const [model, setModel] = useState("gpt-4");
  const [mode, setMode] = useState("online");

  return (
    <div className="app-container">
      <h1>Encyclopedia PWA</h1>
      <ConnectionModeSelector onSelect={setMode} />
      <ModelSelector onSelect={setModel} />
      <EncyclopediaTabs />
    </div>
  );
}
