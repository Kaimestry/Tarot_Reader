import React, { useState, useRef, useEffect } from "react";
import ReadingLayout from "../../features/reading/ReadingLayout";
import CardDeck from "../../components/CardAnimation/CardDeck";
import CardSpread from "../../components/CardAnimation/CardSpread";
import PlainButton from "../../components/buttons/PlainButton";
import { Card } from "./ReadingScreen";

interface PhaseNewReadingProps {
  onReset: () => void;
  selectedCards: Card[];
}

const PhaseNewReading: React.FC<PhaseNewReadingProps> = ({
  onReset,
  selectedCards,
}) => {
  const deckRef = useRef<HTMLDivElement>(null);
  const [deckInfo, setDeckInfo] = useState({ x: 0, y: 0, width: 0 });
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    if (deckRef.current) {
      const rect = deckRef.current.getBoundingClientRect();
      setDeckInfo({ x: rect.left, y: rect.top, width: rect.width });
    }
  }, []);

  const handleFinish = () => {
    setIsReturning(true);
    setTimeout(() => {
      onReset();
    }, 1500);
  };

  return (
    <ReadingLayout
      phaseName="The Journey Ends"
      phaseInstruction={
        isReturning
          ? "Gathering the energy..."
          : "The cards remain. Tap the button to clear the board."
      }
      leftTop={
        <div ref={deckRef} className="w-16 sm:w-20">
          <CardDeck cardCount={5} />
        </div>
      }
      mainContent={
        <div className="w-full h-full flex items-center justify-center">
          <CardSpread
            deck={selectedCards}
            selectedCards={[]} // Makes them all show Face-Down (Backs)
            onCardClick={() => {}}
            deckX={deckInfo.x}
            deckY={deckInfo.y}
            deckWidth={deckInfo.width}
            isDismissing={isReturning} // When true, they fly back [][][] -> []
            forceSpread={true} // When true, they start on the table [][][]
          />
        </div>
      }
      footerButtons={
        <PlainButton
          label={isReturning ? "Resetting..." : "Collect Cards & Reset"}
          variant="primary"
          onClick={handleFinish}
          // disabled={isReturning}
        />
      }
    />
  );
};
export default PhaseNewReading;
