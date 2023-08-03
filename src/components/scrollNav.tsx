import { Flex, Box, Text } from "@chakra-ui/react";

const ScrollNav = () => {
    return (
        <Box bg="brand.main">
            <Flex p=".5rem" alignItems="center" justifyContent="center">
                <Text color="white" fontSize="1.75rem">
                    Fast and free delivery
                </Text>
            </Flex>
        </Box>
    );
};

export default ScrollNav;
