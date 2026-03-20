import React, { useRef, useState, useEffect } from "react";
import ReadingLayout from "../../features/reading/ReadingLayout";
import FlippableCard from "../../components/CardAnimation/FlippableCard";
import PlainButton from "../../components/buttons/PlainButton";
import { Card } from "./ReadingScreen";
import CardDeck from "../../components/CardAnimation/CardDeck";

interface PhaseReadingProps {
  selectedCards: Card[];
  revealedCards: Card[];
  setRevealedCards: React.Dispatch<React.SetStateAction<Card[]>>;
  onNext: () => void;
}

const PhaseReading: React.FC<PhaseReadingProps> = ({
  selectedCards,
  revealedCards,
  setRevealedCards,
  onNext,
}) => {
  const deckRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false,
  );

  // FEATURE 1 & 3: Staggered Reveal All
  const revealAll = () => {
    selectedCards.forEach((card, index) => {
      setTimeout(() => {
        setRevealedCards((currentlyRevealed) => {
          // Check if the card is already in the list to avoid duplicates
          const alreadyThere = currentlyRevealed.find((c) => c.id === card.id);
          if (alreadyThere) return currentlyRevealed;

          return [...currentlyRevealed, card];
        });
      }, index * 250); // 250ms gap between each card starting its flip
    });
  };

  // FEATURE 2: Toggle Individual Card
  const toggleCard = (card: Card) => {
    const isRevealed = revealedCards.some((c) => c.id === card.id);
    if (isRevealed) {
      setRevealedCards(revealedCards.filter((c) => c.id !== card.id));
    } else {
      setRevealedCards([...revealedCards, card]);
    }
  };

  // FEATURE 3: Swipe Detection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;

    // Threshold of 50px for a swipe
    if (diff > 50) revealAll();
    touchStartX.current = null;
  };

  const allRevealed = revealedCards.length === selectedCards.length;

  return (
    <ReadingLayout
      phaseName="The Revelation"
      phaseInstruction={
        allRevealed
          ? "The spread is complete."
          : "Swipe right, click a card, or reveal all."
      }
      leftTop={
        <div ref={deckRef} className="w-16 sm:w-20">
          <CardDeck cardCount={5} />
        </div>
      }
      mainContent={
        <div
          className="flex flex-wrap justify-center gap-6 sm:gap-12 p-4 w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {selectedCards.map((card) => {
            const isRevealed = revealedCards.some((c) => c.id === card.id);
            return (
              <div
                key={card.id}
                onClick={() => toggleCard(card)}
                className="cursor-pointer"
              >
                <FlippableCard
                  card={card}
                  isRevealed={isRevealed}
                  scale={isMobile ? 0.25 : 0.45}
                />
              </div>
            );
          })}
        </div>
      }
      footerButtons={
        <div className="flex gap-4">
          {!allRevealed && (
            <PlainButton
              label="Reveal All"
              variant="primary"
              onClick={revealAll}
            />
          )}
          <PlainButton
            label="Finish Reading"
            variant="secondary"
            onClick={onNext}
          />
        </div>
      }
    />
  );
};

export default PhaseReading;
