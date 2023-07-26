import { Flex, Text, Box, InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import AppButton from "./button";
import NavBar from "./navBar";
import { BsCart3 } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    return (
        <Box>
            <Box mx="auto" w={{ base: "98%", sm: "96%" }}>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    p="1rem"
                    color="white"
                    gap="3rem"
                >
                    <Text fontSize="3rem" fontWeight="bold" color="brand.dark">
                        DFX Logo
                    </Text>
                    <Flex grow="1">
                        <InputGroup>
                            <Input
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search DFX"
                                _placeholder={{ fontsize: "1.25rem" }}
                                w="full"
                                rounded="2xl"
                                p="1.5rem"
                                color="brand.dark"
                                fontSize="1.5rem"
                                border="1px"
                            />
                            <InputRightElement>
                                <IoSearchSharp className="text-[#171923] h-8 w-8" />
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                    <Flex justifyContent="space-between" alignItems="center" gap="1rem">
                        <AppButton variant="primary" borderRadius=".3rem" height="3.5rem" onClick={() => navigate("/register")}>
                            Register
                        </AppButton>
                        <AppButton variant="outline" borderRadius=".3rem" height="3.5rem" onClick={() => navigate("/login")}>
                            Sign In
                        </AppButton>
                        <Flex as="button">
                            <BsCart3 className="text-[#171923] h-12 w-12" />
                            <Text
                                rounded="full"
                                bg="typography.red"
                                color="white"
                                h="2rem"
                                w="2rem"
                                ml="-3"
                                mt="-2"
                                textAlign="center"
                                fontWeight="600"
                            >
                                {"3"}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Box bg="brand.main">
                <Flex p=".5rem" alignItems="center" justifyContent="center">
                    <Text color="white" fontSize="1.75rem">
                        Fast and free delivery
                    </Text>
                </Flex>
            </Box>
            <Box>
                <NavBar />
            </Box>
        </Box>
    );
};

export default Nav;
