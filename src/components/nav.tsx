import { Box } from "@chakra-ui/react";
import NavBar from "./navBar";
import MainNav from "./mainNav";

const Nav = () => {
    return (
        <Box>
            <MainNav />
            <NavBar />
        </Box>
    );
};

export default Nav;
