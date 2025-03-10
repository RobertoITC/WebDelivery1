import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import MovieDetails from "./pages/MovieDetails.tsx";
import Favorites from "./pages/Favorites.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Login from "./pages/Login.tsx";
import Singup from "./pages/Signup.tsx";


export default function App(){
    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/movie/:id" element={<MovieDetails/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
                <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                <Route path="/favorites" element={<Favorites/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Singup/>}/>
            </Routes>

        </div>
    );
}