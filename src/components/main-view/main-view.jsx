import { useState, useEffect, useMemo } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

    useEffect(() => {
      fetch("https://gleansdb01.herokuapp.com/")
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.docs.map((doc) => {
            return {
              id: doc.key,
              title: doc.title,
              //image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,//
              author: doc.author_name?.[0],
            };
          });

          setMovies(moviesFromApi);
        });
    }, []);


    
  if (selectedMovie) {
    return ( 
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
        key={movie.id} 
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(movie);
         }}
        />
      ))}
    </div>
  );
};