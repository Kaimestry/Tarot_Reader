import React from "react";

type GradientBackgroundProps = {
  children: React.ReactNode;
  className?: string;
};

const GradientBackground = ({
  children,
  className,
}: GradientBackgroundProps) => {
  return (
    <div className={`bg-theme-gradient ${className ?? ""}`}>{children}</div>
  );
};

export default GradientBackground;
