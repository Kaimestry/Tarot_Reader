import React from "react";
import "./ThemeToggle.css";

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <label className="ui-switch">
      <input
        type="checkbox"
        onChange={toggleTheme}
        // If checked, it shows the Moon (Dark). If unchecked, Sun (Light).
        // Adjust this logic based on which icon you want for which mode!
        checked={theme === "dark"}
      />
      <div className="slider">
        <div className="circle"></div>
      </div>
    </label>
  );
}
