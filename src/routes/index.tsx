import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register, Cart, ProductDetail, Shop, Error } from "./route";
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
    {
        path: "/product-detail",
        element: (
            <Suspense fallback={<Loading />}>
                <ProductDetail />
            </Suspense>
        ),
    },
    {
        path: "/shop",
        element: (
            <Suspense fallback={<Loading />}>
                <Shop />
            </Suspense>
        ),
    },
]);

export default router;
