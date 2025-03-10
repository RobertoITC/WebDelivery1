import {FavoritesContext} from "../context/FavoritesContext.tsx";
import MovieCard from "../components/MovieCard";
import {useContext} from "react";

export default function Favorites(){
    const { favorites } = useContext(FavoritesContext);
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-600 h-screen ">
            {Array.from(favorites.values()).map((movie) => (
                <MovieCard
                    id={movie.id}
                    title={movie.title}
                    poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={movie.vote_average}
                    key={movie.id}
                />
            ))}
        </div>
    );
}