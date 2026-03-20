import React, { useRef, useState } from "react";
import ReadingLayout from "../../features/reading/ReadingLayout";
import CardDeck from "../../components/CardAnimation/CardDeck";
import AnimatedShuffleDeck from "../../components/CardAnimation/AnimatedShuffleDeck";
import PlainButton from "../../components/buttons/PlainButton";
// Updated path based on your folder structure

const PhaseShuffle: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const deckRef = useRef<HTMLDivElement>(null);

  const [animActive, setAnimActive] = useState(false);
  const [hasShuffled, setHasShuffled] = useState(false);
  const [deckRect, setDeckRect] = useState({ x: 0, y: 0, width: 0 });

  const startShuffle = () => {
    if (deckRef.current) {
      const rect = deckRef.current.getBoundingClientRect();
      setDeckRect({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
      });
      setAnimActive(true);
    }
  };

  const handleShuffleComplete = () => {
    setAnimActive(false);
    setHasShuffled(true);
  };

  return (
    <div className="relative w-full h-full">
      <ReadingLayout
        phaseName="The Shuffle"
        phaseInstruction={
          hasShuffled
            ? "The deck is ready. You can shuffle again or proceed."
            : "Focus on your question and start shuffling."
        }
        leftTop={
          <div ref={deckRef} className="w-16 sm:w-16 md:w-20 lg:w-20">
            {/* Reduced from w-32 to w-24 for laptop screens */}
            <div style={{ visibility: animActive ? "hidden" : "visible" }}>
              <CardDeck cardCount={5} />
            </div>
          </div>
        }
        mainContent={
          <div className="flex flex-col items-center justify-center p-10 text-center">
            {animActive ? (
              <p className="text-xl italic animate-pulse">
                Clearing the cards...
              </p>
            ) : (
              <p className="text-lg">
                {hasShuffled
                  ? "Energy Cleared."
                  : "Prepare your mind for the reading."}
              </p>
            )}
          </div>
        }
        footerButtons={
          <div className="flex gap-4 items-center">
            {animActive ? (
              <PlainButton label="Shuffling..." variant="primary" />
            ) : !hasShuffled ? (
              /* Phase 1: Initial Start */
              <PlainButton
                label="Start Shuffling"
                variant="primary"
                onClick={startShuffle}
              />
            ) : (
              /* Phase 2: Post-Shuffle Options */
              <>
                <PlainButton
                  label="Next Phase"
                  variant="primary"
                  onClick={onNext}
                />
                <PlainButton
                  label="Shuffle Again"
                  variant="secondary"
                  onClick={startShuffle}
                />
              </>
            )}
          </div>
        }
      />

      {animActive && (
        <AnimatedShuffleDeck
          startX={deckRect.x}
          startY={deckRect.y - 9}
          startWidth={deckRect.width}
          shuffleTimes={3}
          onComplete={handleShuffleComplete}
        />
      )}
    </div>
  );
};

export default PhaseShuffle;
