import React from "react";
import { KeywordSection } from "./KeywordSection";
import { Card } from "../../utils/tarotDeck";

// Move your data to a separate config file eventually!
const CARD_MEANINGS: Record<string, any> = {
  /* ... data ... */
};

interface AsideSummaryProps {
  card: Card;
}

const AsideSummary: React.FC<AsideSummaryProps> = ({ card }) => {
  // Use the slug from the card object passed via props
  const details = card.slug ? CARD_MEANINGS[card.slug] : null;

  return (
    // md:w-1/2 ensures it takes up half the space only on desktop
    <div className="w-full md:flex-1 space-y-10">
      {/* Summary Section */}
      <section className="space-y-4">
        <h3 className="text-primary uppercase tracking-[0.25em] font-bold text-[10px] md:text-xs">
          The Journey
        </h3>
        <p className="text-muted text-lg md:text-xl leading-relaxed font-serif italic">
          {details?.description ||
            `A powerful archetype of the ${card.name.includes("of") ? "Minor" : "Major"} Arcana.`}
        </p>
      </section>

      {/* Keywords - This component handles its own internal grid */}
      <KeywordSection
        upright={details?.upright || ["Intuition", "Growth"]}
        reversed={details?.reversed || ["Blockage", "Doubt"]}
      />

      {/* Lore Section */}
      <section className="pt-8 border-t border-divider/50">
        <h3 className="text-white/40 uppercase tracking-widest font-bold text-[10px] mb-4">
          Symbolism & Lore
        </h3>
        <p className="text-muted/80 text-sm leading-loose">
          Every detail in the Rider-Waite imagery for{" "}
          <strong>{card.name}</strong> has a purpose. The background elements
          and character posture contribute to the deeper psychological profile.
        </p>
      </section>
    </div>
  );
};

export default AsideSummary;
