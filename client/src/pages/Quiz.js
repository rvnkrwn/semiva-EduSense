import React, {useEffect, useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useSelector} from "react-redux";
import fetchDataWithToken from "../services/setAuthorization";
import Loading from "../components/Loading";

const QuizForm = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [data, setData] = useState(null);
    const [generateResponse, setGenerateResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    if (!isLoggedIn) {
        window.location.href = "/login";
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Memanggil fungsi fetchDataWithToken untuk mendapatkan data dengan token
                const response = await fetchDataWithToken(
                    "https://revank.my.id/api/user/get-user"
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
        return <Loading/>;
    }

    const initialValues = {
        prompt: "",
        code: "",
        name: "",
        description: "",
        teacher: '6497787d73de920107eeef89',
        students: data._id,
    };

    const validationSchema = Yup.object().shape({
        prompt: Yup.string().required("Prompt is required"),
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        teacher: Yup.string().required("Teacher ID is required"),
        students: Yup.string().required("Students IDs are required"),
    });

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const response = await axios.post("https://revank.my.id/api/quiz/generate", values);
            setGenerateResponse(response)
            if (response) {
                const responseElement = document.querySelector('.status');
                const paragraphElement = document.createElement('p');
                paragraphElement.setAttribute('class', 'text-green-600');
                paragraphElement.textContent = generateResponse.msg;
                responseElement.innerHTML = '';
                const waiting = responseElement.appendChild(paragraphElement);
                if (waiting){
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 3000)
                }
            }
        } catch (error) {
            console.error("Error:", error);
            const responseElement = document.querySelector('.status');
            const paragraphElement = document.createElement('p');
            paragraphElement.setAttribute('class', 'text-red-600');
            paragraphElement.textContent = error;
            responseElement.innerHTML = '';
            responseElement.appendChild(paragraphElement);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto bg-base-200 p-8 rounded" style={{maxWidth: "400px"}}>
            <h2 className="text-xl font-bold">Form Quiz Automatic Generate Questions</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className="status p-2 mt-6 mb-2 text-center"></div>
                        <div className="mt-2">
                            <label htmlFor="name">Name Quiz:</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className="w-full input input-bordered input-primary"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500"/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="prompt">Prompt:</label>
                            <br/>
                            <small className="italic">ex: 5 soal ips dan ipa</small>
                            <Field
                                as="textarea"
                                id="prompt"
                                name="prompt"
                                className="w-full input input-bordered input-primary h-32"
                                style={{resize: 'none'}}
                            />
                            <ErrorMessage name="prompt" component="div" className="text-red-500"/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="description">Description:</label>
                            <Field
                                as="textarea"
                                id="description"
                                name="description"
                                className="w-full input input-bordered input-primary h-20"
                                style={{resize: 'none'}}
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500"/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="students">Students ID:</label>
                            <Field
                                type="text"
                                id="students"
                                name="students"
                                className="w-full input input-bordered input-primary"
                                disabled={true}
                            />
                            <ErrorMessage name="students" component="div" className="text-red-500"/>
                        </div>
                        <button
                            id="submit"
                            className="bg-primary/80 hover:bg-primary text-white font-bold py-2 px-4 mt-2 rounded"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default QuizForm;
