import { lazy } from "react";

const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const Register = lazy(() => import("../pages/register"));
const Cart = lazy(() => import("../pages/cart"));
const ProductDetail = lazy(() => import("../pages/productDetail"));
const Shop = lazy(() => import("../pages/shop"));
const Checkout = lazy(() => import("../pages/checkout"));
const Error = lazy(() => import("../components/error-page"));

export { Home, Login, Register, Cart, ProductDetail, Shop, Checkout, Error };
