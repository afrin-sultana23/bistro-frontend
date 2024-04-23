import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import useAuth from "./useAuth.jsx";
 // Assuming you have an AuthContext


// Create Axios instance with base URL
const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {

    const { logOut } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {

        // Add a request interceptor to inject authorization header
        axiosSecure.interceptors.request.use(
            (config) => {
                const accessToken = localStorage.getItem('access-token');
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },

        );

        // Add a response interceptor to handle 401 and 403 errors
        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logOut(); // Logout the user asynchronously
                    navigate('/login'); // Redirect to login page
                }
                return Promise.reject(error);
            }
        );

    }, [logOut,navigate]);

    return [axiosSecure];
};

export default useAxiosSecure;
