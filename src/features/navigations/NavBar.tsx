import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggle from "../../components/buttons/ThemeToggle/ThemeToggle";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Reading", path: "/reading" },
  { label: "Library", path: "/library" },
];

function NavBar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav
      className={`
    sticky top-0 z-[1000]  
    bg-main transition-all duration-300
    ${scrolled ? "border-b border-divider shadow-sm" : "border-b border-transparent"}
  `}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <div className="text-lg md:text-xl font-bold text-primary tracking-widest uppercase">
          <Link to="/">Kaimestry's Tarot</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-main font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-main"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300
          ${menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col px-4 pb-4 gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="text-main font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
