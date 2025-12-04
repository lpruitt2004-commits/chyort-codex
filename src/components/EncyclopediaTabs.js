import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "../App.css";

const articles = [
  "anthropology.md",
  "art.md",
  "astronomy.md",
  "biology.md",
  "chemistry.md",
  "computer-science.md",
  "economics.md",
  "engineering.md",
  "environmental-science.md",
  "gardening.md",
  "geography.md",
  "history.md",
  "independent-unbiased-journalism.md",
  "journaling.md",
  "language-arts.md",
  "law.md",
  "literature.md",
  "mathematics.md",
  "medicine.md",
  "music.md",
  "philosophy.md",
  "physics.md",
  "political-science.md",
  "psychology.md",
  "sociology.md",
  "sports.md",
  "technology.md",
  "web-development.md",
];

export default function EncyclopediaTabs() {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const loadContent = async (file) => {
    setLoading(true);
    try {
      const response = await fetch(`/encyclopedia/${file}`);
      const text = await response.text();
      setContent(text);
      setModalOpen(true);
    } catch (error) {
      setContent(`# Error\\n\\nCould not load ${file}`);
      setModalOpen(true);
    }
    setLoading(false);
  };

  const formatTabName = (filename) => {
    // Custom names for specific articles
    if (filename === "independent-unbiased-journalism.md") {
      return "Journalism";
    }

    const name = filename.replace(".md", "").replace(/-/g, " ");
    // Shorten long names for better fit
    const words = name.split(" ");
    if (words.length > 2) {
      return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1, 4))
        .join(" ");
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <>
      <div className="encyclopedia-tabs">
        <div className="tab-list">
          {articles.map((file, idx) => (
            <button
              key={file}
              className={`tab-btn${active === idx ? " active" : ""}`}
              onClick={() => {
                setActive(idx);
                loadContent(file);
              }}
              title={file.replace(".md", "").replace(/-/g, " ")}
            >
              {formatTabName(file)}
            </button>
          ))}
        </div>
        <div className="tab-panel">
          <p className="tab-hint">Click a tab above to view the article</p>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              ×
            </button>
            <div className="modal-body">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ReactMarkdown>{content}</ReactMarkdown>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
