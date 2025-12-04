import React, { useState } from "react";

export default function ConnectionModeSelector({ onSelect }) {
  const [mode, setMode] = useState("online");

  function handleChange(e) {
    setMode(e.target.value);
    onSelect(e.target.value);
  }

  return (
    <div style={{ margin: "2rem 0" }}>
      <label htmlFor="mode-select" style={{ fontWeight: "bold" }}>
        Connection Mode:
      </label>
      <select
        id="mode-select"
        value={mode}
        onChange={handleChange}
        style={{ marginLeft: "1rem", padding: "0.5rem" }}
      >
        <option value="online">Online (Cloud AI)</option>
        <option value="offline">Offline (Local AI)</option>
      </select>
    </div>
  );
}
