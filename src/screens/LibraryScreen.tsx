import React, { useState, useMemo, useEffect } from "react";
import { Card, generateRandomDeck } from "../utils/tarotDeck";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import TarotCard from "../components/TarotCard";
import LibraryLayout from "../features/library/LibraryLayout";
import Pagination from "../components/Pagination";
import { LibraryConfig } from "../config/CardDeckConfig";

// 1. Weighting Logic for Minors
const getCardWeight = (name: string): number => {
  if (!name.includes("of")) return 0;

  const [rank] = name.split(" of ");
  const weights: Record<string, number> = {
    King: 1,
    Queen: 2,
    Knight: 3,
    Page: 4,
    Ace: 5,
  };

  return weights[rank] || (parseInt(rank) ? parseInt(rank) + 5 : 99);
};

const CATEGORIES = [
  { label: "All", key: "All" },
  { label: "Major", key: "Major Arcana" },
  { label: "Cups", key: "Cups" },
  { label: "Swords", key: "Swords" },
  { label: "Wands", key: "Wands" },
  { label: "Pentacles", key: "Pentacles" },
];

const LibraryScreen: React.FC = () => {
  const [fullDeck] = useState<Card[]>(() => generateRandomDeck(78));
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentScale, setCurrentScale] = useState(LibraryConfig.desktopScale);

  useEffect(() => {
    const handleResize = () => {
      setCurrentScale(
        window.innerWidth < LibraryConfig.breakpoint
          ? LibraryConfig.mobileScale
          : LibraryConfig.desktopScale,
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Combined Filter & Sort Logic
  const filteredDeck = useMemo(() => {
    const filtered = fullDeck.filter((card) => {
      const matchesSearch = card.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const isMajor = !card.name.includes("of");
      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Major Arcana" && isMajor) ||
        card.name.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });

    return [...filtered].sort((a, b) => {
      const isMajorA = !a.name.includes("of");
      const isMajorB = !b.name.includes("of");

      // Handle Major vs Minor
      if (isMajorA && !isMajorB) return -1;
      if (!isMajorA && isMajorB) return 1;

      // Both are Major: Sort by ID (keeps Fool -> World order)
      if (isMajorA && isMajorB) return a.id.localeCompare(b.id);

      // Both are Minor: Sort by Suite then Weight
      const suiteA = a.name.split(" of ")[1];
      const suiteB = b.name.split(" of ")[1];
      if (suiteA !== suiteB) return suiteA.localeCompare(suiteB);

      return getCardWeight(a.name) - getCardWeight(b.name);
    });
  }, [searchTerm, activeFilter, fullDeck]);

  // 3. Derived Pagination & Counts
  const paginatedCards = useMemo(() => {
    const startIndex = (currentPage - 1) * LibraryConfig.itemsPerPage;
    return filteredDeck.slice(
      startIndex,
      startIndex + LibraryConfig.itemsPerPage,
    );
  }, [filteredDeck, currentPage]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      counts[cat.key] = fullDeck.filter(
        (card) =>
          cat.key === "All" ||
          (cat.key === "Major Arcana" && !card.name.includes("of")) ||
          card.name.includes(cat.key),
      ).length;
    });
    return counts;
  }, [fullDeck]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  return (
    <LibraryLayout
      headerContent={
        <div className="w-full flex flex-col items-center gap-6">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-main">
            The Library
          </h1>
          <SearchBar className="max-w-md" onChange={setSearchTerm} />
        </div>
      }
    >
      <div className="w-full flex flex-col items-center">
        <FilterBar
          categories={CATEGORIES}
          counts={categoryCounts}
          activeFilter={activeFilter}
          onFilterChange={(key) => setActiveFilter(key)}
        />

        <div className="w-full flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto min-h-[40vh] py-8">
            {paginatedCards.length > 0 ? (
              paginatedCards.map((card) => (
                <TarotCard
                  key={card.id}
                  {...card}
                  isReversed={false}
                  scale={currentScale}
                />
              ))
            ) : (
              <div className="flex items-center justify-center w-full text-muted italic opacity-50">
                No cards found in the archive.
              </div>
            )}
          </div>

          <div className="w-full flex justify-center mt-4 mb-10">
            <Pagination
              totalItems={filteredDeck.length}
              itemsPerPage={LibraryConfig.itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </LibraryLayout>
  );
};

export default LibraryScreen;
