import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./navBar";
import MainNav from "./mainNav";
import ScrollNav from "./scrollNav";

const Nav = () => {
    return (
        <Grid
            templateAreas={{
                base: `"dropdownNav mainNav"
                  "scrollNav scrollNav"`,
                md: `"mainNav"
                  "scrollNav"
                  "dropdownNav"`,
            }}
            gridTemplateRows={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }}
            gridTemplateColumns={{ base: "3rem 1fr", md: "1fr" }}
            gap="0"
            alignItems={{ base: "flex-end", md: "end" }}
            mb={{ base: "-1.5rem", md: "-5.5rem" }}
            w="100%"
        >
            <GridItem area={"mainNav"}>
                <MainNav />
            </GridItem>
            <GridItem area={"scrollNav"} alignSelf="baseline" w="100%">
                <ScrollNav />
            </GridItem>
            <GridItem
                area={"dropdownNav"}
                alignSelf="flex-start"
                mt={{ base: ".8rem", md: "-2.9rem" }}
            >
                <NavBar />
            </GridItem>
        </Grid>
    );
};

export default Nav;
