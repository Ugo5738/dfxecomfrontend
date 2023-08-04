import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema, signUpSchema, checkoutSchema } from "./schema";
import { LoginFormType, SignUpFormType, CheckoutType } from "./types";

const useLoginForm = (onSubmit: (arg0: LoginFormType) => void) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: yupResolver(loginSchema),
    });

    const handleFormSubmit = handleSubmit((data) => {
        onSubmit(data);
    });

    return {
        register,
        handleFormSubmit,
        errors,
    };
};

const useSignUpForm = (onSubmit: (arg0: SignUpFormType) => void) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignUpFormType>({
        resolver: yupResolver(signUpSchema),
    });

    const handleFormSubmit = handleSubmit((data) => {
        onSubmit(data);
    });

    return {
        register,
        handleFormSubmit,
        errors,
        control,
    };
};

const useCheckoutForm = (onSubmit: (arg0: CheckoutType) => void) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        unregister,
    } = useForm<CheckoutType>({
        resolver: yupResolver(checkoutSchema),
    });

    const handleFormSubmit = handleSubmit((data) => {
        onSubmit(data);
    });

    return {
        register,
        handleFormSubmit,
        errors,
        control,
        unregister,
    };
};

export { useLoginForm, useSignUpForm, useCheckoutForm };
