import { CSSProperties, memo } from "react";
import { FormControl, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react'
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { LoginFormType, SignUpFormType } from "../utils/schema";

type FormErrors<T> = T extends LoginFormType
    ? FieldErrors<LoginFormType>
    : T extends SignUpFormType
    ? FieldErrors<SignUpFormType>
    : never;

type StringKeys<T> = Extract<keyof T, string>;

interface InputType<T extends LoginFormType | SignUpFormType> extends InputProps {
    label?: string;
    name: StringKeys<T>;
    placeholder?: string;
    type: string;
    register: UseFormRegister<T>;
    errors?: FormErrors<T>;
    autoComplete?: string;
    disabled?: boolean;
    width?: string;
    style?: CSSProperties;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AppInput = memo(
    ({
        label,
        name,
        placeholder,
        type,
        register,
        errors,
        disabled,
        width = "100%",
        autoComplete,
        ...props
    }: InputType<LoginFormType | SignUpFormType>) => {
        return (
            <FormControl className="flex flex-col gap-1 mb-8">
                {label && (
                    <FormLabel
                        htmlFor={name}
                    >
                        {label}
                    </FormLabel>
                )}
                <Input
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    isDisabled={disabled}
                    width={width}
                    height="4.5rem"
                    padding="2rem"
                    fontSize="2rem"
                    autoSave="true"
                    autoCorrect="on"
                    spellCheck="true"
                    _placeholder={{ color: "gray.400", fontSize: "1.25rem", verticalAlign: "middle" }}
                    {...register(name, {
                        required: true,
                        ...(type === "password" && {
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                        }),
                        ...(type === "email" && {
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Invalid email address",
                            },
                        }),
                    })}
                    {...props}
                />
                {errors?.[name] && (
                    <FormHelperText role="alert" color={"red"}>
                        {errors[name]?.message}
                    </FormHelperText>
                )}

            </FormControl>
        );
    },
);

AppInput.displayName = "AppInput";

export default AppInput;