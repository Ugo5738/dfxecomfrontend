import { CSSProperties, forwardRef } from "react";
import { FormControl, FormHelperText, FormLabel, Input, InputProps } from "@chakra-ui/react";
import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { LoginFormType, SignUpFormType, CheckoutType } from "../utils/types";

// Define the props for the CustomPhoneInput component
interface CustomPhoneInputProps {
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

// Define types for form registration and errors
type FormRegisterType<T extends FieldValues> = UseFormRegister<T>;
type FormErrorsType<T extends FieldValues> = FieldErrors<T>;
type StringKeys<T> = Path<T>;

// Define the input component's props
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

// Define the AppInput component
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
      {/* Render the label if provided */}
      {label && (
        <FormLabel htmlFor={name} color="bg.opaque" fontSize="1.5rem">
          {label}
        </FormLabel>
      )}
      {/* Render the input element */}
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
        border="1px solid #161616"
        _placeholder={{ color: "bg.opaque", fontSize: "1.25rem", verticalAlign: "middle" }}
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
      {/* Render error message if there are errors */}
      {errors?.[name as string] && (
        <FormHelperText role="alert" color={"red"} fontSize="1.2rem">
          {errors[name as string]?.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default AppInput;

// Define the CustomPhoneInput component as a forwardRef component
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
      border="1px solid #161616"
      ml=".5rem"
      w="full"
      height={{ base: "3.5rem", sm: "4.5" }}
      padding={{ base: "1rem", sm: "2rem" }}
      fontSize="1.5rem"
    />
  ),
);

// Set a display name for CustomPhoneInput
CustomPhoneInput.displayName = CustomPhoneInput as unknown as string;
