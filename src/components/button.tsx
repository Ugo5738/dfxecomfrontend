/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, ButtonProps, LinkProps } from "@chakra-ui/react";
import { ReactNode, CSSProperties } from "react";
import customTheme from "../utils/theme";
import { Link } from "react-router-dom";

interface ButtonType extends ButtonProps {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "tertiary" | "outline";
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
    const { colors } = customTheme;
    return (
        <Button
            as={Link}
            to={to}
            type={type}
            variant={variant}
            width={width}
            height={height}
            borderRadius={bRadius}
            isLoading={loading}
            isDisabled={disabled}
            fontWeight={variant === "outline" ? "normal" : "bold"}
            style={style}
            fontSize="1.5rem"
            bg={
                variant === "primary"
                    ? colors.brand.orange
                    : variant === "secondary"
                    ? colors.brand.main
                    : variant === "tertiary"
                    ? colors.brand.light
                    : "transparent"
            }
            color={
                variant === "primary"
                    ? "white"
                    : variant === "secondary"
                    ? "white"
                    : variant === "tertiary"
                    ? colors.typography.dark
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
