import React from "react";
import ReadingLayout from "../../features/reading/ReadingLayout";
import CardDeck from "../../components/CardAnimation/CardDeck";
import CardSpread from "../../components/CardAnimation/CardSpread";
import { Card } from "./ReadingScreen";
import PlainButton from "../../components/buttons/plainButton";

interface PhaseSpreadProps {
  deck: Card[];
  selectedCards: Card[];
  setSelectedCards: (cards: Card[]) => void;
  onNext: () => void;
}

const PhaseSpread: React.FC<PhaseSpreadProps> = ({
  deck,
  selectedCards,
  setSelectedCards,
  onNext,
}) => {
  const maxSelection = 3;

  const handleSelect = (card: Card) => {
    const isAlreadySelected = selectedCards.find((c) => c.id === card.id);

    if (isAlreadySelected) {
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
    } else if (selectedCards.length < maxSelection) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const isSelectionComplete = selectedCards.length === maxSelection;

  return (
    <ReadingLayout
      phaseName="Select Your Cards"
      phaseInstruction={
        isSelectionComplete
          ? "You have chosen your path. Confirm to reveal."
          : `Focus on your intent and select ${maxSelection - selectedCards.length} more cards.`
      }
      leftTop={
        <div className="w-16 sm:w-20 md:w-24">
          <CardDeck cardCount={5} />
        </div>
      }
      mainContent={
        <CardSpread
          deck={deck}
          selectedCards={selectedCards}
          onCardClick={handleSelect}
        />
      }
      footerButtons={
        <PlainButton
          label={
            isSelectionComplete
              ? "Confirm Selection"
              : `Selected ${selectedCards.length}/${maxSelection}`
          }
          variant="primary"
          onClick={onNext}
          // Button is only clickable when exactly 3 are picked
        />
      }
    />
  );
};

export default PhaseSpread;
