import React from "react";
import { useNavigate } from "react-router-dom";

interface DetailHeaderProps {
  name: string;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({ name }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 w-full px-4">
      <button
        onClick={() => navigate("/library")}
        className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:opacity-70 transition-all"
      >
        <span className="transition-transform group-hover:-translate-x-1">
          ←
        </span>
        Return to Library
      </button>
      <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-main text-center">
        {name}
      </h1>
    </div>
  );
};
