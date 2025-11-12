import React from "react";
import MovieCard from "./MovieCard";
import "./MovieGrid.css";

export default function MovieGrid({
  movies = [],
  loading,
  error,
  onOpenDetails,
  onToggleFavorite,
  favorites = [],
}) {
  if (loading) return <p className="status-text">Loading...</p>;
  if (error) return <p className="status-text">{error}</p>;
  if (!movies || movies.length === 0) return <p className="no-results">No results found.</p>;

  return (
    <div className="movie-grid">
      {movies.map((m) => (
        <MovieCard
          key={m.imdbID}
          movie={m}
          onOpenDetails={() => onOpenDetails(m.imdbID)}
          onToggleFavorite={() => onToggleFavorite(m)}
          isFav={favorites.some((f) => f.imdbID === m.imdbID)}
        />
      ))}
    </div>
  );
}
