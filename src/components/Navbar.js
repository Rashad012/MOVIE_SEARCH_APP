import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar({ activeTab, setActiveTab, onSearch, theme, toggleTheme }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="logo">🎬 MovieHub</div>

      <ul className="nav-links">
        <li
          className={activeTab === "movies" ? "active" : ""}
          onClick={() => setActiveTab("movies")}
        >
          Movies
        </li>
        <li
          className={activeTab === "series" ? "active" : ""}
          onClick={() => setActiveTab("series")}
        >
          Series
        </li>
        <li
          className={activeTab === "favorites" ? "active" : ""}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites
        </li>
      </ul>

      <form className="nav-search" onSubmit={submit}>
        <input
          placeholder={`Search ${activeTab}...`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}
