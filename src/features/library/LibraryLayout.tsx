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
    <div className="min-h-screen bg-main text-main w-full">
      <div className="max-w-7xl flex flex-col gap-5 items-center">
        <header className="flex flex-col items-center text-center">
          {headerContent}
        </header>
        <main className="w-full flex flex-col items-center">{children}</main>
      </div>
    </div>
  );
};

export default LibraryLayout;
