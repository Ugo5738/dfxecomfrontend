import { Flex, Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import WaitList from "../components/waitlist";
import MainNav from "../components/mainNav";
import NavBar from "../components/navBar";

const ProductDetail = () => {
    return (
        <Box>
            <MainNav />
            <NavBar />
            <Flex></Flex>
            <WaitList />
            <Footer />
        </Box>
    );
};

export default ProductDetail;
