import {useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from "../components/MovieCard.tsx";



const MDB_API_KEY = "521b418e6b0c0227a624515e80c9288a";
const MDB_API_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${MDB_API_KEY}`;

export interface Movie{
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    overview: string;
}


export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        axios.get(MDB_API_URL).then((response) => {
            setMovies(response.data.results);
        });
    }, []);
  return (

    <div className="flex bg-gray-900 w-screen h-screen items-start justify-start overflow-auto">
        <div className={' p-10 h-full'} >
            <h1 className="text-2xl text-white font-bold">Home</h1>
            <p className="text-gray-200">Welcome to your home</p>
            <div className="grid grid-cols-7 gap-4 overflow-x-auto p-4 w-full h-full">
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
    </div>
    </div>
  );
}