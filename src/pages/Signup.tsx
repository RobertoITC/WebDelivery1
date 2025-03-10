import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config/firebase";
import {useNavigate} from "react-router-dom";
export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        try {
            const resp = await createUserWithEmailAndPassword(auth,
                email, password);
            alert(`User ${email} created!`);
            navigate('/dashboard');
            return resp.user.uid
        } catch (e) {
            alert((e as Error).message)
        }
    }
    return (
        <div className={'bg-gray-200 h-screen flex flex-col items-center justify-start bg-sky-800 h-screen'}>
        <form onSubmit={handleSignup} className="p-4 flex flex-col items-center justify-center gap-4 mt-10 bg-gray-600 rounded-lg border drop-shadow-lg ">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded-lg bg-gray-200"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded-lg bg-gray-200"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 border border-black/70">Sign Up</button>
        </form>
        </div>
    );
}