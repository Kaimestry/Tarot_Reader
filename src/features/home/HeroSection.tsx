import React from "react";
import PlainButton from "../../components/buttons/plainButton";
import GradientBackground from "../../components/background/GradientBackground";
import { GiCardRandom } from "react-icons/gi";
import { MdDraw } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import CardSpin from "../../components/CardAnimation/CardSpin";

const HeroSection = () => {
  return (
    <GradientBackground className="relative overflow-hidden w-screen min-h-[400px] pb-5 md:h-80 px-6 md:px-10 pt-12 md:pt-16">
      {/* CARD WHEEL */}
      <div
        className="
          absolute
          -right-40 -top-96
          sm:-right-32 sm:-top-[320px]
          md:-right-28 md:-top-[280px]
          lg:-right-24 lg:-top-[240px]
          pointer-events-none
          scale-50 sm:scale-70 md:scale-90 lg:scale-100
          z-0
          [mask-image:linear-gradient(to_left,black,black,transparent)]
          "
      >
        <CardSpin />
      </div>

      {/* TEXT */}
      <div className="relative z-20 flex flex-col justify-center gap-6 md:gap-10">
        <div className="font-bold text-main text-3xl sm:text-4xl md:text-5xl">
          TAROT READER
        </div>

        <div className="text-main flex flex-col gap-5 font-semibold max-w-[500px]">
          <p className="text-lg">Explore tarot cards at your own pace.</p>
          <p>
            Shuffle, spread, and discover cards just like you would with a real
            deck. Whether you're curious about tarot or just starting your
            journey, this interactive experience helps you learn one card at a
            time.
          </p>
        </div>

        <div className="flex gap-3 md:gap-5 flex-wrap">
          <PlainButton
            variant="primary"
            label="Start Reading"
            icon={<GiCardRandom />}
          />
          <PlainButton
            variant="secondary"
            label="Explore Cards"
            icon={<FaSearch />}
          />
          <PlainButton
            variant="secondary"
            label="Customize Cards"
            icon={<MdDraw />}
          />
        </div>
      </div>
    </GradientBackground>
  );
};
export default HeroSection;
