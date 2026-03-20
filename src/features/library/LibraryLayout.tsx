import React, { ReactNode } from "react";

interface LibraryLayoutProps {
  children: ReactNode;
  headerContent: ReactNode;
}

const LibraryLayout: React.FC<LibraryLayoutProps> = ({
  children,
  headerContent,
}) => {
  return (
    // min-h-screen ensures the background covers the whole page
    <div className="min-h-screen bg-main text-main w-full">
      {/* mx-auto centers the container. 
          flex flex-col + items-center centers all direct children (Header, Nav, Grid) 
      */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        {/* Header: Centering the Title and SearchBar */}
        <header className="w-full flex flex-col items-center mb-12 space-y-8 text-center">
          {headerContent}
        </header>

        {/* Main: Centering the FilterBar and the Card Grid */}
        <main className="w-full flex flex-col items-center">{children}</main>
      </div>
    </div>
  );
};

export default LibraryLayout;
