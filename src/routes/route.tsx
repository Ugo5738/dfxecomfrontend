import { lazy } from "react";

const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const Register = lazy(() => import("../pages/register"));
const Cart = lazy(() => import("../pages/cart"));
const Error = lazy(() => import("../components/error-page"));

export { Home, Login, Register, Cart, Error };
