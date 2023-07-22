import { type ThemeConfig, type CustomThemeTypings, extendTheme, theme } from "@chakra-ui/react";

interface CustomThemeType extends CustomThemeTypings, ThemeConfig {
}

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const colors = Object.freeze({
    bg: {
        main: "#EBEBF5",
        light: "#F4F4FF",
        dark: "#171923",
    },
    brand: {
        main: "#3E3FCD;",
        light: "#171923",
        dark: "#F7FAFC",
        orange: "#DF6A12",
    },
    typography: {
        light: "#171923",
        dark: "#161616",
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
            color: colors.typography.dark,
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

const customTheme: CustomThemeType = extendTheme({
    config,
    colors,
    breakPoints,
    fontWeight,
    styles,
});

export default customTheme;
