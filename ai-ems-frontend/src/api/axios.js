import axios from "axios";

// ===========================================================================
// Local Storage Keys
// ===========================================================================

const TOKEN_KEY = "jwt_token";
const USER_ROLE_KEY = "user_role";


// ===========================================================================
// API Base URL
//
// Local development:
// VITE_API_URL is optional and falls back to localhost.
//
// Production:
// Set VITE_API_URL in Netlify, for example:
//
// VITE_API_URL=https://api.ai-ems.com/api
// ===========================================================================

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080/api";


// ===========================================================================
// Axios Instance
// ===========================================================================

const api = axios.create({

    baseURL: API_BASE_URL,

    // 60 seconds is reasonable for AI requests and slower backend operations.
    timeout: 60000,

    /*
     * Authentication is handled using:
     *
     * Authorization: Bearer <JWT>
     *
     * We are NOT using browser cookies for authentication,
     * therefore credentials are not required.
     */
    withCredentials: false,

    headers: {
        "Content-Type": "application/json",
    },
});


// ===========================================================================
// Request Interceptor
//
// Automatically attaches JWT to authenticated requests.
// ===========================================================================

api.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem(
                TOKEN_KEY
            );


        if (token) {

            config.headers =
                config.headers || {};


            config.headers.Authorization =
                `Bearer ${token}`;
        }


        return config;
    },


    (error) => {

        return Promise.reject(
            error
        );
    }
);


// ===========================================================================
// Response Interceptor
//
// Handles common HTTP errors consistently.
// ===========================================================================

api.interceptors.response.use(

    (response) => {

        return response;
    },


    (error) => {

        const status =
            error.response?.status;


        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "Something went wrong.";


        switch (status) {

            // ================================================================
            // 400 - Bad Request
            // ================================================================

            case 400:

                console.error(
                    "Bad Request:",
                    message
                );

                break;


            // ================================================================
            // 401 - Unauthorized
            //
            // Remove invalid/expired JWT and send user to login.
            // ================================================================

            case 401:

                console.error(
                    "Unauthorized:",
                    message
                );


                localStorage.removeItem(
                    TOKEN_KEY
                );


                localStorage.removeItem(
                    USER_ROLE_KEY
                );


                if (
                    !window.location.hash.includes(
                        "/login"
                    )
                ) {

                    window.location.replace(
                        "/#/login"
                    );
                }

                break;


            // ================================================================
            // 403 - Forbidden
            // ================================================================

            case 403:

                console.error(
                    "Forbidden:",
                    message
                );

                break;


            // ================================================================
            // 404 - Not Found
            // ================================================================

            case 404:

                console.error(
                    "Resource not found:",
                    message
                );

                break;


            // ================================================================
            // 409 - Conflict
            // ================================================================

            case 409:

                console.error(
                    "Conflict:",
                    message
                );

                break;


            // ================================================================
            // 429 - Too Many Requests
            // ================================================================

            case 429:

                console.error(
                    "Too many requests:",
                    message
                );

                break;


            // ================================================================
            // 500 - Internal Server Error
            // ================================================================

            case 500:

                console.error(
                    "Internal Server Error:",
                    message
                );

                break;


            // ================================================================
            // 502 / 503 / 504 - Backend / Gateway Problems
            // ================================================================

            case 502:
            case 503:
            case 504:

                console.error(
                    "Backend service unavailable:",
                    message
                );

                break;


            // ================================================================
            // Network / Unknown Error
            // ================================================================

            default:

                console.error(
                    "API Request Failed:",
                    message
                );
        }


        return Promise.reject(
            error
        );
    }
);


// ===========================================================================
// Export Axios Instance
// ===========================================================================

export default api;