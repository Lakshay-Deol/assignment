import { useState } from "react";
import "./Disclaimer.css";

const disclaimers = ["Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
]

function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="disclaimer-container">
      <button
        className="disclaimer-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        id="disclaimer-toggle"
      >
        <div className="disclaimer-toggle-left">
          <svg
            className="disclaimer-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>Important Notes & Disclaimers</span>
        </div>
        <svg
          className={`disclaimer-chevron ${isOpen ? "open" : ""}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className={`disclaimer-content ${isOpen ? "expanded" : ""}`}>
        <ul className="disclaimer-list">
          {disclaimers.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Disclaimer;
