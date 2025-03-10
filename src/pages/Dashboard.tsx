import { useState } from "react";

export default function Dashboard() {
    // Local state to toggle dark mode on/off
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Decide which Tailwind classes to use based on dark mode
    const mainClasses = isDarkMode
        ? "min-h-screen w-full bg-gray-900 text-white"
        : "min-h-screen w-full bg-gray-100 text-black";

    return (
        <div className={mainClasses}>
            <Navbar
                isDarkMode={isDarkMode}
                onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
            />

            <main className="flex flex-col items-center justify-center px-4 py-16">
                {/* Simple "Welcome" Card */}
                <div
                    className={
                        isDarkMode
                            ? "max-w-2xl w-full bg-gray-800 rounded-lg shadow-md p-6 text-center"
                            : "max-w-2xl w-full bg-white rounded-lg shadow-md p-6 text-center"
                    }
                >
                    <h1 className="text-3xl font-extrabold mb-3">Movie Dashboard</h1>
                    <p className="mb-6">
                        Welcome! Toggle dark mode, check what's playing, or spin the roulette for a random pick.
                    </p>
                </div>

                {/* Simple "Now Playing" Section */}
                <NowPlayingSection isDarkMode={isDarkMode} />

                {/* New: Movie Roulette Section */}
                <MovieRouletteSection isDarkMode={isDarkMode} />
            </main>
        </div>
    );
}

/** NAVBAR COMPONENT */
function Navbar({
                    isDarkMode,
                    onToggleDarkMode,
                }: {
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
}) {
    return (
        <nav
            className={
                isDarkMode
                    ? "sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-gray-800 shadow-md"
                    : "sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-gray-200 shadow-md"
            }
        >
            <div className="text-xl font-bold">
                {isDarkMode ? (
                    <span className="text-white">Movie Explorer</span>
                ) : (
                    <span className="text-black">Movie Explorer</span>
                )}
            </div>

            <button
                onClick={onToggleDarkMode}
                className={
                    isDarkMode
                        ? "px-3 py-2 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600"
                        : "px-3 py-2 bg-gray-300 text-black rounded-md font-semibold hover:bg-gray-400"
                }
            >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </nav>
    );
}

/** NOW PLAYING SECTION (Placeholder data) */
function NowPlayingSection({ isDarkMode }: { isDarkMode: boolean }) {
    return (
        <section
            className={
                isDarkMode
                    ? "bg-gray-800 p-5 rounded-md text-white shadow-sm mt-8 max-w-4xl w-full"
                    : "bg-white p-5 rounded-md text-black shadow-sm mt-8 max-w-4xl w-full"
            }
        >
            <h2 className="text-2xl font-bold mb-3">Now Playing</h2>
            <div
                className={
                    isDarkMode
                        ? "flex flex-col space-y-3 text-gray-300"
                        : "flex flex-col space-y-3 text-gray-600"
                }
            >
                <p>
                    <strong>Superhero Adventures</strong> (PG-13) – 2h 10min
                </p>
                <p>
                    <strong>Romantic Escape</strong> (PG) – 1h 50min
                </p>
                <p>
                    <strong>Space Explorers</strong> (PG-13) – 2h 30min
                </p>
            </div>
        </section>
    );
}

/** MOVIE ROULETTE SECTION (Random movie suggestion) */
function MovieRouletteSection({ isDarkMode }: { isDarkMode: boolean }) {
    const [randomMovie, setRandomMovie] = useState<string | null>(null);

    // Example array of possible picks. You can use real data if you like.
    const sampleMovies = [
        "The Matrix",
        "Inception",
        "Jurassic Park",
        "Titanic",
        "Interstellar",
        "Avengers: Endgame",
    ];

    function handleRoulette() {
        const randomIndex = Math.floor(Math.random() * sampleMovies.length);
        setRandomMovie(sampleMovies[randomIndex]);
    }

    return (
        <section
            className={
                isDarkMode
                    ? "bg-gray-700 p-5 rounded-md text-white shadow-sm mt-8 max-w-4xl w-full"
                    : "bg-white p-5 rounded-md text-black shadow-sm mt-8 max-w-4xl w-full"
            }
        >
            <h2 className="text-2xl font-bold mb-3">Movie Roulette</h2>
            <p className="mb-4 text-gray-300">
                Feeling lucky? Spin the wheel for a random movie suggestion.
            </p>

            <button
                onClick={handleRoulette}
                className={
                    isDarkMode
                        ? "px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700"
                        : "px-4 py-2 bg-indigo-500 text-white rounded-md font-semibold hover:bg-indigo-600"
                }
            >
                Spin Roulette
            </button>

            {randomMovie && (
                <div className="mt-4">
                    <p className="font-semibold">Random Pick:</p>
                    <p className="text-lg">{randomMovie}</p>
                </div>
            )}
        </section>
    );
}