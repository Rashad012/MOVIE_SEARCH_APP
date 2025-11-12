import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MovieGrid from "./components/MovieGrid";
import Favorites from "./components/Favorites";
import MovieModal from "./components/MovieModal";
import "./App.css";

const API_KEY = 31268611; // <-- Replace with your OMDb API key

export default function App() {
  const [activeTab, setActiveTab] = useState("movies"); 
  const [theme, setTheme] = useState("dark"); 
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); 

  
  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavs);
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);


  useEffect(() => {
    if (!query || query.trim() === "") {
      setResults([]);
      setError("");
      return;
    }
    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const type = activeTab === "series" ? "series" : "movie";
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          query
        )}&type=${type}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.Response === "True") {
          setResults(data.Search);
        } else {
          setResults([]);
          setError(data.Error || "No results found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch. Check your network or API key.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, activeTab]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleSearch = (q) => {
    setQuery(q);
    
  };

  const toggleFavorite = (item) => {
    const exists = favorites.some((f) => f.imdbID === item.imdbID);
    if (exists) {
      setFavorites((prev) => prev.filter((f) => f.imdbID !== item.imdbID));
    } else {
      setFavorites((prev) => [item, ...prev]);
    }
  };

  
  const openDetails = async (imdbID) => {
    if (!imdbID) return;
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await res.json();
      if (data && data.Response === "True") {
        setSelectedMovie(data);
      } else {
        setSelectedMovie({ Title: "Details not available", Plot: data.Error || "" });
      }
    } catch (err) {
      console.error(err);
      setSelectedMovie({ Title: "Error", Plot: "Failed to fetch details." });
    }
  };

  const closeDetails = () => setSelectedMovie(null);

  return (
    <div className={`app ${theme}`}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        onSearch={handleSearch}
      />

      <main className="main-content">
        {activeTab === "movies" || activeTab === "series" ? (
          <MovieGrid
            movies={results}
            loading={loading}
            error={error}
            onOpenDetails={openDetails}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        ) : activeTab === "favorites" ? (
          <Favorites
            favorites={favorites}
            onOpenDetails={openDetails}
            onToggleFavorite={toggleFavorite}
          />
        ) : null}
      </main>

      <MovieModal
        movie={selectedMovie}
        onClose={closeDetails}
        onToggleFav={(m) => {
          if (m) toggleFavorite(m);
        }}
        favorites={favorites}
      />
    </div>
  );
}
