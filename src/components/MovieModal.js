import React, { useEffect, useState } from "react";
import "./MovieModal.css";

const API_KEY = 31268611; // <-- Replace with your OMDb API key

export default function MovieModal({ movie, onClose, onToggleFav, favorites = [] }) {
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    if (!movie) return;
    
    if (movie.Genre) {
      const primary = movie.Genre.split(",")[0].trim();
      (async () => {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(primary)}&type=${movie.Type || "movie"}`
          );
          const data = await res.json();
          if (data.Response === "True") {
            setSimilar(data.Search.filter((s) => s.imdbID !== movie.imdbID).slice(0, 6));
          } else {
            setSimilar([]);
          }
        } catch {
          setSimilar([]);
        }
      })();
    }
  }, [movie]);

  if (!movie) return null;

  const isFav = favorites.some((f) => f.imdbID === movie.imdbID);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✖</button>

        <div className="modal-inner">
          <img
            className="modal-poster"
            src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
            alt={movie.Title}
          />
          <div className="modal-body">
            <h2>{movie.Title}</h2>
            <p className="meta-line">{movie.Year} • {movie.Runtime || "N/A"} • {movie.Genre || "N/A"}</p>
            <p><strong>Director:</strong> {movie.Director || "N/A"}</p>
            <p><strong>Actors:</strong> {movie.Actors || "N/A"}</p>
            <p><strong>IMDb Rating:</strong> {movie.imdbRating || "N/A"}</p>
            <p className="plot">{movie.Plot || "No plot available."}</p>

            <div className="modal-actions">
              <button
                className={`action-fav ${isFav ? "remove" : "add"}`}
                onClick={() => onToggleFav(movie)}
              >
                {isFav ? "💔 Remove Favorite" : "❤️ Add to Favorites"}
              </button>

              <a
                className="action-trailer"
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + " trailer")}`}
                target="_blank"
                rel="noreferrer"
              >
                ▶ Watch Trailer
              </a>
            </div>

            {similar.length > 0 && (
              <>
                <h3 className="similar-title">More like this</h3>
                <div className="similar-grid">
                  {similar.map((s) => (
                    <div key={s.imdbID} className="similar-card" onClick={() => window.open(`https://www.imdb.com/title/${s.imdbID}/`, "_blank")}>
                      <img src={s.Poster !== "N/A" ? s.Poster : "https://via.placeholder.com/100x150?text=No+Image"} alt={s.Title} />
                      <p>{s.Title}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
