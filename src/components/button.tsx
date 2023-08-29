import { Button, ButtonProps, LinkProps } from "@chakra-ui/react";
import { ReactNode, CSSProperties } from "react";
import customTheme from "../utils/theme";
import { Link } from "react-router-dom";
import { ColorsType } from "../utils/types";

interface ColorsObjectType {
    colors: ColorsType;
}

interface ButtonType extends ButtonProps {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "tertiary" | "outline" | "dark";
    width?: string;
    height?: string;
    loading?: boolean;
    disabled?: boolean;
    style?: CSSProperties;
    bRadius?: string;
    to?: string;
}

const AppButton = ({
    children,
    type,
    variant = "primary",
    width = "100%",
    height = "4rem",
    bRadius = "2rem",
    loading,
    style,
    disabled,
    to,
    ...props
}: ButtonType & LinkProps) => {
    const { colors } = customTheme as ColorsObjectType;
    return (
        <Button
            as={to ? Link : undefined}
            to={to}
            type={type}
            variant={variant}
            width={width}
            height={height}
            borderRadius={bRadius}
            isLoading={loading}
            isDisabled={disabled}
            fontWeight="normal"
            style={style}
            fontSize="1.5rem"
            bg={
                variant === "primary"
                    ? colors.brand.orange
                    : variant === "secondary"
                    ? colors.brand.main
                    : variant === "tertiary"
                    ? colors.brand.light
                    : variant === "dark"
                    ? colors.bg.blue
                    : "transparent"
            }
            color={
                variant === "primary"
                    ? "white"
                    : variant === "secondary"
                    ? "white"
                    : variant === "tertiary"
                    ? colors.typography.dark
                    : variant === "dark"
                    ? "white"
                    : colors.typography.dark
            }
            _hover={{
                opacity: 0.8,
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default AppButton;
