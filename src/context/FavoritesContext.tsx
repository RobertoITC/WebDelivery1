import {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useContext,
} from "react";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "./AuthContext";
import { Movie } from "../pages/Home";

// Shape of the context's value
interface FavoritesContextProps {
    favorites: Map<number, Movie>;
    toggleFavorite: (movie: Movie) => Promise<void>;
}

export const FavoritesContext = createContext<FavoritesContextProps>({
    favorites: new Map<number, Movie>(),
    toggleFavorite: async () => {
        /* no-op by default */
    },
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState<Map<number, Movie>>(new Map());

    // Load the user's favorites from Firestore whenever the user changes (login/logout)
    useEffect(() => {
        const fetchFavorites = async () => {
            // If not logged in, clear local favorites
            if (!user) {
                setFavorites(new Map());
                return;
            }

            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
                // Create a new doc with an empty favorites array
                await setDoc(userRef, { favorites: [] });
                setFavorites(new Map());
                return;
            }

            const data = docSnap.data();
            const storedFavorites = data.favorites || []; // should be an array
            const mapFromFirestore = new Map<number, Movie>();

            storedFavorites.forEach((movie: Movie) => {
                mapFromFirestore.set(movie.id, movie);
            });

            setFavorites(mapFromFirestore);
        };

        fetchFavorites().catch((err) => {
            console.error("Error fetching favorites:", err);
            // If there's an error, you might choose to set favorites to empty
            setFavorites(new Map());
        });
    }, [user]);

    /**
     * Toggle a movie between 'favorite' and 'not favorite' in Firestore and local state.
     */
    const toggleFavorite = async (movie: Movie) => {
        // If user isn't logged in, you might show a login prompt or simply return
        if (!user) {
            console.warn("No user - cannot toggle favorite");
            return;
        }

        const userRef = doc(db, "users", user.uid);
        const isFavorite = favorites.has(movie.id);

        try {
            if (isFavorite) {
                // Remove from favorites
                await updateDoc(userRef, {
                    favorites: arrayRemove(movie),
                });
                setFavorites((prev) => {
                    const newMap = new Map(prev);
                    newMap.delete(movie.id);
                    return newMap;
                });
            } else {
                // Add to favorites
                await updateDoc(userRef, {
                    favorites: arrayUnion(movie),
                });
                setFavorites((prev) => {
                    const newMap = new Map(prev);
                    newMap.set(movie.id, movie);
                    return newMap;
                });
            }
        } catch (err) {
            console.error("Error toggling favorite:", err);
            // Optionally revert local state if the Firestore update fails
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}