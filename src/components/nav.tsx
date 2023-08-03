import { Box } from "@chakra-ui/react";
import NavBar from "./navBar";
import MainNav from "./mainNav";
import ScrollNav from "./scrollNav";

const Nav = () => {
    return (
        <Box>
            <MainNav />
            <ScrollNav />
            <NavBar />
        </Box>
    );
};

export default Nav;
