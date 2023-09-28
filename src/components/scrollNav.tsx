import { Flex, Box, Text } from "@chakra-ui/react";

// ScrollNav Component
const ScrollNav = () => {
    return (
        <Box bg="brand.main">
            {/* Create a Box with a background color */}
            <Flex p=".5rem" alignItems="center" justifyContent="center">
                {/* Create a Flex container with padding, center-aligned content */}
                <Text color="white" fontSize="1.75rem">
                    {/* Display a text with white color and a font size of 1.75rem */}
                    Fast and free delivery
                </Text>
            </Flex>
        </Box>
    );
};

export default ScrollNav;
