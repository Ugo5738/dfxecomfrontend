import { Flex, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import { IoMailSharp } from "react-icons/io5";

// WaitList Component
const WaitList = () => {
    // State to store the user's subscription email
    const [subscriptionMail, setSubscriptionMail] = useState("");

    return (
        <Flex bg="bg.light">
            <Flex
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                color="typography.dark"
                mx="auto"
                w={{ base: "96%", sm: "90%" }}
                gap="1rem"
                py="4rem"
                fontSize={{ base: "1.5rem", sm: "2rem" }}
                fontWeight={700}
                textAlign="center"
            >
                {/* Icon */}
                <IoMailSharp className="text-6xl" />

                {/* Title */}
                <Text fontSize={{ base: "2rem", sm: "3rem" }}>Join the list</Text>

                {/* Description */}
                <Text>Subscribe and stay up-to-date on the latest products, gadgets and more.</Text>

                {/* Input for entering email address */}
                <Input
                    type="email"
                    placeholder="Email address"
                    _placeholder={{
                        textAlign: "center",
                        color: "typography.dark",
                        fontsize: "1.5rem",
                        fontWeight: 300,
                    }}
                    _hover={{}}
                    size="lg"
                    border="2px"
                    borderRadius="3rem"
                    w={{ base: "sm", sm: "lg" }}
                    my="2rem"
                    value={subscriptionMail}
                    onChange={(e) => setSubscriptionMail(e.target.value)}
                />
            </Flex>
        </Flex>
    );
};

export default WaitList;
