import React from "react";
import { Card } from "./ReadingScreen";

interface PhaseReadingProps {
  selectedCards: Card[];
  revealedCards: Card[];
  setRevealedCards: (cards: Card[]) => void;
  onNext: () => void;
}

const PhaseReading: React.FC<PhaseReadingProps> = ({
  selectedCards,
  revealedCards,
  setRevealedCards,
  onNext,
}) => {
  const revealNext = () => {
    if (revealedCards.length < selectedCards.length) {
      setRevealedCards([...revealedCards, selectedCards[revealedCards.length]]);
    }
  };

  return (
    <div
      style={{
        padding: 20,
        border: "2px solid #ccc",
        background: "#d6a0e8",
        borderRadius: 8,
        textAlign: "center",
      }}
    >
      <h2>Phase 3: Card Reading</h2>
      <p>[Flip Animation Placeholder]</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginTop: 10,
        }}
      >
        {revealedCards.map((card) => (
          <div
            key={card.id}
            style={{
              width: 80,
              height: 120,
              border: "2px solid #333",
              borderRadius: 4,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {card.name}
          </div>
        ))}
      </div>
      {revealedCards.length < selectedCards.length ? (
        <button style={{ marginTop: 10 }} onClick={revealNext}>
          Reveal Next Card
        </button>
      ) : (
        <button style={{ marginTop: 10 }} onClick={onNext}>
          Finish Reading
        </button>
      )}
    </div>
  );
};

export default PhaseReading;
