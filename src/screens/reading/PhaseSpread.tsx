import React, { useState, useRef, useEffect } from "react";
import ReadingLayout from "../../features/reading/ReadingLayout";
import CardDeck from "../../components/CardAnimation/CardDeck";
import CardSpread from "../../components/CardAnimation/CardSpread";
import { Card } from "./ReadingScreen";
import PlainButton from "../../components/buttons/PlainButton";

interface PhaseSpreadProps {
  deck: Card[];
  selectedCards: Card[];
  setSelectedCards: (cards: Card[]) => void;
  onNext: () => void;
  // NEW: Dynamic selection limit based on reading type
  maxSelection: number;
}

const PhaseSpread: React.FC<PhaseSpreadProps> = ({
  deck,
  selectedCards,
  setSelectedCards,
  onNext,
  maxSelection,
}) => {
  const deckRef = useRef<HTMLDivElement>(null);
  const [deckInfo, setDeckInfo] = useState({ x: 0, y: 0, width: 0 });
  const [isDismissing, setIsDismissing] = useState(false);

  // Capture deck position for the "Fly-out" and "Fly-back" math
  useEffect(() => {
    if (deckRef.current) {
      const rect = deckRef.current.getBoundingClientRect();
      setDeckInfo({
        x: rect.left,
        y: rect.top,
        width: rect.width,
      });
    }
  }, []);

  const handleSelect = (card: Card) => {
    if (isDismissing) return;
    const isAlreadySelected = selectedCards.find((c) => c.id === card.id);

    if (isAlreadySelected) {
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
    } else if (selectedCards.length < maxSelection) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleConfirm = () => {
    if (selectedCards.length === maxSelection) {
      setIsDismissing(true);
    }
  };

  const isSelectionComplete = selectedCards.length === maxSelection;
  const remainingCount = maxSelection - selectedCards.length;

  return (
    <ReadingLayout
      phaseName={isDismissing ? "Preparing Revelation..." : "Select Your Cards"}
      phaseInstruction={
        isDismissing
          ? "Clearing the board..."
          : isSelectionComplete
            ? "You have chosen your path. Confirm to reveal."
            : `Focus on your intent and select ${remainingCount} more ${remainingCount === 1 ? "card" : "cards"}.`
      }
      leftTop={
        <div ref={deckRef} className="w-16 sm:w-20">
          <CardDeck cardCount={5} />
        </div>
      }
      mainContent={
        <CardSpread
          deck={deck}
          selectedCards={selectedCards}
          onCardClick={handleSelect}
          deckX={deckInfo.x}
          deckY={deckInfo.y}
          deckWidth={deckInfo.width}
          isDismissing={isDismissing}
          onDismissComplete={onNext}
        />
      }
      footerButtons={
        <PlainButton
          label={
            isDismissing
              ? "Loading..."
              : isSelectionComplete
                ? "Confirm Selection"
                : `Selected ${selectedCards.length}/${maxSelection}`
          }
          variant="primary"
          onClick={handleConfirm}
          // disabled={!isSelectionComplete || isDismissing}
        />
      }
    />
  );
};

export default PhaseSpread;
