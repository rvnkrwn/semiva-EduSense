import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useSelector} from "react-redux";

const QuizForm = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (!isLoggedIn) {
        window.location.href = "/login";
    }
    const initialValues = {
        prompt: "",
        code: "",
        name: "",
        description: "",
        teacher: "",
        students: "",
    };

    const validationSchema = Yup.object().shape({
        prompt: Yup.string().required("Prompt is required"),
        code: Yup.string().required("Code is required"),
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        teacher: Yup.string().required("Teacher ID is required"),
        students: Yup.string().required("Students IDs are required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/openai/ask", values);
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto bg-base-200 p-8 rounded" style={{maxWidth: "400px"}}>
            <h2 className="text-xl font-bold">Form Quiz</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="my-2">
                            <label htmlFor="prompt">Prompt:</label>
                            <Field
                                type="text"
                                id="prompt"
                                name="prompt"
                                className="w-full input input-bordered input-primary"
                            />
                            <ErrorMessage name="prompt" component="div" className="text-red-500" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="code">Code:</label>
                            <Field
                                type="text"
                                id="code"
                                name="code"
                                className="w-full input input-bordered input-primary"
                            />
                            <ErrorMessage name="code" component="div" className="text-red-500" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="name">Name:</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className="w-full input input-bordered input-primary"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="description">Description:</label>
                            <Field
                                as="textarea"
                                id="description"
                                name="description"
                                className="w-full input input-bordered input-primary"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="teacher">Teacher:</label>
                            <Field
                                type="text"
                                id="teacher"
                                name="teacher"
                                className="w-full input input-bordered input-primary"
                            />
                            <ErrorMessage name="teacher" component="div" className="text-red-500" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="students">Students:</label>
                            <Field
                                type="text"
                                id="students"
                                name="students"
                                className="w-full input input-bordered input-primary"
                            />
                            <ErrorMessage name="students" component="div" className="text-red-500" />
                        </div>
                        <button
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
