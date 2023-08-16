import { Flex, Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import WaitList from "../components/waitlist";
import MainNav from "../components/mainNav";
import NavBar from "../components/navBar";
import { useState } from "react";

const ProductDetail = () => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <Box>
            <MainNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <NavBar />
            <Flex></Flex>
            <WaitList />
            <Footer />
        </Box>
    );
};

export default ProductDetail;
