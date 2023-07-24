import { Flex, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import { IoMailSharp } from "react-icons/io5";
const WaitList = () => {
    const [subscriptionMail, setSubscriptionMail] = useState("");

    return (
        <Flex
            bg="bg.light"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            color="typography.dark"
            mx="auto"
            w={{ base: "98%", sm: "90%" }}
            gap="1rem"
            py="4rem"
            fontSize={{ base: "1.5rem", sm: "2rem" }}
            fontWeight="bold"
            textAlign="center"
        >
            <IoMailSharp className="text-6xl" />
            <Text fontSize={{ base: "2rem", sm: "3rem" }}>Join the list</Text>
            <Text>Subscribe and stay up-to-date on the latest products, gadgets and more.</Text>
            <Input
                type="email"
                placeholder="Email address"
                _placeholder={{ textAlign: "center", color: "typography.dark", fontsize: "1.2rem" }}
                size="lg"
                border="2px"
                borderRadius="3rem"
                w={{ base: "sm", sm: "lg" }}
                my="2rem"
                value={subscriptionMail}
                onChange={(e) => setSubscriptionMail(e.target.value)}
            />
        </Flex>
    );
};

export default WaitList;
