import React from "react";

export const CardVisual: React.FC<{ image: string; name: string }> = ({
  image,
  name,
}) => (
  <div className="w-full md:w-1/2 flex justify-center md:sticky md:top-24">
    <div className="relative group">
      <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl opacity-50"></div>
      <img
        src={image}
        alt={name}
        className="relative w-full max-w-[200px] rounded-xl shadow-2xl"
      />
    </div>
  </div>
);
