import React from "react";
import PlainButton from "../../components/buttons/PlainButton";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const LibrarySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-20">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* LEFT */}
          <div className="flex-1 flex justify-center">
            <div className="max-w-sm flex flex-col items-center md:items-start text-center md:text-left">
              {" "}
              <h2 className="text-primary text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                🔮 Discover Every Card, Every Meaning
              </h2>
              <p className="text-sm md:text-base text-main mb-4 md:mb-6">
                Navigate the full tarot deck with ease. Quickly search for any
                card, filter by category, and access clear, structured meanings
                without the clutter.
              </p>
              <PlainButton
                variant="secondary"
                label="Explore Cards"
                icon={<FaSearch />}
                onClick={() => navigate("/library")}
              />{" "}
            </div>
          </div>
          {/* RIGHT - PLACEHOLDER */}
          <div className="flex-1 flex justify-center w-full mt-8 md:mt-0">
            <div className="w-[300px] md:w-full md:max-w-xs aspect-[3/4] bg-indigo-500/20 border-2 border-dashed border-indigo-500/50 rounded-2xl shadow-xl flex items-center justify-center">
              <span className="text-indigo-500 font-mono text-xs">
                Card Placeholder
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LibrarySection;
