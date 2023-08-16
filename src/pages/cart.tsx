import { Flex, Text, Box, Image, Select } from "@chakra-ui/react";
import Footer from "../components/footer";
import MainNav from "../components/mainNav";
import { cartsItems } from "../utils/dummyData";
import AppButton from "../components/button";
import { useNavigation } from "react-router-dom";
import { useState } from "react";
import ScrollNav from "../components/scrollNav";

const Cart = () => {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState("");
    const [carts, setCarts] = useState(cartsItems.nodes);
    const subTotal = carts.reduce((acc, curr) => acc + Number(curr.price), 0);
    const shippingFee = Number(cartsItems.shippingFee) || 0;
    const total = subTotal + shippingFee;

    const handleQuantityChange = (cartId: number, newPrice: number, newQuantity: number) => {
        setCarts((prevCarts) =>
            prevCarts.map((cart) =>
                cart.id === cartId
                    ? { ...cart, price: newPrice.toString(), quantity: newQuantity }
                    : cart,
            ),
        );
    };

    return (
        <Box>
            <MainNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ScrollNav />
            <Box className="mx-auto w-[98%]">
                <Text textAlign="right" fontWeight="600" fontSize="2.25rem" py="1rem">
                    Your Cart
                </Text>
                <Flex
                    alignItems="stretch"
                    gap="3rem"
                    mb="3rem"
                    pb="3rem"
                    bg="white"
                    borderY="2px"
                    borderBottomColor="#88888880"
                >
                    <Flex
                        boxShadow="2xl"
                        borderRadius="1rem"
                        p="2rem"
                        my="2rem"
                        flexDir="column"
                        gap="5rem"
                        align="stretch"
                    >
                        <Flex flexDir="column" flexGrow="1">
                            <Box
                                py="1rem"
                                borderBottom="2px"
                                borderBottomColor="#88888880"
                                mb="2rem"
                            >
                                <Text textAlign="center" fontWeight="600" fontSize="1.625rem">
                                    ORDER SUMMARY
                                </Text>
                            </Box>
                            <Flex flexDir="column" gap="2rem">
                                {carts.map((cart) => (
                                    <Flex
                                        key={cart.id}
                                        alignItems="center"
                                        justifyContent="space-between"
                                        gap="3rem"
                                    >
                                        <Flex alignItems="center">
                                            <Image
                                                boxSize="3rem"
                                                borderRadius="full"
                                                mr="12px"
                                                src={cart.image}
                                                alt={cart.name}
                                            />
                                            <Text fontSize="1.5rem">
                                                {cart.name}
                                                <span className="ml-2">{`(${1})`}</span>
                                            </Text>
                                        </Flex>
                                        <Text fontSize="1.5rem" justifySelf="flex-end">
                                            {`$${cart.price}`}
                                        </Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                        <Flex flexDir="column">
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                gap="3rem"
                                my="2rem"
                                py="1.5rem"
                                borderY="2px"
                                borderColor="#88888880"
                                fontSize="1.5rem"
                            >
                                <Text>Sub Total</Text>
                                <Text>{`$${subTotal}`}</Text>
                            </Flex>
                            <AppButton
                                type="button"
                                variant="primary"
                                width="100%"
                                isLoading={navigation.state === "loading"}
                                loadingText="Proceeding to Checkout"
                                to="/checkout"
                            >
                                Proceed to Checkout
                            </AppButton>
                        </Flex>
                    </Flex>

                    <Flex flexDir="column" gap="2rem" flexGrow="1">
                        {carts.map((cart) => (
                            <Flex
                                key={cart.id}
                                borderBottom="2px"
                                borderBottomColor="#88888880"
                                p="2rem"
                                alignItems="center"
                                justifyContent="space-between"
                                gap="2rem"
                            >
                                <Flex alignItems="center" gap="3rem" flexGrow="1">
                                    <Image height="12rem" src={cart.image} alt={cart.name} />
                                    <Text fontSize="1.5rem">{cart.name}</Text>
                                </Flex>
                                <Flex>
                                    <Select
                                        placeholder="Quantity"
                                        size="lg"
                                        fontSize="1.5rem"
                                        value={cart.quantity}
                                        onChange={(e) => {
                                            handleQuantityChange(
                                                cart.id,
                                                Number(cart.price) * Number(e.target.value),
                                                Number(e.target.value),
                                            );
                                        }}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Select>
                                </Flex>
                                <Flex
                                    flexDir="column"
                                    gap="2rem"
                                    alignItems="center"
                                    ml={{ base: "10rem" }}
                                >
                                    <Text fontSize="2.25rem" fontWeight="700">
                                        {`$${cart.price}`}
                                    </Text>
                                    <AppButton
                                        type="button"
                                        variant="primary"
                                        borderRadius=".3rem"
                                        height="3.5rem"
                                        w={{ base: "12rem" }}
                                        isLoading={false}
                                        loadingText="Proceeding to Checkout"
                                        onClick={() =>
                                            setCarts(carts.filter((c) => c.id !== cart.id))
                                        }
                                    >
                                        Remove Item
                                    </AppButton>
                                </Flex>
                            </Flex>
                        ))}
                        <Flex
                            gap="3rem"
                            py="2rem"
                            borderBottom="2px"
                            borderColor="#88888880"
                            fontSize="1.5rem"
                            flexDir="column"
                            pl={{ base: "10%", sm: "20%" }}
                            px="2rem"
                        >
                            <Flex alignItems="center" justifyContent="space-between" gap="3rem">
                                <Text>Sub Total</Text>
                                <Text>{`$${subTotal}`}</Text>
                            </Flex>
                            <Flex alignItems="center" justifyContent="space-between" gap="3rem">
                                <Text>Shipping Fee</Text>
                                <Text>
                                    {shippingFee === 0 ? "Free" : `$${cartsItems.shippingFee}`}
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex
                            alignItems="center"
                            justifyContent="space-between"
                            gap="3rem"
                            my="2rem"
                            fontSize="2.25rem"
                            fontWeight="700"
                            px="2rem"
                        >
                            <Text>Total</Text>
                            <Text>{`$${total}`}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Footer />
        </Box>
    );
};

export default Cart;
