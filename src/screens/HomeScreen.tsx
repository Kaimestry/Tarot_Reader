// src/screens/HomeScreen.tsx

import React from "react";
import HeroSection from "../features/home/HeroSection";
import DemoSection from "../features/home/DemoSection";
import LibrarySection from "../features/home/LibrarySection";
import CustomSection from "../features/home/CustomSection";

function HomeScreen() {
  return (
    <div>
      {/* FULL WIDTH HERO */}
      <HeroSection />

      {/* CENTERED CONTENT */}
      <div className="flex justify-center px-6 md:px-10">
        <div className="w-full max-w-6xl flex flex-col gap-10 mb-10">
          <DemoSection />
          <LibrarySection />
          <CustomSection />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
