import {useEffect,useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard.tsx";
import {Movie} from "./Home.tsx";


const MDB_API_KEY = "521b418e6b0c0227a624515e80c9288a";
const MDB_API_URL = `https://api.themoviedb.org/3/search/movie`;


export default function Search() {
    const location = useLocation();
    const [movies, setMovies] =  useState<Movie[]>([]);
    const query = new URLSearchParams(location.search).get("q");
    useEffect(() => {
        if (query) {
            axios.get(`${MDB_API_URL}?api_key=${MDB_API_KEY}&query=${query}`).then(
                (response) => setMovies(response.data.results)
            );
        }
    }, []);

    return (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-6 p-6 bg-gray-600">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    rating={movie.vote_average}
                />
            ))}
        </div>
    );
}