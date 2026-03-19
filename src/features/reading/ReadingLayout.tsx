import React from "react";
import { CardDeckConfig } from "../../config/CardDeckConfig";

interface LayoutProps {
  phaseName: string;
  phaseInstruction?: string; // new optional field
  mainContent: React.ReactNode;
  leftTop?: React.ReactNode;
  rightTop?: React.ReactNode;
  footerButtons?: React.ReactNode;
}

const ReadingLayout: React.FC<LayoutProps> = ({
  phaseName,
  phaseInstruction,
  mainContent,
  leftTop,
  rightTop,
  footerButtons,
}) => {
  return (
    <div className="text-main flex flex-col min-h-[85vh] px-5 box-border">
      {/* Top Row */}
      <div className="flex items-center mb-5 gap-4">
        {/* Left Top - Deck */}
        <div className="flex-shrink-0 p-1 border-2 border-muted rounded-lg">
          {leftTop}
        </div>
        {/* Phase Name + Instruction */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h2 className="text-lg sm:text-xl text-primary font-semibold leading-tight m-0">
            {phaseName}
          </h2>
          {phaseInstruction && (
            <p className="text-sm sm:text-base text-muted mt-1">
              {phaseInstruction}
            </p>
          )}
        </div>

        {/* Right Top */}
        <div className="hidden sm:flex flex-shrink-0 w-20 sm:w-24 h-28 sm:h-36">
          {rightTop}
        </div>
      </div>
      {/* Main View */}
      <div className="flex-1 mb-5 border-2 border-dashed border-primary rounded-lg min-h-[300px] flex items-center justify-center bg-main">
        {mainContent}
      </div>

      {/* Footer */}
      <div className="flex justify-center gap-5 flex-wrap">{footerButtons}</div>
    </div>
  );
};

export default ReadingLayout;
