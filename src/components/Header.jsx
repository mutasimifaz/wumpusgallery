import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "./Toast.jsx";
import Icon from "./Icon.jsx";

export default function Header() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === "dark" ||
    (!document.documentElement.dataset.theme && window.matchMedia?.("(prefers-color-scheme: dark)").matches));
  const toast = useToast();
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  const flip = () => {
    const next = !dark;
    setDark(next);
    try { localStorage.setItem("ww-theme", next ? "dark" : "light"); } catch { /* ignore */ }
    toast(next ? "Lights out!" : "Rise and shine!", next ? "moon" : "sun");
  };
  return (
    <header className="header">
      <Link to="/" className="brand" aria-label="Wumpus Gallery home">
        <span className="brand-face"><img src="/logo.png" alt="" width="40" height="40" /></span>
        <span className="brand-text">Wumpus<b>Gallery</b></span>
      </Link>
      <nav>
        <NavLink to="/" end>Gallery</NavLink>
        <NavLink to="/about">About</NavLink>
        <button className="theme-btn" onClick={flip} aria-label="Toggle dark mode" title="Toggle dark mode">
          <Icon name={dark ? "sun" : "moon"} size="1.3em" />
        </button>
      </nav>
    </header>
  );
}
