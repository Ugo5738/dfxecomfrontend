import { Flex, Box, Text } from "@chakra-ui/react";

// ScrollNav Component
const ScrollNav = () => {
  return (
    <Box bg="brand.main">
      {/* Create a Box with a background color */}
      <Flex alignItems="center" justifyContent="center" height=" 78px" marginBottom="2.7rem">
        {/* Create a Flex container with padding, center-aligned content */}
        <Text color="white" fontFamily="Lato" fontSize="28px" fontWeight="700">
          {/* Display a text with white color and a font size of 1.75rem */}
          Fast and free delivery
        </Text>
      </Flex>
    </Box>
  );
};

export default ScrollNav;
