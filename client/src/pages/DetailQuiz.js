import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailQuiz() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/quiz/${id}`);
                setQuiz(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bg-base-200 p-10 w-fit mx-auto rounded-xl shadow-lg">
            {quiz && (
                <>
                    <h1 className="text-center text-xl my-4">{quiz.name}</h1>
                    <p className="text-center">{quiz.description}</p>
                    {quiz.questions.map((question) => (
                        <div key={question._id} className="p-4">
                            <h3>{question.question}</h3>
                            {question.options.map((option) => (
                                <div key={option} className="p-1">
                                    <input
                                        type="radio"
                                        name={`question_${question.no}`}
                                        id={`option_${option}`}
                                        className="checkbox checkbox-xs checkbox-accent"
                                    />
                                    <label htmlFor={`option_${option}`} className="p-1 m-1">{option}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
