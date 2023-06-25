import ColorMode from "../colorMode";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import fetchDataWithToken from "../../services/setAuthorization";
import Loading from "../Loading";
import Swal from "sweetalert2";

export default function Header() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Logout!", "Your account has been logout.", "success");
                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");
                window.location.href = '/login'
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Memanggil fungsi fetchDataWithToken untuk mendapatkan data dengan token
                const response = await fetchDataWithToken(
                    "http://localhost:3000/api/user/get-user"
                );

                // Menyimpan data ke state komponen
                setData(response);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    if (isLoading) {
        return <Loading />;
    }

    const loggedInMenu = (
        <ul className="menu menu-horizontal">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/quiz">Make Quiz</Link>
            </li>
            {data && (
                <li>
                    <Link to="/profile">{data.full_name}</Link>
                </li>
            )}
            <li>
                <Link to="#" onClick={() => handleLogout()}>
                    Logout
                </Link>
            </li>
        </ul>
    );

    const loggedOutMenu = (
        <ul className="menu menu-horizontal">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </ul>
    );

    return (
        <>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block w-6 h-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2 md:text-xl tracking-wider font-bold">
                            EduSense
                        </div>
                        <div className="flex-none hidden lg:block">
                            {isLoggedIn ? loggedInMenu : loggedOutMenu}
                        </div>
                        <ColorMode />
                    </div>
                </div>
                <div className="drawer-side" style={{ zIndex: 99999 }}>
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    {isLoggedIn ? loggedInMenu : loggedOutMenu}
                </div>
            </div>
        </>
    );
}
