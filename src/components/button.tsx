/**
 * AppButton Component
 *
 * This component creates a customizable button using Chakra UI's Button component.
 * It can be used as a regular button or a link to a different route using React Router's Link component.
 *
 * @param {object} props - The component's properties.
 * @param {ReactNode} props.children - The content to be displayed inside the button.
 * @param {string} props.type - The type of the button (button, submit, reset).
 * @param {string} props.variant - The visual style of the button (primary, secondary, tertiary, outline, dark).
 * @param {string} props.width - The width of the button.
 * @param {string} props.height - The height of the button.
 * @param {string} props.bRadius - The border radius of the button.
 * @param {boolean} props.loading - Whether the button should display a loading spinner.
 * @param {boolean} props.disabled - Whether the button should be disabled.
 * @param {string} props.to - The route to navigate to if the button acts as a link.
 * @param {CSSProperties} props.style - Additional inline CSS styles for the button.
 * @param {LinkProps} props - Additional properties for the Link component when the button acts as a link.
 *
 * @returns JSX element representing the customizable button.
 */
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
