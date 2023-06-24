import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useSelector} from "react-redux";

export default function App() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    return (
        <div>
            <Header/>
            {isLoggedIn? 'sudah login' : 'belum login'}
            <main className="min-h-screen container mx-auto p-4 md:p-6">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            </main>
            <Footer/>
        </div>
    )
}