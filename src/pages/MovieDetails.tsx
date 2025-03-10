import { useEffect, useState, useContext, ReactNode, lazy, Suspense } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Movie } from "./Home.tsx";
import { FavoritesContext } from "../context/FavoritesContext.tsx";
import { AuthContext } from "../context/AuthContext.tsx";
import ReviewForm from "../components/ReviewForm.tsx";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const LazyImage = lazy(() => import("../components/LazyImage"));

const MDB_API_KEY = "521b418e6b0c0227a624515e80c9288a";
const MDB_API_URL = `https://api.themoviedb.org/3/movie/`;

interface Review {
    movieId: number;
    review: string;
    userName: string;
    userId: number; // note: if your Firebase userID is a string, adjust to string
}

export default function MovieDetails() {
    const { user } = useContext(AuthContext);
    const { favorites, toggleFavorite } = useContext(FavoritesContext);

    const { id } = useParams();
    const [movie, setMovie] = useState<Movie>();
    const [reviews, setReviews] = useState<Review[]>([]);

    // 1) Fetch the movie details
    useEffect(() => {
        // If there's no valid ID, skip
        if (!id) return;

        axios
            .get(`${MDB_API_URL}${id}?api_key=${MDB_API_KEY}`)
            .then((response) => {
                setMovie(response.data);
            })
            .catch((err) => console.error("Error fetching movie:", err));
    }, [id]);

    // 2) Fetch reviews from Firestore for this movie
    useEffect(() => {
        if (!id) return;

        const fetchReviews = async () => {
            try {
                const reviewsRef = collection(db, "reviews");
                const q = query(reviewsRef, where("movieId", "==", parseInt(id)));
                const snapshot = await getDocs(q);

                const reviewsData = snapshot.docs.map((doc) => doc.data() as Review);
                setReviews(reviewsData);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        };

        fetchReviews();
    }, [id]);

    // If movie hasn’t loaded yet, show a loading message
    if (!movie) {
        return <p>Loading...</p>;
    }

    // Show the review form only if a user is logged in
    let reviewForm: ReactNode = null;
    if (user) {
        reviewForm = <ReviewForm movieId={movie.id} />;
    }

    // Build the label for the favorites button
    const favButtonLabel = favorites.has(movie.id)
        ? "Remove from Favorites"
        : "Add to Favorites";

    // Build the reviews display
    let reviewDisplay: ReactNode = null;
    if (reviews.length > 0) {
        reviewDisplay = (
            <div className="p-4">
                <h1>Reviews</h1>
                {reviews.map((r, idx) => (
                    <p className="text-right" key={idx}>
                        <strong>{r.review}</strong>
                        <br />
                        by: {r.userName}
                    </p>
                ))}
            </div>
        );
    }

    return (
        <Suspense fallback={<div className="spinner"></div>}>
            <div className="flex flex-col justify-center items-center p-4 bg-gray-900 text-white rounded-lg">
                <LazyImage
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="w-64 rounded"
                    alt={movie.title}
                />

                <h1 className="text-2xl font-bold">{movie.title}</h1>
                <p>⭐ {movie.vote_average}</p>

                <button
                    onClick={() => toggleFavorite(movie)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {favButtonLabel}
                </button>

                {reviewForm}
                <br />
                {reviewDisplay}
                <br />
            </div>
        </Suspense>
    );
}