import { useNavigate } from "react-router-dom";
import { ErrorPropsType } from "../utils/types";

interface Error404Props {
    error: ErrorPropsType; // Define the prop type
}

const Error404 = ({ error }: Error404Props) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-8">
            <h1 className="text-3xl font-bold my-8 text-black text-center">Something Went Wrong</h1>
            <h1 className="text-3xl font-bold mb-4 text-black text-center">
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

export default Error404;
