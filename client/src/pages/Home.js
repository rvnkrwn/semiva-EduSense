import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import fetchDataWithToken from "../services/setAuthorization";
import Loading from "../components/Loading";

export default function Home() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    if (!isLoggedIn) {
        window.location.href = "/login";
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call fetchDataWithToken function to get data with token
                const response = await fetchDataWithToken(
                    "http://localhost:3000/api/user/get-user"
                );

                // Save data to component state
                setData(response);
                if (response) {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <>
                <Loading/>
            </>
        );
    }

    // Get the first 3 quizzes from the data
    const quizzes = data.quizResults.slice(0, 3);

    return (
        <>
            <div className="contain md:bg-base-200 p-4 md:rounded-2xl">
                <div className="titile-contain flex justify-between p-4 mb-4 border-b">
                    <h1 className="text-xl md:text-2xl">List Quizzes</h1>
                    <Link to={"/"} className="text-sm self-center">
                        Lihat Semua
                    </Link>
                </div>
                <div className="cards p-2 flex flex-wrap justify-center md:justify-start">
                    {quizzes.length > 0 ? (
                        quizzes.map((quiz) => (
                            <Link to={`/quiz/${quiz.id}`} key={quiz.id}>
                                <div className="card w-72 bg-base-100 shadow-xl m-2">
                                    <figure className="h-60">
                                        <img
                                            src={
                                                "https://images.unsplash.com/photo-1687591222784-41b886039512?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                                            }
                                            alt="Shoes"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {quiz.name}
                                            <div className="badge badge-secondary">class</div>
                                        </h2>
                                        <p>{quiz.description}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-outline">Mapel Wajib</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="w-full text-center p-4">
                            <p>No quizzes available.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
