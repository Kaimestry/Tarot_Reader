import React, { useState } from "react";
import PhaseShuffle from "./PhaseShuffle";
import PhaseSpread from "./PhaseSpread";
import PhaseReading from "./PhaseReading";
import PhaseNewReading from "./PhaseNewReading";
import { generateRandomDeck } from "../../utils/tarotDeck";

const READING_CONFIG = {
  maxSelection: 3,
  deckSize: 14,
};

// Updated Type to match your real assets
export type Card = {
  id: string;
  name: string;
  image: string;
  isReversed: boolean;
};

const TarotReader: React.FC = () => {
  const [phase, setPhase] = useState(1);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [revealedCards, setRevealedCards] = useState<Card[]>([]);
  const [opacity, setOpacity] = useState(1);

  // Initialize deck once using your utility
  const [deck, setDeck] = useState<Card[]>(() =>
    generateRandomDeck(READING_CONFIG.deckSize),
  );

  const handleNextPhase = () => {
    setOpacity(0);
    setTimeout(() => {
      setPhase((prev) => (prev === 4 ? 1 : prev + 1));
      setOpacity(1);
    }, 500);
  };

  const resetReading = () => {
    setOpacity(0);
    setTimeout(() => {
      setSelectedCards([]);
      setRevealedCards([]);
      // Generate a fresh random deck for the new session
      setDeck(generateRandomDeck(READING_CONFIG.deckSize));
      setPhase(1);
      setOpacity(1);
    }, 500);
  };

  return (
    <div className="w-full min-h-screen bg-main text-main overflow-hidden">
      <div
        className="transition-opacity duration-500 ease-in-out h-full w-full"
        style={{ opacity: opacity }}
      >
        {phase === 1 && <PhaseShuffle onNext={handleNextPhase} />}

        {phase === 2 && (
          <PhaseSpread
            deck={deck}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            maxSelection={READING_CONFIG.maxSelection}
            onNext={handleNextPhase}
          />
        )}

        {phase === 3 && (
          <PhaseReading
            selectedCards={selectedCards}
            revealedCards={revealedCards}
            setRevealedCards={setRevealedCards}
            onNext={handleNextPhase}
          />
        )}

        {phase === 4 && (
          <PhaseNewReading
            onReset={resetReading}
            selectedCards={selectedCards}
          />
        )}
      </div>
    </div>
  );
};

export default TarotReader;
