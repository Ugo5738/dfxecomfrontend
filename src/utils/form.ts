import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormType, signUpSchema, SignUpFormType } from "./schema";

const useLoginForm = (onSubmit: (arg0: LoginFormType) => Promise<void>) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: yupResolver(loginSchema),
    });

    const handleFormSubmit = handleSubmit(async (data) => {
        await onSubmit(data);
    });

    return {
        register,
        handleFormSubmit,
        errors,
    };
};

const useSignUpForm = (onSubmit: (arg0: SignUpFormType) => Promise<void>) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormType>({
        resolver: yupResolver(signUpSchema),
    });

    const handleFormSubmit = handleSubmit(async (data) => {
        await onSubmit(data);
    });

    return {
        register,
        handleFormSubmit,
        errors,
    };
};

export { useLoginForm, useSignUpForm };