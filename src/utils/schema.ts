import { object, string, ref } from "yup";
import { isValidPhoneNumber, isPossiblePhoneNumber } from "react-phone-number-input";

export const signUpSchema = object({
    first_name: string().trim().required("Last Name is required"),
    last_name: string().trim().required("First Name is required"),
    email: string().trim().email("Email must be a valid email").required("Email is required"),
    password: string()
        .trim()
        .min(8, "Password must be a minimum of 8 characters")
        .required("Password is required"),
    confirmPassword: string()
        .trim()
        .min(8, "Password must be a minimum of 8 characters")
        .oneOf([ref("password"), undefined], "Passwords must match")
        .required("Password is required"),
    country: string().trim().required("Please select your country"),
    phone: string()
        .trim()
        .test("isValidPhone", "Invalid phone number", (value) => {
            return isValidPhoneNumber(value!);
        })
        .test("isPossibleNumber", "Invalid phone number", (value) => {
            return isPossiblePhoneNumber(value!);
        })
        .required("Phone number is required"),
}).required();

export const loginSchema = object({
    email: string().trim().email("Must be a valid email").required("Email is required"),
    password: string()
        .trim()
        .min(8, "Password must be a minimum of 8 characters")
        .required("Password is required"),
}).required();

export const forgotPasswordSchema = object({
    email: string().trim().email("Must be a valid email").required("Email is required"),
}).required();

export const resetPasswordSchema = object({
    currentPassword: string().trim().required("Current password is required"),
    password: string()
        .trim()
        .min(8, "Password must be a minimum of 8 characters")
        .required("Password is required"),
    confirmPassword: string()
        .trim()
        .min(8, "Password must be a minimum of 8 characters")
        .oneOf([ref("password"), undefined], "Passwords must match")
        .required("Password is required"),
}).required();

export interface SignUpFormType {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    phone: string;
}

export interface LoginFormType {
    email: string;
    password: string;
}
