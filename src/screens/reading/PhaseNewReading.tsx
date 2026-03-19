import React from "react";

interface PhaseNewReadingProps {
  onReset: () => void;
}

const PhaseNewReading: React.FC<PhaseNewReadingProps> = ({ onReset }) => {
  return (
    <div
      style={{
        padding: 20,
        border: "2px solid #ccc",
        background: "#a0e8b0",
        borderRadius: 8,
        textAlign: "center",
      }}
    >
      <h2>Phase 4: New Reading</h2>
      <p>[Discard/Return Cards Placeholder]</p>
      <button onClick={onReset}>Shuffle Again</button>
    </div>
  );
};

export default PhaseNewReading;
