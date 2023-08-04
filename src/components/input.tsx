import { CSSProperties, forwardRef } from "react";
import { FormControl, FormHelperText, FormLabel, Input, InputProps } from "@chakra-ui/react";
import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { LoginFormType, SignUpFormType, CheckoutType } from "../utils/types";

interface CustomPhoneInputProps {
    value?: string | number | readonly string[];
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

type FormRegisterType<T extends FieldValues> = UseFormRegister<T>;
type FormErrorsType<T extends FieldValues> = FieldErrors<T>;
type StringKeys<T> = Path<T>;

type InputType<T extends FieldValues> = Omit<InputProps, "name" | "register" | "errors"> & {
    label?: string;
    name: StringKeys<T>;
    type: string;
    register: FormRegisterType<T>;
    errors: FormErrorsType<T>;
    autoComplete?: string;
    disabled?: boolean;
    width?: string;
    style?: CSSProperties;
    value?: string;
};

const AppInput = <T extends SignUpFormType | LoginFormType | CheckoutType>({
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
}: InputType<T>) => {
    return (
        <FormControl className="flex flex-col gap-1 mb-8" maxHeight="8rem">
            {label && (
                <FormLabel htmlFor={name} color="bg.opaque" fontSize="1.5rem">
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
                height={{ base: "3.5rem", sm: "4.5" }}
                padding={{ base: "1rem", sm: "2rem" }}
                fontSize="1.5rem"
                autoSave="true"
                autoCorrect="on"
                spellCheck="true"
                isInvalid={errors?.[name]?.message ? true : false}
                errorBorderColor="red.300"
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
            {errors?.[name as string] && (
                <FormHelperText role="alert" color={"red"} fontSize="1.2rem">
                    {errors[name as string]?.message}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default AppInput;

export const CustomPhoneInput = forwardRef<HTMLInputElement, CustomPhoneInputProps>(
    ({ value, onChange }, ref) => (
        <Input
            type="tel"
            name="phone"
            value={value}
            onChange={onChange}
            ref={ref}
            placeholder="Enter phone number"
            className="w-full p-4"
            height={{ base: "3.5rem", sm: "4.5" }}
            padding={{ base: "1rem", sm: "2rem" }}
            fontSize="1.5rem"
        />
    ),
);

CustomPhoneInput.displayName = CustomPhoneInput as unknown as string;
