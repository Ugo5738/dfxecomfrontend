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
      pb="4rem"
      pt="2rem"
      // px={{ base: "1rem", sm: "2rem", md: "4rem" }}
    >
      <div className="container">
        {/* Render the DFX LOGO as a link to the homepage */}
        <Flex fontSize="3rem" fontWeight="extrabold" mb={{ base: 0, sm: "-3rem" }}>
          <Link to="/" className="text-black">
            DFX LOGO
          </Link>
        </Flex>

        {/* Create sections for Products, Company, Support, and Follow Us */}
        <Flex
          justifyContent="space-between"
          gap="3rem"
          ml={{ base: 0, sm: "20rem" }}
          flexWrap={{ base: "wrap", md: "nowrap" }}
          color={"black"}
        >
          {/* Products section */}
          <Flex flexDir="column" gap="1rem">
            <Text fontSize="2rem" mb="1rem" fontWeight={600}>
              Products
            </Text>
            {/* Render links to various product pages */}
            {footerProducts.map((item) => (
              <Link key={item.id} to={item.title} className="link" style={{ fontSize: "16px" }}>
                {item.title}
              </Link>
            ))}
          </Flex>

          {/* Company section */}
          <Flex flexDir="column" gap="1rem">
            <Text fontSize="2rem" mb="1rem" fontWeight={600}>
              Company
            </Text>
            {/* Render links to various company-related pages */}
            {footerCompany.map((item) => (
              <Link key={item.id} to={item.title} className="link" style={{ fontSize: "16px" }}>
                {item.title}
              </Link>
            ))}
          </Flex>

          {/* Support section */}
          <Flex flexDir="column" gap="1rem">
            <Text fontSize="2rem" mb="1rem" fontWeight={600}>
              Support
            </Text>
            {/* Render links to various support-related pages */}
            {footerSupport.map((item) => (
              <Link key={item.id} to={item.title} className="link" style={{ fontSize: "16px" }}>
                {item.title}
              </Link>
            ))}
          </Flex>

          {/* Follow Us section */}
          <Flex flexDir="column" gap="1rem" align={{ base: "start", md: "center" }}>
            <Text fontSize="2rem" mb="1rem" fontWeight={600}>
              Follow Us
            </Text>
            {/* Render social media icons as links */}
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
      </div>
    </Flex>
  );
};

export default Footer;
