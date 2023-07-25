import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaGoogle, FaLinkedin } from "react-icons/fa";
import { footerProducts, footerCompany, footerSupport } from "../utils/staticData";
const Footer = () => {
    return (
        <Flex
            as="footer"
            bg="white"
            flexDir="column"
            gap={{ base: "2rem", sm: 0 }}
            py="2rem"
            px={{ base: "1rem", sm: "2rem", md: "4rem" }}
        >
            <Flex fontSize="2.5rem" fontWeight="extrabold" mb={{ base: 0, sm: "-3rem" }}>
                <Link to="/" className="text-black">
                    DFX LOGO
                </Link>
            </Flex>
            <Flex
                justifyContent="space-between"
                gap="3rem"
                ml={{ base: 0, sm: "20rem" }}
                flexWrap={{ base: "wrap", md: "nowrap" }}
                fontWeight={600}
                color={"black"}
            >
                <Flex flexDir="column" gap="1rem">
                    <Text fontSize="1.5rem" mb="1rem">
                        Products
                    </Text>
                    {footerProducts.map((item) => (
                        <Link key={item.id} to={item.title} className="link">
                            {item.title}
                        </Link>
                    ))}
                </Flex>
                <Flex flexDir="column" gap="1rem">
                    <Text fontSize="1.5rem" mb="1rem">
                        Company
                    </Text>
                    {footerCompany.map((item) => (
                        <Link key={item.id} to={item.title} className="link">
                            {item.title}
                        </Link>
                    ))}
                </Flex>
                <Flex flexDir="column" gap="1rem">
                    <Text fontSize="1.5rem" mb="1rem">
                        Support
                    </Text>
                    {footerSupport.map((item) => (
                        <Link key={item.id} to={item.title} className="link">
                            {item.title}
                        </Link>
                    ))}
                </Flex>
                <Flex flexDir="column" gap="1rem" align={{ base: "start", md: "center" }}>
                    <Text fontSize="1.5rem" mb="1rem">
                        Follow Us
                    </Text>
                    <Flex fontSize="2rem" gap="1rem">
                        <Link to="/">
                            <FaFacebook />
                        </Link>
                        <Link to="/">
                            <FaTwitter />
                        </Link>
                        <Link to="/">
                            <FaGoogle />
                        </Link>
                        <Link to="/">
                            <FaLinkedin />
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Footer;
