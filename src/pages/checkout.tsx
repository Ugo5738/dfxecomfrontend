import { Flex, Box, Center, Text, Checkbox, useTheme } from "@chakra-ui/react";
// import { useCreditCardValidator } from 'react-creditcard-validator';
import { useState } from "react";
import MainNav from "../components/mainNav";
import AppInput from "../components/input";
import AppButton from "../components/button";
import { useCheckoutForm } from "../utils/form";
import ScrollNav from "../components/scrollNav";
import { CheckoutType, ColorObject } from "./../utils/types";

const Checkout = () => {
    const color = useTheme().colors as ColorObject;
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const onCheckout = (data: CheckoutType) => {
        setLoading(true);
        // console.log("data", data);
        setLoading(false);
    };

    const { register, handleFormSubmit, errors, unregister } = useCheckoutForm(onCheckout);

    return (
        <Box>
            <MainNav />
            <ScrollNav />
            <Center py="5rem">
                <Flex
                    bg="white"
                    rounded="2xl"
                    shadow={color.shadow.main}
                    p="2rem"
                    w="90%"
                    maxW="50rem"
                    mx="auto"
                    flexDir="column"
                >
                    <Text fontSize="2rem" fontWeight="bold" mb="3rem">
                        Checkout
                    </Text>
                    <form onSubmit={handleFormSubmit}>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            flexDir="column"
                            w={{ base: "96%", md: "90%" }}
                            mx="auto"
                        >
                            <AppInput
                                label="Email Address"
                                name="email"
                                placeholder="Email Address"
                                type="email"
                                autoComplete="email"
                                register={register}
                                errors={errors}
                            />
                            <AppInput
                                label="Credit Card Number"
                                name="card_number"
                                placeholder="XXXX XXXX XXXX XXXX"
                                type="number"
                                register={register}
                                errors={errors}
                                size="md"
                            />
                            <Flex
                                alignItems="center"
                                flexDir={{ base: "column", sm: "row" }}
                                gap={{ base: "0", sm: "3rem" }}
                                justifyContent="space-between"
                                w="full"
                            >
                                <AppInput
                                    label="Expiry Date"
                                    name="expiry_date"
                                    placeholder="mm / yy"
                                    type="month"
                                    register={register}
                                    errors={errors}
                                />
                                <AppInput
                                    label="CVV"
                                    name="cvv"
                                    placeholder="XXX"
                                    type="number"
                                    autoComplete="name"
                                    register={register}
                                    errors={errors}
                                />
                            </Flex>
                            <Checkbox
                                colorScheme="orange"
                                size="lg"
                                my="1rem"
                                alignSelf="flex-start"
                                isChecked={isChecked}
                                onChange={() => {
                                    unregister("promo_code");
                                    setIsChecked(!isChecked);
                                }}
                            >
                                I have a promo code
                            </Checkbox>
                            {isChecked && (
                                <AppInput
                                    name="promo_code"
                                    placeholder="Enter Promo Code"
                                    type="text"
                                    register={register}
                                    errors={errors}
                                />
                            )}
                            <Flex
                                gap="1rem"
                                py="2rem"
                                borderBottom="2px"
                                borderColor="#88888880"
                                fontSize="1.5rem"
                                flexDir="column"
                                w="full"
                            >
                                <Flex alignItems="center" justifyContent="space-between" gap="3rem">
                                    <Text>Sub Total</Text>
                                    <Text>{`$${"569.97"}`}</Text>
                                </Flex>
                                <Flex alignItems="center" justifyContent="space-between" gap="3rem">
                                    <Text>Shipping Fee</Text>
                                    <Text>{`$${0}`}</Text>
                                </Flex>
                            </Flex>
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                gap="3rem"
                                my="2rem"
                                fontSize="2.25rem"
                                fontWeight="700"
                                w="full"
                            >
                                <Text>Total</Text>
                                <Text>{`$${"569.97"}`}</Text>
                            </Flex>
                            <AppButton
                                type="submit"
                                variant="secondary"
                                width="100%"
                                mt="2rem"
                                borderRadius=".6rem"
                                isLoading={loading}
                                loadingText="Verifying"
                                onClick={handleFormSubmit}
                            >
                                Make Payment
                            </AppButton>
                        </Flex>
                    </form>
                </Flex>
            </Center>
        </Box>
    );
};

export default Checkout;
