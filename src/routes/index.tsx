import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register, Cart, ProductDetail, Shop, Checkout, Error } from "./route";
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
        errorElement: <Error />,
    },
    {
        path: "/register",
        element: (
            <Suspense fallback={<Loading />}>
                <Register />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "/cart",
        element: (
            <Suspense fallback={<Loading />}>
                <Cart />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "/product-detail",
        element: (
            <Suspense fallback={<Loading />}>
                <ProductDetail />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "/shop",
        element: (
            <Suspense fallback={<Loading />}>
                <Shop />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "/checkout",
        element: (
            <Suspense fallback={<Loading />}>
                <Checkout />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "*",
        element: (
            <Suspense fallback={<Loading />}>
                <Home />
            </Suspense>
        ),
        errorElement: <Error />,
    },
]);

export default router;
