import { FiExternalLink } from "react-icons/fi";
import { seamLessShopping } from "../utils/dummyData";
import { Flex, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Seamless Component
const Seamless = () => {
    return (
        <Box py="3rem" mx="auto" w={{ base: "96%", md: "90%" }} color="typography.dark">
            {/* Title */}
            <Text
                textAlign="center"
                color="typography.dark"
                fontSize={{ base: "2rem", sm: "2.5rem" }}
                fontWeight="700"
            >
                Seamless Shopping Through DFX Gadgets Hub
            </Text>

            {/* List of seamless shopping items */}
            <Flex
                mt="4rem"
                justifyContent={{ base: "center", md: "space-between" }}
                gap="5rem"
                flexWrap={{ base: "wrap", md: "nowrap" }}
            >
                {/* Map through an array of shopping items */}
                {seamLessShopping.map((item) => (
                    <Flex
                        key={item.id}
                        flexDir="column"
                        gap=".5rem"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {/* Display item image */}
                        <img src={item.image} alt={item.title} className="w-[8rem] h-[6rem]" />

                        {/* Display item title */}
                        <Text
                            textAlign="center"
                            fontSize={{ base: "1.5rem", sm: "2.25rem" }}
                            fontWeight="600"
                            mt="1rem"
                        >
                            {item.title}
                        </Text>

                        {/* Display item description */}
                        <Text
                            textAlign="center"
                            fontSize={{ base: "1.2rem", sm: "2rem" }}
                            lineHeight="2.25rem"
                            color="#171923"
                        >
                            {item.description}
                        </Text>

                        {/* Link to "Learn More" */}
                        <Link
                            to="/shop"
                            className="text-[1.5rem] font-semibold mt-1 sm:mt-4 flex items-center flex-nowrap gap-2 hover:underline"
                        >
                            Learn More <FiExternalLink />
                        </Link>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};

export default Seamless;
