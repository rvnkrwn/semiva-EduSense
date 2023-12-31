import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function useQuizDetail() {
    const {id} = useParams();
    const [quiz, setQuiz] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(
                    `https://revank.my.id/api/quiz/${id}` // Ganti dengan URL API yang sesuai
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
                const user = await axios.get("https://revank.my.id/api/user/get-user", {
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
                `https://revank.my.id/api/quiz/submit/${id}/${quiz._id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response){
                const responseElement = document.querySelector('.status');
                const paragraphElement = document.createElement('p');
                paragraphElement.setAttribute('class', 'text-green-600');
                paragraphElement.textContent = response.data.msg;
                responseElement.innerHTML = '';
                responseElement.appendChild(paragraphElement);
                setTimeout(() => {
                    window.location.href = '/'
                }, 3000)
            }
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-base-200 p-10 rounded-2xl shadow">
            <h1 className="text-2xl text-center">{quiz.name}</h1>
            <p className="text-center text-lg">{quiz.description}</p>
            <form>
                <div className="status p-2 mt-6 mb-2 text-center"></div>
                <h2>Questions:</h2>
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
