import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: ""
};

const UpdateMovieForm = props => {
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    const movieToUpdate = props.movies.find(movie => {
      return `${movie.id}` === props.match.params.id;
    });

    console.log("movieToUpdate", movieToUpdate);

    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movies, props.match.params.id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    // if (ev.target.name === "price") {
    //   value = parseInt(value, 10);
    // }

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the movie
    axios
      .put("http://localhost:5000/api/movies/${movie.id}", movie)
      .then(res => {
        console.log(res);
        props.updateMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="string"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="string"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
        />

        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
