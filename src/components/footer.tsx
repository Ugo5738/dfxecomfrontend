import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaGoogle, FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
        <Flex
            as="footer"
            bg="white"
            flexDir="column"
            gap={{ base: "2rem", sm: 0 }}
            position="fixed"
            bottom="0"
            left="0"
            right="0"
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
                    <Link to="/">Brands</Link>
                    <Link to="/">Smart Phones</Link>
                    <Link to="/">Laptops</Link>
                    <Link to="/">Tablets</Link>
                    <Link to="/">Smart Watches</Link>
                    <Link to="/">Head Phones</Link>
                </Flex>
                <Flex flexDir="column" gap="1rem">
                    <Text fontSize="1.5rem" mb="1rem">
                        Company
                    </Text>
                    <Link to="/">Blog</Link>
                    <Link to="/">Location</Link>
                    <Link to="/">Privacy</Link>
                    <Link to="/">Terms</Link>
                    <Link to="/">Coupons</Link>
                </Flex>
                <Flex flexDir="column" gap="1rem">
                    <Text fontSize="1.5rem" mb="1rem">
                        Support
                    </Text>
                    <Link to="/">FAQS</Link>
                    <Link to="/">Contact Info</Link>
                    <Link to="/">Shipping & Returns</Link>
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
