import {useState, useContext} from "react";
import {db} from "../config/firebase";
import {addDoc, collection} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";
export default function ReviewForm({movieId}: { movieId: number }) {
    const {user} = useContext(AuthContext);
    const [review, setReview] = useState("");
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (user) {
            await addDoc(collection(db, "reviews"), {movieId, review,
                userEmail: user.email, userId: user.uid});
            setReview("");
        }
    }
    return (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col items-center justify-start mt-10 bg-gray-700 rounded-lg drop-shadow-lg w-100">
            <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write a review..." className="p-2 border rounded-lg h-50 w-full"/><br/><br/>
            <button type="submit" className="bg-green-500/70 hover:bg-green-500 h-12 w-20 text-white p-2 rounded-lg">Submit</button>
        </form>
    );
}