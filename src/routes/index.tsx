import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register, Error } from "./route";
import { Suspense } from "react";
import Loading from "../components/loading";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<Loading />}>
                <Home />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "/login",
        element: (
            <Suspense fallback={<Loading />}>
                <Login />
            </Suspense>
        ),
    },
    {
        path: "/register",
        element: (
            <Suspense fallback={<Loading />}>
                <Register />
            </Suspense>
        ),
    },
]);

export default router;
