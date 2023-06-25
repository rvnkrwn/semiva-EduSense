import axios from "axios";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useSelector} from 'react-redux';

export default function Register() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (isLoggedIn) {
        window.location.href = '/'
    }

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    useEffect(() => {
        fetchProvinces();
    }, []);

    const fetchProvinces = async () => {
        try {
            const response = await axios.get(
                "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
            );
            setProvinces(response.data);
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
    };

    const fetchCities = async (cityId) => {
        try {
            const response = await axios.get(
                `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${cityId}.json`
            );
            setCities(response.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const fetchDistricts = async (districtsId) => {
        try {
            const response = await axios.get(
                `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${districtsId}.json`
            );
            setDistricts(response.data);
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };

    const fetchVillages = async (villagesId) => {
        try {
            const response = await axios.get(
                `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${villagesId}.json`
            );
            setVillages(response.data);
        } catch (error) {
            console.error("Error fetching villages:", error);
        }
    };

    const validationSchema = Yup.object({
        full_name: Yup.string().required("Full Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
        school: Yup.string().required("School is required"),
        province: Yup.string().required("Province is required"),
        city: Yup.string().required("City is required"),
        district: Yup.string().required("District is required"),
        village: Yup.string().required("Village is required"),
        role: Yup.string().required("Role is required"),
    });

    const formik = useFormik({
        initialValues: {
            full_name: "",
            email: "",
            password: "",
            school: "",
            province: "",
            city: "",
            district: "",
            village: "",
            role: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("https://revank.my.id/api/user/register", values);
                if (response) return window.location.href = '/login?msg=success'
            } catch (error) {
                console.error("Error registering user:", error);
            }
        },
    });

    const handleProvinceChange = (e) => {
        const selectedProvinceId = e.target.value;
        formik.setFieldValue("province", selectedProvinceId);
        fetchCities(selectedProvinceId);
        formik.setFieldValue("city", "");
        setDistricts([]);
        formik.setFieldValue("district", "");
        setVillages([]);
        formik.setFieldValue("village", "");
    };

    const handleCityChange = (e) => {
        const selectedCityId = e.target.value;
        formik.setFieldValue("city", selectedCityId);
        fetchDistricts(selectedCityId);
        formik.setFieldValue("district", "");
        setVillages([]);
        formik.setFieldValue("village", "");
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        formik.setFieldValue("district", selectedDistrictId);
        fetchVillages(selectedDistrictId);
        formik.setFieldValue("village", "");
    };

    return (
        <>
            <div className="relative flex flex-col justify-center min-h-screen p-3 sm:p-0">
                <div className="w-full p-6 m-auto bg-base-200 rounded-md shadow-lg shadow-black/50 lg:max-w-lg">
                    <h1 className="text-3xl font-semibold text-center text-purple-700">EduSense</h1>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <h2>Account Details</h2>
                        <div>
                            <label htmlFor="full_name" className="label">
                                <span className="text-base label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                placeholder="Full Name"
                                {...formik.getFieldProps("full_name")}
                                className={`w-full input input-bordered input-primary ${
                                    formik.touched.full_name && formik.errors.full_name ? "input-error" : ""
                                }`}
                            />
                            {formik.touched.full_name && formik.errors.full_name && (
                                <div className="text-xs text-red-600">{formik.errors.full_name}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email" className="label">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email Address"
                                {...formik.getFieldProps("email")}
                                className={`w-full input input-bordered input-primary ${
                                    formik.touched.email && formik.errors.email ? "input-error" : ""
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
                                {...formik.getFieldProps("password")}
                                className={`w-full input input-bordered input-primary ${
                                    formik.touched.password && formik.errors.password ? "input-error" : ""
                                }`}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-xs text-red-600">{formik.errors.password}</div>
                            )}
                        </div>

                        <h2>User Details</h2>
                        <div>
                            <label htmlFor="province" className="label">
                                <span className="text-base label-text">Province</span>
                            </label>
                            <select
                                id="province"
                                className={`w-full input input-bordered input-primary ${
                                    formik.touched.province && formik.errors.province ? "input-error" : ""
                                }`}
                                value={formik.values.province}
                                onChange={handleProvinceChange}
                            >
                                <option value="">Select Province</option>
                                {provinces.map((province) => (
                                    <option key={province.id} value={province.id}>
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.province && formik.errors.province && (
                                <div className="text-xs text-red-600">{formik.errors.province}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="city" className="label">
                                <span className="text-base label-text">City</span>
                            </label>
                            <select
                                id="city"
                                className={`w-full input input-bordered input-primary ${
                                    formik.touched.city && formik.errors.city ? "input-error" : ""
                                }`}
                                value={formik.values.city}
                                onChange={handleCityChange}
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.city && formik.errors.city && (
                                <div className="text-xs text-red-600">{formik.errors.city}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="district" className="label">
                                <span className="text-base label-text">District</span>
                            </label>
                            <select
                                id="district"
                                className={`w-full input input-bordered input-primary ${
                                    formik.touched.district && formik.errors.district ? "input-error" : ""
                                }`}
                                value={formik.values.district}
                                onChange={handleDistrictChange}
                            >
                                <option value="">Select District</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.id}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.district && formik.errors.district && (
                                <div className="text-xs text-red-600">{formik.errors.district}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="village" className="label">
                                <span className="text-base label-text">Village</span>
                            </label>
                            <select
                                id="village"
                                className={`w-full input input-bordered input-primary ${
                                    formik.touched.village && formik.errors.village ? "input-error" : ""
                                }`}
                                value={formik.values.village}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select Village</option>
                                {villages.map((village) => (
                                    <option key={village.id} value={village.id}>
                                        {village.name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.village && formik.errors.village && (
                                <div className="text-xs text-red-600">{formik.errors.village}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="school" className="label">
                                <span className="text-base label-text">School</span>
                            </label>
                            <input
                                type="text"
                                id="school"
                                placeholder="School"
                                {...formik.getFieldProps("school")}
                                className={`w-full input input-bordered input-primary ${
                                    formik.touched.school && formik.errors.school ? "input-error" : ""
                                }`}
                            />
                            {formik.touched.school && formik.errors.school && (
                                <div className="text-xs text-red-600">{formik.errors.school}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="role" className="label">
                                <span className="text-base label-text">Role</span>
                            </label>
                            <select
                                id="role"
                                className={`w-full input input-bordered input-primary ${
                                    formik.touched.role && formik.errors.role ? "input-error" : ""
                                }`}
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select Role</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                            {formik.touched.role && formik.errors.role && (
                                <div className="text-xs text-red-600">{formik.errors.role}</div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
