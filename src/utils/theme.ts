import { type ThemeConfig, extendTheme, theme } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const colors = Object.freeze({
    bg: {
        main: "#EBEBF5",
        light: "#F4F4FF",
        dark: "#171923",
        nav: "#ADADD3",
    },
    brand: {
        main: "#3E3FCD",
        light: "#F7FAFC",
        dark: "#171923",
        orange: "#DF6A12",
    },
    typography: {
        dark: "#161616",
        red: "#CD0000",
    },
});

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
            color: colors.typography.dark,
            backgroundColor: "#fff",
            fontSize: "1.2rem",
        },
        a: {
            color: colors.brand.dark,
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
