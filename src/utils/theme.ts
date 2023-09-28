import { extendTheme, theme } from "@chakra-ui/react";

const colors = {
    bg: {
        main: "#EBEBF5",
        light: "#F4F4FF",
        dark: "#171923",
        nav: "#ADADD3",
        opaque: "#88888880",
        blue: "#0D0D2E",
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
        ash: "#9F9F9F",
    },
    shadow: {
        main: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
    },
};

const breakpoints = {
    ...theme.breakpoints,
    xs: "320px",
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
    "2xl": "1440px",
};

const fonts = {
    body: "'Lato', sans-serif",
    heading: "'Raleway', sans-serif",
};

const fontWeights = {
    ...theme.fontWeights,
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extrabold: 800,
};

const styles = {
    global: {
        html: {
            scrollBehavior: "smooth",
            fontSize: "65%",
        },
        body: {
            color: colors.typography.dark,
            backgroundColor: "#fff",
            fontSize: "1.2rem",
            fontFamily: "'Lato', sans-serif",
        },
        // styles for the `a`
        a: {
            color: colors.brand.dark,
        },
        "*, *::before, *::after": {
            margin: "0",
            padding: "0",
            boxSizing: "border-box",
        },
    },
};

const customTheme = extendTheme({
    colors,
    breakpoints,
    fonts,
    fontWeights,
    styles,
});

export default customTheme;
