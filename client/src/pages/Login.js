import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { setLoggedIn } from '../actions/authActions';
import store from "../store";
export default function Login() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (isLoggedIn) {
           window.location.href = '/'
    }
    const handleMsg = (text, color) => {
        const responseElement = document.querySelector('.response');
        const paragraphElement = document.createElement('p');
        paragraphElement.setAttribute('class', color);
        paragraphElement.textContent = text;
        responseElement.innerHTML = '';
        responseElement.appendChild(paragraphElement);
    }

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
                const response = await axios.post('http://localhost:3000/api/user/login', values);
                const token = response.data.token;
                const msg = response.data.msg;
                if (token) {
                    localStorage.setItem('token', token);
                    console.log(response.data)
                    if (msg === 'successfully login') {
                        handleMsg(msg,'text-green-600')
                        store.dispatch(setLoggedIn()); // Dispatch the action to set the user as logged in
                        localStorage.setItem('isLoggedIn', 'true');
                    }
                } else {
                    handleMsg(msg,'text-red-600')
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        },
    });

    return (
        <>
            <div className="relative flex flex-col justify-center min-h-screen p-3 sm:p-0">
                <div className="w-full p-6 m-auto bg-base-200 rounded-md shadow-lg shadow-black/50 lg:max-w-lg">
                    <h1 className="text-3xl font-semibold text-center text-purple-700">EduSense</h1>
                    <div className="response text-sm text-center mt-4"></div>
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
