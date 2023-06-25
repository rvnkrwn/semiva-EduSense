import {useEffect, useState} from "react";
import axios from "axios";

export default function QuizDetail() {
    const [id, setId] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/quiz/6497f71fec22b0582382ebd9" // Ganti dengan URL API yang sesuai
                );
                setQuiz(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching quiz:", error);
            }
        };

        fetchQuiz();
    }, []);

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get('http://localhost:3000/api/user/get-user',{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setId(user.data._id);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        getUser();
    })
    const handleSubmit = async () => {
        const payload = Object.entries(selectedAnswers).map(([questionId, answer]) => ({questionId, answer}));
        const response = await axios.post(`http://localhost:3000/api/quiz/submit/${id}/${quiz._id}`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        console.log(response)
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{quiz.name}</h1>
            <p>{quiz.description}</p>
            <h2>Questions:</h2>
            <form>
                {quiz.questions.map((question) => (
                    <div key={question._id}>
                        <h3>{question.question}</h3>
                        <ul>
                            {question.options.map((option) => (
                                <li key={option}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name={`question-${question._id}`}
                                            value={option}
                                            checked={selectedAnswers[question._id] === option}
                                            onChange={(e) =>
                                                handleAnswerChange(question._id, e.target.value)
                                            }
                                        />
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
