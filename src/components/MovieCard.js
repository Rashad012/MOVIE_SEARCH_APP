import React from "react";
import "./MovieCard.css";

export default function MovieCard({ movie, onOpenDetails, onToggleFavorite, isFav }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="movie-card">
      <div className="poster-wrap" onClick={onOpenDetails}>
        <img src={poster} alt={movie.Title} className="poster-img" />
      </div>

      <div className="movie-meta">
        <div className="meta-left">
          <h4 className="title">{movie.Title}</h4>
          <p className="year">{movie.Year}</p>
        </div>
        <button
          className={`fav-btn ${isFav ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          {isFav ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
}
