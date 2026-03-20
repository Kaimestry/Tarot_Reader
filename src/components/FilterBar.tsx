import React from "react";
import { TarotSuite } from "../features/library/types";
interface Category {
  label: string;
  key: string;
}

interface FilterBarProps {
  categories: Category[];
  counts: Record<string, number>;
  activeFilter: string;
  onFilterChange: (key: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  counts,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <nav className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onFilterChange(cat.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all border flex items-center gap-2
            ${
              activeFilter === cat.key
                ? "bg-primary text-main border-primary shadow-md"
                : "bg-surface text-muted border-divider hover:border-primary/50"
            }`}
        >
          <span>{cat.label}</span>
          <span className="opacity-60 text-[10px] font-bold">
            {counts[cat.key]}
          </span>
        </button>
      ))}
    </nav>
  );
};
export default FilterBar;
