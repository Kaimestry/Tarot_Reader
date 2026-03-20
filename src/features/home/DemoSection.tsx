import React from "react";
import PlainButton from "../../components/buttons/PlainButton";
import { GiCardRandom } from "react-icons/gi";
import { BRAND_CONFIG } from "../../config/appConfig";
import { useNavigate } from "react-router-dom";

const DemoSection = () => {
  const navigate = useNavigate();

  // Shared attributes to keep the code clean
  const videoAttributes = {
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    className: "w-full h-full object-cover pointer-events-none",
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 pt-8 md:pt-16">
      {/* LEFT - VIDEO DEMO */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-[280px] md:max-w-sm aspect-[4/3] bg-main rounded-xl overflow-hidden relative">
          {/* DARK MODE VIDEO */}
          {/* This only shows when the 'dark' class is present on <html> */}
          <video
            {...videoAttributes}
            src="/assets/DEMO/DEMO_dark.webm"
            className={`${videoAttributes.className} hidden dark:block`}
          />

          {/* LIGHT MODE VIDEO */}
          {/* This shows by default, but hidden when 'dark' class is present */}
          <video
            {...videoAttributes}
            src="/assets/DEMO/DEMO_Light.webm"
            className={`${videoAttributes.className} block dark:hidden`}
          />
        </div>
      </div>

      {/* RIGHT - CONTENT */}
      <section className="flex flex-col items-center md:items-start max-w-[450px] w-full md:w-1/2 gap-4 md:gap-6 text-center md:text-left">
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
            onClick={() => navigate("/reading")}
          />
        </div>
      </section>
    </div>
  );
};

export default DemoSection;
