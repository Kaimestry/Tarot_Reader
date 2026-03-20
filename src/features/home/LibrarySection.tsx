import React from "react";
import PlainButton from "../../components/buttons/PlainButton";

const LibrarySection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* LEFT */}
          <div className="flex-1 flex justify-center">
            <div className="max-w-sm flex flex-col items-center md:items-start text-center md:text-left">
              {" "}
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                🔮 Discover Every Card, Every Meaning
              </h2>
              <p className="text-sm md:text-base text-main mb-4 md:mb-6">
                Navigate the full tarot deck with ease. Quickly search for any
                card, filter by category, and access clear, structured meanings
                without the clutter.
              </p>
              <PlainButton variant="secondary" label="View Cards" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[220px] md:max-w-xs aspect-[3/4] bg-primary rounded-2xl shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LibrarySection;
