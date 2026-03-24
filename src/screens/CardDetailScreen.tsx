import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import LibraryLayout from "../features/library/LibraryLayout";
import { FULL_STABLE_DECK } from "../utils/tarotDeck";
import { DetailHeader } from "../features/library/DetailsHeader";
import { CardVisual } from "../features/library/CardVisual";
import AsideSummary from "../features/library/AsideSummary";

const CardDetailScreen: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Use memo to find the card once; prevents re-searching on every render
  const cardBase = useMemo(
    () => FULL_STABLE_DECK.find((c) => c.slug === slug),
    [slug],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!cardBase) return <div className="p-20 text-center">Card not found</div>;

  return (
    <LibraryLayout headerContent={<DetailHeader name={cardBase.name} />}>
      {/* RESPONSIVE FIX: 
         - flex-col for mobile (stacks image on top of text)
         - md:flex-row for desktop (side by side)
         - items-start prevents the text from stretching to match image height
      */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 md:gap-16 py-10 px-6 items-start">
        {/* Pass cardBase data directly to children */}
        <CardVisual image={cardBase.image} name={cardBase.name} />

        <AsideSummary card={cardBase} />
      </div>
    </LibraryLayout>
  );
};

export default CardDetailScreen;
