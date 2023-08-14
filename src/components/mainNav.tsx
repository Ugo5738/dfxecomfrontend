import {
    Flex,
    Text,
    Box,
    InputGroup,
    Input,
    InputRightElement,
    Image,
    Spacer,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Slide,
    CloseButton,
} from "@chakra-ui/react";
import AppButton from "./button";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { PiSignInLight } from "react-icons/pi";
import { useState } from "react";
// import { useGetUser } from "../services/auth";

const MainNav = () => {
    const [searchInput, setSearchInput] = useState("");
    const [toggleSearch, setToggleSearch] = useState(false);
    // const { data: user, error, isLoading, isSuccess } = useGetUser();

    return (
        <Box mx="auto" w={{ base: "98%", sm: "96%" }}>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                p="1rem"
                color="white"
                gap={{ base: "1rem", xs: "3rem" }}
                w="full"
            >
                <Text
                    fontSize={{ base: "2rem", md: "3rem" }}
                    fontWeight="bold"
                    color="brand.dark"
                    whiteSpace="nowrap"
                    as={Link}
                    to="/"
                >
                    DFX Logo
                </Text>
                <Flex grow="1" display={{ base: "none", md: "flex" }}>
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
                        <InputRightElement pt=".8rem" pr=".5rem">
                            <CiSearch className="text-[#171923] h-8 w-8" />
                        </InputRightElement>
                    </InputGroup>
                </Flex>
                <Spacer display={{ base: "block", md: "none" }} />
                <Flex
                    display={{ base: "flex", md: "none" }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap="1rem"
                >
                    <Box
                        minW={11}
                        minH={10}
                        onClick={() => setToggleSearch(!toggleSearch)}
                        cursor="pointer"
                    >
                        <CiSearch className="text-[#171923] h-10 w-12" />
                    </Box>
                    <Slide direction="top" in={toggleSearch} style={{ zIndex: 20 }} unmountOnExit>
                        <Flex
                            w="full"
                            p="1rem"
                            pb="2rem"
                            bg="bg.light"
                            rounded="2xl"
                            shadow="2xl"
                            flexDir="column"
                            gap="1rem"
                        >
                            <CloseButton
                                size="lg"
                                color="black"
                                onClick={() => setToggleSearch(false)}
                            />
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
                                    border="2px"
                                />
                                <InputRightElement pt=".8rem" pr=".5rem">
                                    <CiSearch className="text-[#171923] h-8 w-8" />
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                    </Slide>
                    <Popover placement="bottom">
                        <PopoverTrigger>
                            <Image
                                alt="Profile"
                                src="/profile-icon.png"
                                boxSize="2rem"
                                cursor="pointer"
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow bg="brand.nav" />
                            <PopoverCloseButton color="red" fontSize="1rem" />
                            <PopoverBody pt="3rem" px=".5rem">
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    gap="2rem"
                                    as={Link}
                                    to="/login"
                                >
                                    <Text color="brand.dark" fontWeight="500" fontSize="1.25rem">
                                        Sign In
                                    </Text>
                                    <PiSignInLight className="text-[#171923] h-12 w-12" />
                                </Flex>
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    gap="2rem"
                                    as={Link}
                                    to="/register"
                                >
                                    <Text color="brand.dark" fontWeight="500" fontSize="1.25rem">
                                        Register
                                    </Text>
                                    <PiSignInLight className="text-[#171923] h-12 w-12" />
                                </Flex>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>
                <Flex
                    display={{ base: "none", md: "flex" }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap="1rem"
                >
                    <AppButton
                        variant="primary"
                        borderRadius=".3rem"
                        height="3.5rem"
                        to="/register"
                    >
                        Register
                    </AppButton>
                    <AppButton variant="outline" borderRadius=".3rem" height="3.5rem" to="/login">
                        Sign In
                    </AppButton>
                </Flex>
                <Flex as={Link} ml={{ xs: "-1rem", md: "0" }} to="/checkout">
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
        </Box>
    );
};

export default MainNav;
