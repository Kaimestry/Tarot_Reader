// src/screens/HomeScreen.tsx

import React from "react";
import HeroSection from "../features/home/HeroSection";
import CardSpread from "../components/CardAnimation/CardSpread";
import DemoSection from "../features/home/DemoSection";

function HomeScreen() {
  return (
    <div className="flex flex-col gap-5 ">
      <HeroSection />
      <DemoSection />
    </div>
  );
}

export default HomeScreen;
