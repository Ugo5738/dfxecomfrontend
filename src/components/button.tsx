import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode, CSSProperties } from "react";
// import customTheme from '../utils/theme';

interface ButtonType extends ButtonProps {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "tertiary" | "outline";
    width?: string;
    loading?: boolean;
    disabled?: boolean;
    style?: CSSProperties;
    bRadius?: string;
}

const AppButton = ({
    children,
    type,
    variant = "primary",
    width = "100%",
    bRadius = "2rem",
    loading,
    style,
    disabled,
    ...props
}: ButtonType) => {
    // const { colors } = customTheme;
    return (
        <Button
            type={type}
            variant={variant}
            width={width}
            height={variant === "outline" ? "3rem" : "4rem"}
            borderRadius={bRadius}
            isLoading={loading}
            isDisabled={disabled}
            fontWeight={variant === "outline" ? "normal" : "bold"}
            style={style}
            fontSize="1.5rem"
            color={variant === "outline" ? "primary" : "white"}
            bg={variant === "outline" ? "white" : "brand.orange"}
            // bg={
            //   variant === 'primary'
            //     ? colors.primary
            //     : variant === 'secondary'
            //       ? colors.secondary
            //       : variant === 'tertiary'
            //         ? colors.tertiary
            //         : 'transparent'
            // }
            // color={
            //   variant === 'primary'
            //     ? colors.white
            //     : variant === 'secondary'
            //       ? colors.white
            //       : variant === 'tertiary'
            //         ? colors.white
            //         : colors.primary
            // }
            _hover={{}}
            {...props}
        >
            {children}
        </Button>
    );
};

export default AppButton;
