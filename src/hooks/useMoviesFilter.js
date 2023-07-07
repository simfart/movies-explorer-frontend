import { useState, useEffect } from 'react';

export default function useMoviesFilter(movies, text, isShort) {
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    let result = movies;

    if (text) {
      result = result.filter((movie) =>
        movie.nameRU.toLowerCase().includes(text),
      );
    }

    if (isShort) {
      result = result.filter((movie) => movie.duration <= 40);
    }

    setFilteredMovies(result);
  }, [movies, isShort, text]);

  return filteredMovies;
}
