import axios from "axios";

/**
 * Local Storage Keys
 * Keep all storage keys in one place so they are easy to change later.
 */
const TOKEN_KEY = "jwt_token";
const USER_ROLE_KEY = "user_role";

/**
 * Axios Instance
 * This instance will be used throughout the application.
 */
const api = axios.create({
   baseURL:
       import.meta.env.VITE_API_URL ||
       "http://localhost:8080/api",

    timeout: 60000,

    withCredentials: true,

    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Request Interceptor
 * Runs before every request.
 * Adds JWT token automatically.
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * Runs after every response.
 * Handles common HTTP errors globally.
 */
api.interceptors.response.use(
    (response) => response,

    (error) => {

        const status = error.response?.status;

        switch (status) {

            case 400:
                console.error("Bad Request");
                break;

            case 401:
                console.error("Unauthorized. Please login again.");

                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USER_ROLE_KEY);

                if (!window.location.hash.includes("/login")) {
                    window.location.replace("/#/login");
                }

                break;

            case 403:
                console.error("Forbidden. You don't have permission.");
                break;

            case 404:
                console.error("Requested resource not found.");
                break;

            case 409:
                console.error("Conflict occurred.");
                break;

            case 500:
                console.error("Internal Server Error.");
                break;

            default:
                console.error(
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong."
                );
        }

        return Promise.reject(error);
    }
);

/**
 * Export Axios Instance
 */
export default api;