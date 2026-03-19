// TarotReader.tsx
import React, { useState } from "react";
import PhaseShuffle from "./PhaseShuffle";
import PhaseSpread from "./PhaseSpread";
import PhaseReading from "./PhaseReading";
import PhaseNewReading from "./PhaseNewReading";

// Define Card type here
export type Card = {
  id: number;
  name: string;
};

const TarotReader: React.FC = () => {
  const [phase, setPhase] = useState(1);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [revealedCards, setRevealedCards] = useState<Card[]>([]);

  const deck: Card[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Card ${i + 1}`,
  }));

  const nextPhase = () => setPhase((prev) => (prev === 4 ? 1 : prev + 1));

  const resetReading = () => {
    setSelectedCards([]);
    setRevealedCards([]);
    setPhase(1);
  };

  return (
    <div style={{ padding: 20 }}>
      {phase === 1 && <PhaseShuffle onNext={nextPhase} />}
      {phase === 2 && (
        <PhaseSpread
          deck={deck}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          onNext={nextPhase}
        />
      )}
      {phase === 3 && (
        <PhaseReading
          selectedCards={selectedCards}
          revealedCards={revealedCards}
          setRevealedCards={setRevealedCards}
          onNext={nextPhase}
        />
      )}
      {phase === 4 && <PhaseNewReading onReset={resetReading} />}
    </div>
  );
};

export default TarotReader;
