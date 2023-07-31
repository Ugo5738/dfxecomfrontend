import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register, Cart, Error } from "./route";
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
    {
        path: "/cart",
        element: (
            <Suspense fallback={<Loading />}>
                <Cart />
            </Suspense>
        ),
    },
]);

export default router;
