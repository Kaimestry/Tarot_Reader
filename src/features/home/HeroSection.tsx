import React from "react";
import PlainButton from "../../components/buttons/PlainButton";
import GradientBackground from "../../components/background/GradientBackground";
import { GiCardRandom } from "react-icons/gi";
import { MdDraw } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import CardSpin from "../../components/CardAnimation/CardSpin";
import { BRAND_CONFIG } from "../../config/appConfig";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <GradientBackground className="relative overflow-hidden w-full min-h-[400px] pb-5">
      {/* CENTERED CONTENT */}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 pt-12 md:pt-16">
        {/* CARD WHEEL */}
        <div
          className="
            absolute
            right-0 top-0
            translate-x-1/3 -translate-y-1/2
            pointer-events-none
            scale-50 sm:scale-70 md:scale-90 lg:scale-100
            z-0
            [mask-image:linear-gradient(to_left,black,black,transparent)]
          "
        >
          <CardSpin />
        </div>

        {/* TEXT */}
        <div className="relative z-20 flex flex-col gap-6 md:gap-10">
          <div className="font-bold text-primary text-3xl sm:text-4xl md:text-5xl uppercase">
            {BRAND_CONFIG.shortBrandName}
          </div>

          <div className="text-main flex flex-col gap-5 font-semibold max-w-[500px]">
            <p className="text-lg">Explore tarot cards at your own pace.</p>
            <p>
              Shuffle, spread, and discover cards just like you would with a
              real deck. Whether you're curious about tarot or just starting
              your journey, this interactive experience helps you learn one card
              at a time.
            </p>
          </div>

          <div className="flex gap-3 md:gap-5 flex-wrap">
            <PlainButton
              variant="primary"
              label="Start Reading"
              icon={<GiCardRandom />}
              onClick={() => navigate("/reading")}
            />
            <PlainButton
              variant="secondary"
              label="Explore Cards"
              icon={<FaSearch />}
              onClick={() => navigate("/library")}
            />
            <PlainButton
              variant="secondary"
              label="Customize Cards"
              icon={<MdDraw />}
            />
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default HeroSection;
