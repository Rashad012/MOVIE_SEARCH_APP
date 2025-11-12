import React from "react";
import "./MovieDetails.css";

const MovieDetails = ({ movie, onBack }) => {
  if (!movie) return null;

  return (
    <div className="details-container">
      <div
        className="details-background"
        style={{
          backgroundImage: `url(${movie.Poster})`,
        }}
      ></div>

      <div className="details-content">
        <img
          className="details-poster"
          src={movie.Poster}
          alt={movie.Title}
        />
        <h1>{movie.Title}</h1>
        <p className="details-info">
          {movie.Year} • ⭐ {movie.imdbRating || "N/A"}
        </p>
        <p className="details-plot">{movie.Plot}</p>
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
