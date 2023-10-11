import {
  // Import Chakra UI components and icons
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

import AppButton from "./button"; // Import a custom button component
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom for navigation
import { BsCart3 } from "react-icons/bs"; // Import a shopping cart icon
import { CiSearch } from "react-icons/ci"; // Import a search icon
import { PiSignInLight } from "react-icons/pi"; // Import a sign-in icon
import { useState } from "react"; // Import the useState hook from React
import { SearchProps } from "../utils/types"; // Import custom types
import { useGetOrderSummary } from "../services/order"; // Import a custom hook for getting order summary data
import { getAuthToken } from "../utils/auth";

// Define the MainNav component
const MainNav = ({ searchTerm, setSearchTerm }: SearchProps) => {
  // State for toggling search
  const [toggleSearch, setToggleSearch] = useState(false);
  const isLoggedIn = getAuthToken();

  // Fetch order summary data using a custom hook
  const { data: orderSummaryData, isSuccess } = useGetOrderSummary({ enabled: !!isLoggedIn });

  // // Extract products from the order summary data if available
  const { products } = orderSummaryData?.order_summary || {};

  return (
    <Box mx="auto" w={{ base: "100%", sm: "96%" }}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        py="1rem"
        px="6rem"
        mt={{ base: ".5rem", md: "0" }}
        color="white"
        gap={{ base: "1rem", xs: "3rem" }}
        w="full"
      >
        {/* Brand logo with a link to the homepage */}
        <Text
          fontFamily="Lato"
          fontSize="40px"
          fontWeight="700"
          color="brand.dark"
          lineHeight="normal"
          as={Link}
          to="/"
        >
          DFX Logo
        </Text>

        {/* Search input (visible on larger screens) */}
        <Flex grow="1" display={{ base: "none", md: "flex" }}>
          <InputGroup>
            {/* Input for entering search term */}
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder=""
              _placeholder={{ fontsize: "1.25rem" }}
              w="full"
              rounded="6rem"
              p="1.5rem"
              // pr="3.5rem"
              color="brand.dark"
              fontSize="1.5rem"
              border="1px"
            />
            {/* Search icon */}
            <InputRightElement pt=".8rem" pr="1rem">
              <CiSearch className="text-[#171923] h-8 w-8 hover:cursor-pointer" />
            </InputRightElement>
          </InputGroup>
        </Flex>

        {/* Spacer (visible on smaller screens) */}
        <Spacer display={{ base: "block", md: "none" }} />

        {/* Search icon and input (visible on smaller screens) */}
        <Flex
          display={{ base: "flex", md: "none" }}
          justifyContent="space-between"
          alignItems="center"
          gap="1rem"
        >
          <Box
            minW={11}
            minH={10}
            ml="-2rem"
            onClick={() => setToggleSearch(!toggleSearch)}
            cursor="pointer"
          >
            <CiSearch className="text-[#171923] h-10 w-10" />
          </Box>

          {/* Slide-in search input */}
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
              <CloseButton size="lg" color="black" onClick={() => setToggleSearch(false)} />
              <InputGroup>
                {/* Input for entering search term */}
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder=""
                  _placeholder={{ fontsize: "1.25rem" }}
                  w="full"
                  rounded="6rem"
                  p="1.5rem"
                  pr="3.5rem"
                  color="brand.dark"
                  fontSize="1.5rem"
                  border="2px"
                />
                {/* Search icon */}
                <InputRightElement pt=".8rem" pr=".5rem">
                  <CiSearch className="text-[#171923] h-8 w-8 hover:cursor-pointer" />
                </InputRightElement>
              </InputGroup>
            </Flex>
          </Slide>
          {/* Sign-in and register options (visible on smaller screens) */}
          {!isLoggedIn ? (
            <Popover placement="bottom">
              <PopoverTrigger>
                <Image alt="Profile" src="/profile-icon.png" boxSize="2rem" cursor="pointer" />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow bg="brand.nav" />
                <PopoverCloseButton color="red" fontSize="1rem" />
                <PopoverBody pt="3rem" px=".5rem">
                  {/* Sign-in option */}
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
                  {/* Register option */}
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
          ) : null}
        </Flex>

        {/* Sign-in and register buttons (visible on larger screens) */}
        {!isLoggedIn ? (
          <Flex
            display={{ base: "none", md: "flex" }}
            justifyContent="space-between"
            alignItems="center"
            gap="3rem"
          >
            {/* Register button */}
            <AppButton variant="primary" borderRadius=".3rem" height="3.5rem" to="/register">
              Register
            </AppButton>
            {/* Sign-in button */}
            <AppButton variant="outline" borderRadius=".3rem" height="3.5rem" to="/login">
              Sign In
            </AppButton>
          </Flex>
        ) : null}

        {/* Cart icon and count */}
        <Flex as={Link} ml={{ xs: "-1rem", md: "0" }} to="/cart">
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
            {isSuccess ? products?.length : "0"}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MainNav;
