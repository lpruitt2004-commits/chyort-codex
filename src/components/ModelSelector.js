import React, { useState } from "react";

const AI_MODELS = [
  { id: "gpt-4", name: "GPT-4" },
  { id: "llama-3", name: "Llama 3" },
  { id: "custom-local", name: "Custom Local Model" },
];

export default function ModelSelector({ onSelect }) {
  const [selected, setSelected] = useState(AI_MODELS[0].id);

  function handleChange(e) {
    setSelected(e.target.value);
    onSelect(e.target.value);
  }

  return (
    <div style={{ margin: "2rem 0" }}>
      <label htmlFor="model-select" style={{ fontWeight: "bold" }}>
        Choose AI Model:
      </label>
      <select
        id="model-select"
        value={selected}
        onChange={handleChange}
        style={{ marginLeft: "1rem", padding: "0.5rem" }}
      >
        {AI_MODELS.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}
