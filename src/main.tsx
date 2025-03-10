import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            {/* AuthProvider at the top so FavoritesProvider can read `user` */}
            <AuthProvider>
                <FavoritesProvider>
                    <App />
                </FavoritesProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);