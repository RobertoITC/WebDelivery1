import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setUsername(docSnap.data().username);
                    setBio(docSnap.data().bio);
                }
            });
        }
    }, [user]);

    async function handleSave() {
        if (user) {
            try {
                await setDoc(doc(db, "users", user.uid), {
                    username: username,
                    bio: bio,
                });
                alert("Profile Updated!");
                navigate("/profile");
            } catch (e) {
                alert((e as Error).message);
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-800 rounded shadow-lg p-6">
                <h1 className="text-3xl font-bold text-white mb-6">Edit Profile</h1>

                <label className="block text-gray-200 mb-2">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full p-2 mb-4 rounded border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-200 mb-2">Bio:</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                    className="w-full p-2 mb-4 rounded border border-gray-700 bg-gray-700 text-white h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Save
                </button>
            </div>
        </div>
    );
}