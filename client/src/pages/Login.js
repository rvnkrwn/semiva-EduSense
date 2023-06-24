import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

export default function Login() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://localhost:3000/api/user/login", values);
                const token = response.data.token;
               if (token){
                   localStorage.setItem('token',token)
               }
            } catch (error) {
                console.error("Error registering user:", error);
            }
        },
    });

    return (
        <>
            <div className="relative flex flex-col justify-center min-h-screen p-3 sm:p-0">
                <div className="w-full p-6 m-auto bg-base-200 rounded-md shadow-lg shadow-black/50 lg:max-w-lg">
                    <h1 className="text-3xl font-semibold text-center text-purple-700">EduSense</h1>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="label">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email Address"
                                {...formik.getFieldProps('email')}
                                className={`w-full input input-bordered input-primary ${
                                    formik.touched.email && formik.errors.email ? 'input-error' : ''
                                }`}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-xs text-red-600">{formik.errors.email}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="label">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                {...formik.getFieldProps('password')}
                                className={`w-full input input-bordered input-primary ${
                                    formik.touched.password && formik.errors.password ? 'input-error' : ''
                                }`}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-xs text-red-600">{formik.errors.password}</div>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
