import { createContext, useState, useEffect } from "react";
import {
    onAuthStateChanged,
    User,
    signOut,
    setPersistence,
    browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const AuthContext = createContext<{
    user: User | null;
    logout: () => void;
}>({
    user: null,
    logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Force session-based storage instead of localStorage (optional).
        // If localStorage is blocked in your environment, this helps avoid
        // "Access to storage is not allowed" errors.
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                // Once persistence is set, subscribe to auth state changes:
                const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                    setUser(currentUser);
                });
                return () => unsubscribe();
            })
            .catch((error) => {
                console.error("Error setting auth persistence:", error);
                // Even if persistence fails, set up onAuthStateChanged as fallback:
                const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                    setUser(currentUser);
                });
                return () => unsubscribe();
            });
    }, []);

    function logout() {
        signOut(auth).catch((err) =>
            console.error("Error signing out:", err)
        );
    }

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}