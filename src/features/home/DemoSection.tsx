import React from "react";
import PlainButton from "../../components/buttons/PlainButton";
import { GiCardRandom } from "react-icons/gi";
import { BRAND_CONFIG } from "../../config/appConfig";

const DemoSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 pt-8 md:pt-16">
      {/* LEFT */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-[280px] md:max-w-sm aspect-[4/3] bg-primary rounded-xl overflow-hidden" />
      </div>

      {/* RIGHT */}
      <section className="flex flex-col items-center md:items-start max-w-[450px] w-full md:w-1/2 gap-4 md:gap-6 text-center md:text-left">
        {" "}
        <h2 className="text-xl md:text-3xl font-bold text-primary">
          🃏 Interact With Cards
        </h2>
        <p className="text-sm md:text-base text-main">
          <span className="font-bold text-primary">
            {BRAND_CONFIG.shortBrandName}
          </span>{" "}
          lets you shuffle, spread, and flip cards just like a real tarot deck.
          Take your time, pick cards that feel right, and reveal meanings when
          you're ready.
        </p>
        <div className="flex justify-center md:justify-start w-full">
          <PlainButton
            variant="primary"
            label="Start Reading"
            icon={<GiCardRandom />}
          />
        </div>
      </section>
    </div>
  );
};

export default DemoSection;
