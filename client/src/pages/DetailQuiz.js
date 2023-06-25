import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Loading from "../components/Loading";

function useQuizDetail() {
    const {id} = useParams();
    const [quiz, setQuiz] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/quiz/${id}` // Ganti dengan URL API yang sesuai
                );
                setQuiz(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setIsLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    return {quiz, isLoading};
}

export default function QuizDetail() {
    const {quiz, isLoading} = useQuizDetail();
    const [id, setId] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get("http://localhost:3000/api/user/get-user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setId(user.data._id);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        getUser();
    }, []);

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = async () => {
        const payload = Object.entries(selectedAnswers).map(([questionId, answer]) => (
            {
                questionId:questionId,
                answer:answer,
            }
        ));

        try {
            const response = await axios.post(
                `http://localhost:3000/api/quiz/submit/${id}/${quiz._id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response)
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-base-200 p-10">
            <h1>{quiz.name}</h1>
            <p>{quiz.description}</p>
            <h2>Questions:</h2>
            <form>
                {quiz.questions.map((question) => (
                    <div key={question._id} className="my-6 ">
                        <h3>{question.question}</h3>
                        <ul className="leading-loose text-lg">
                            {question.options.map((option) => (
                                <li key={option}>
                                    <label className="flex">
                                        <input
                                            type="checkbox"
                                            name={`question-${question._id}`}
                                            value={option}
                                            checked={selectedAnswers[question._id] === option}
                                            onChange={(e) =>
                                                handleAnswerChange(question._id, e.target.value)
                                            }
                                            className="mr-2 radio radio-primary radio-xs self-center"
                                        />
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <button type="button" className="btn btn-md btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
}
