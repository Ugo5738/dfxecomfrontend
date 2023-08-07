import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";
import { useState } from "react";

interface ErrorProps extends Error {
    statusText: string;
    data: string;
    message: string;
    status: number;
}

const Error = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const error = useRouteError() as ErrorProps;

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            setErrorMessage("This page does not exist!");
        }

        if (error.status === 401) {
            setErrorMessage("You are not authorized to see this");
        }

        if (error.status === 503) {
            setErrorMessage("Looks like our API is down");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold my-8 text-black">{errorMessage && errorMessage}</h1>
            <h1 className="text-3xl font-bold mb-4 text-black">
                {error && (error?.statusText || error?.data || error?.message)}
            </h1>
            <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-[#3E3FCD] focus:outline-none focus:ring-2 focus:ring-[#3E3FCD]"
                onClick={() => navigate("/")}
            >
                Go Back Home
            </button>
        </div>
    );
};

export default Error;
