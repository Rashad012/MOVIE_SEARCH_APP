import React from "react";
import "./Favorites.css";

export default function Favorites({ favorites = [], onOpenDetails, onToggleFavorite }) {
  if (!favorites || favorites.length === 0) {
    return <p className="no-results">No favorite items yet.</p>;
  }

  return (
    <section className="favorites-section">
      <h2>Your Favorites</h2>
      <div className="fav-grid">
        {favorites.map((m) => (
          <div key={m.imdbID} className="fav-card">
            <img
              src={m.Poster && m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/150x220?text=No+Image"}
              alt={m.Title}
              onClick={() => onOpenDetails && onOpenDetails(m.imdbID)}
            />
            <div className="fav-meta">
              <h4>{m.Title}</h4>
              <div>
                <button onClick={() => onToggleFavorite(m)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
