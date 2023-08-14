import { FiExternalLink } from "react-icons/fi";
import { seamLessShopping } from "../utils/dummyData";
import { Flex, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Seamless = () => {
    return (
        <Box py="3rem" mx="auto" w={{ base: "96%", md: "80%" }} color="typography.dark">
            <Text
                textAlign="center"
                color="typography.dark"
                fontSize={{ base: "2rem", sm: "2.5rem" }}
                fontWeight="700"
            >
                Seamless Shopping Through DFX Gadgets Hub
            </Text>
            <Flex
                mt="4rem"
                justifyContent="center"
                alignItems="center"
                gap="3rem"
                flexWrap={{ base: "wrap", sm: "nowrap" }}
            >
                {seamLessShopping.map((item) => (
                    <Flex
                        key={item.id}
                        flexDir="column"
                        gap=".5rem"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <img src={item.image} alt={item.title} className="w-[8rem] h-[6rem]" />
                        <Text
                            textAlign="center"
                            fontSize={{ base: "1.5rem", sm: "2rem" }}
                            fontWeight="600"
                            mt="1rem"
                        >
                            {item.title}
                        </Text>
                        <Text
                            textAlign="center"
                            fontSize={{ base: "1.2rem", sm: "1.5rem" }}
                            lineHeight="2rem"
                        >
                            {item.description}
                        </Text>
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
