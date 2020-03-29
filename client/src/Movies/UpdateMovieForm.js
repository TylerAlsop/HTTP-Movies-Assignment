import React, { useState, useEffect } from "react";
import axios from "axios";


function UpdateMovieForm (props) {
    const [updatedMovie, setUpdatedMovie] = useState({
        title: "",
        director: "",
        metascore: null,
        stars: []
    })

    const { match, movies } = props;

    console.log("props in UPdateMoveForm", props)

    useEffect(() => {
        const id = match.params.id;

        const movieById = movies.find(item => `${item.id}` === id)



        // const movieToUpdate = movies.find(movie =>
        //     `${movie.id}` === id);

        console.log("movies in UpdateMovieForm", movies);

        if (movieById) {
        setUpdatedMovie(movieById);
        }
    }, [match.params.id, movies]);

    const changeHandler = e => {
        // ev.persist();
        // let value = ev.target.value;
        // if (ev.target.name === "price") {
        //   value = parseInt(value, 10);
        // }

        setUpdatedMovie({
        ...updatedMovie,
        [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the movie
        axios
        .put(`http://localhost:5000/api/movies/${props.match.params.id}`, updatedMovie)
        .then(res => {
            console.log(res);
            props.getMovieList()
            props.history.push(`/movies/${props.match.params.id}`)
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
                value={updatedMovie.title}
                placeholder="Title"
                onChange={changeHandler}
                />
                {/* <div className="baseline" /> */}

                <input
                type="text"
                name="director"
                value={updatedMovie.director}
                placeholder="Director"
                onChange={changeHandler}
                />
                {/* <div className="baseline" /> */}

                <input
                type="text"
                name="metascore"
                value={updatedMovie.metascore}
                placeholder="Metascore"
                onChange={changeHandler}
                />
                {/* <div className="baseline" /> */}

                {/* <input
                type="string"
                name="stars"
                onChange={changeHandler}
                placeholder="Stars"
                value={movie.stars}
                /> */}

                {/* <div className="baseline" /> */}

                <button className="md-button form-button">Update</button>
            </form>
        </div>
    )
}

export default UpdateMovieForm;
