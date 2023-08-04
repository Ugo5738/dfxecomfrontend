import { object, string, ref, number, ObjectSchema } from "yup";
import { isValidPhoneNumber, isPossiblePhoneNumber } from "react-phone-number-input";
import { CheckoutType } from "./types";
import { formatDateToMonthYear } from "./format";
// import { useCreditCardValidator } from 'react-creditcard-validator';

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

export const checkoutSchema: ObjectSchema<CheckoutType> = object({
    email: string().trim().email("Must be a valid email").required("Email is required"),
    card_number: number()
        .min(16, "Card Number should be 16 or more integers")
        .positive("Card Number should be positive")
        .integer("Card Number should be an integer")
        .required("Card number is required")
        .typeError("Input a valid card number"),
    expiry_date: string()
        .trim()
        .required("Expiry date is required")
        .test("is-valid-date", "Invalid date", (value) => {
            return formatDateToMonthYear(value) === "";
        })
        .transform((value: string) => {
            return formatDateToMonthYear(value);
        }),
    cvv: number()
        .min(3, "CVV should be 3 integers")
        .max(999, "CVV should be 3 integers")
        .positive()
        .integer()
        .required("CVV is required")
        .typeError("Input a valid CVV"),
    promo_code: string().trim(),
}).required();
