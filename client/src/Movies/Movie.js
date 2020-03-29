import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, NavLink, Link } from 'react-router-dom';

import MovieCard from './MovieCard';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log("Res from fetchMovie in Movie.js", res)
        setMovie(res.data)
      })
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Add To Saved Movies
      </div>
        <Link className='update-button' to="/update-movie/:id">Update Movie Info</Link>
    </div>
  );
}

export default Movie;
