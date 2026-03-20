import React from "react";
import PlainButton from "../../components/buttons/PlainButton";
import { MdDraw } from "react-icons/md";

const CustomSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl flex flex-col items-center gap-6 md:gap-10 text-center">
          <div className="max-w-xl flex flex-col items-center">
            {" "}
            <div className="text-xs md:text-sm font-semibold text-secondary mb-2">
              🚧 Coming Soon
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-primary">
              🎨 Create Your Own Tarot Cards
            </h2>
            <p className="text-sm md:text-base text-main mb-4">
              Soon you'll be able to design tarot cards that feel truly yours.
              Draw directly in the app, customize layouts, or upload your own
              artwork.
            </p>
            <p className="text-sm md:text-base text-main mb-6">
              Build your personal deck and use it instantly in readings — all in
              one place.
            </p>
            <PlainButton
              variant="secondary"
              label="Coming Soon"
              icon={<MdDraw />}
            />
          </div>

          {/* PLACE HOLDER */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-[300px] md:max-w-2xl aspect-[5/3] bg-indigo-500/10 border-2 border-dashed border-indigo-500/40 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3">
              <MdDraw className="text-3xl md:text-5xl text-indigo-500/30" />
              <span className="text-xs md:text-sm font-medium text-indigo-500/60 uppercase tracking-widest">
                Card Customization Preview
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSection;
