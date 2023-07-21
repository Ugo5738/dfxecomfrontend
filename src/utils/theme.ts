import { type ThemeConfig, extendTheme, theme } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const colors = Object.freeze({
    bg: {
        light: "#F7FAFC",
        dark: "#171923",
    },
    brand: {
        main: "#171923",
        light: "#171923",
        dark: "#F7FAFC",
    },
    typography: {
        main: "#171923",
        light: "#171923",
        dark: "#F7FAFC",
    },
})


const breakPoints = Object.freeze({
    xs: "320px",
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
    "2xl": "1440px",
});

const fontWeight = Object.freeze({
    ...theme.fontWeights,
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extrabold: 800,
});

const styles = Object.freeze({
    global: {
        html: {
            scrollBehavior: "smooth",
            fontSize: "65%",
        },
        body: {
            color: colors.typography.main,
            backgroundColor: colors.bg.light,
            fontSize: "1.2rem",
            lineHeight: 1.6,
        },
        a: {
            color: colors.brand.dark,
            _hover: {
                textDecoration: "underline",
            },
        },
        "*, *::before, *::after": {
            margin: "0",
            padding: "0",
            boxSizing: "border-box",
        },
    },
});

const customTheme = extendTheme({
    config,
    colors,
    breakPoints,
    fontWeight,
    styles,
});

export default customTheme;
