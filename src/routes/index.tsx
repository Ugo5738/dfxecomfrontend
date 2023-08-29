import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register, Cart, ProductDetail, Shop, Checkout, Error } from "./route";
import { Suspense } from "react";
import LoadingSpinner from "../components/loading";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Home />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "/login",
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Login />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "/register",
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Register />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "/cart",
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Cart />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "/product/:sku",
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <ProductDetail />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "/shop",
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Shop />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "/checkout",
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Checkout />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "*",
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Home />
            </Suspense>
        ),
        errorElement: <Error />,
    },
]);

export default router;
