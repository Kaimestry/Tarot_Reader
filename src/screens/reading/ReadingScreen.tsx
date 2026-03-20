import React, { useState } from "react";
import PhaseShuffle from "./PhaseShuffle";
import PhaseSpread from "./PhaseSpread";
import PhaseReading from "./PhaseReading";
import PhaseNewReading from "./PhaseNewReading";

// 1. Centralized Config for easy adjustments
const READING_CONFIG = {
  maxSelection: 3, // Change this to 1, 5, or 10 to update the whole app
  deckSize: 14, // Total cards available in the spread
};

export type Card = {
  id: number;
  name: string;
};

const TarotReader: React.FC = () => {
  const [phase, setPhase] = useState(1);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [revealedCards, setRevealedCards] = useState<Card[]>([]);

  // Use the config for deck generation
  const deck: Card[] = Array.from(
    { length: READING_CONFIG.deckSize },
    (_, i) => ({
      id: i + 1,
      name: `Card ${i + 1}`,
    }),
  );

  const nextPhase = () => setPhase((prev) => (prev === 4 ? 1 : prev + 1));

  const resetReading = () => {
    setSelectedCards([]);
    setRevealedCards([]);
    setPhase(1);
  };

  return (
    <div className="w-full min-h-screen bg-main text-main overflow-hidden">
      {/* Phase 1: Shuffle */}
      {phase === 1 && <PhaseShuffle onNext={nextPhase} />}

      {/* Phase 2: Spread & Selection */}
      {phase === 2 && (
        <PhaseSpread
          deck={deck}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          maxSelection={READING_CONFIG.maxSelection} // Pass the dynamic value here
          onNext={nextPhase}
        />
      )}

      {/* Phase 3: The Reading/Reveal */}
      {phase === 3 && (
        <PhaseReading
          selectedCards={selectedCards}
          revealedCards={revealedCards}
          setRevealedCards={setRevealedCards}
          onNext={nextPhase}
        />
      )}

      {/* Phase 4: Final Screen */}
      {phase === 4 && <PhaseNewReading onReset={resetReading} />}
    </div>
  );
};

export default TarotReader;
