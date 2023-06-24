import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";

export default function App() {
    return (
        <div>
            <Header/>
            <main className="min-h-screen container mx-auto p-4 md:p-6">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/quiz" element={<Quiz/>} />
                </Routes>
            </main>
            <Footer/>
        </div>
    )
}