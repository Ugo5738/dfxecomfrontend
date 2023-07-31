import { useNavigate, useRouteError } from "react-router-dom";

interface ErrorProps extends Error {
    statusText: string;
    data: string;
}

const Error = () => {
    const navigate = useNavigate();
    const error = useRouteError() as ErrorProps;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4 text-black">
                {error && (error?.statusText || error?.data)}
            </h1>
            <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={() => navigate("/")}
            >
                Go Back Home
            </button>
        </div>
    );
};

export default Error;
