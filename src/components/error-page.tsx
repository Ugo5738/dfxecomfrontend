import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";
import { useState } from "react";
import { ErrorPropsType } from "../utils/types";

const Error = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>(""); // Initialize errorMessage state

  // Get route error using useRouteError and cast it to ErrorPropsType
  const routerError = useRouteError() as ErrorPropsType;
  const errorRes = routerError.status;
  // Check if the route error is a response error
  if (isRouteErrorResponse(routerError)) {
    // Handle specific error cases based on HTTP status code
    if (errorRes === 404) {
      setErrorMessage("This page does not exist!");
    }

    if (errorRes === 401) {
      setErrorMessage("You are not authorized to see this");
    }

    if (errorRes === 503) {
      setErrorMessage("Looks like our API is down");
    }
  }

  // Render the error message and a button to navigate back home
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center h-screen bg-gray-100 px-8"
    >
      <h1 className="text-3xl font-bold my-8 text-black text-center">
        {errorMessage && errorMessage}
      </h1>
      <h1 className="text-3xl font-bold mb-4 text-black text-center">
        {routerError && (routerError?.statusText || routerError?.data || routerError?.message)}
      </h1>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-[#3E3FCD] focus:outline-none focus:ring-2 focus:ring-[#3E3FCD]"
        onClick={() => navigate("/")} // Navigate to the home page
      >
        Go Back Home
      </button>
    </div>
  );
};

export default Error;

/**
 * ErrorFallback Component
 *
 * This component is a fallback error component that displays a generic error message and provides options to refresh the page or navigate back home.
 *
 * @returns JSX element representing the fallback error message and options to take action.
 */
export const ErrorFallback = () => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center h-screen bg-gray-100 px-8"
    >
      <h1 className="text-3xl font-bold text-black mb-20 text-center">Something Went Wrong!</h1>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-[#3E3FCD] focus:outline-none focus:ring-2 focus:ring-[#3E3FCD]"
        onClick={() => {
          window.location.reload(); // Refresh the page
        }}
      >
        Refresh
      </button>
      <button
        className=" my-8 px-4 py-2 text-white bg-blue-500 rounded hover:bg-[#3E3FCD] focus:outline-none focus:ring-2 focus:ring-[#3E3FCD]"
        onClick={() => {
          window.location.href = "/"; // Navigate back home by changing the window's location
        }}
      >
        Go Back Home
      </button>
    </div>
  );
};
