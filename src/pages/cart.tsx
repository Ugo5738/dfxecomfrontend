import { Flex, Text, Box, Image, Select, Button } from "@chakra-ui/react";
import Footer from "../components/footer";
import MainNav from "../components/mainNav";
import { cartsItems } from "../utils/dummyData";
import AppButton from "../components/button";
import { useNavigation } from "react-router-dom";
import { useState } from "react";
import ScrollNav from "../components/scrollNav";
import { MdDelete } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

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
                <Text
                    textAlign={{ base: "left", md: "right" }}
                    fontWeight="600"
                    fontSize="2.25rem"
                    py="1rem"
                    mx="auto"
                    w="98%"
                >
                    Your Cart ({carts.length})
                </Text>
                <Flex
                    alignItems="stretch"
                    gap="2rem"
                    mb="3rem"
                    pb="3rem"
                    borderTop="1px"
                    bg="bg.light"
                    mx="auto"
                    w="98%"
                >
                    <Flex
                        boxShadow="2xl"
                        borderRadius="1rem"
                        p="2rem"
                        ml="2rem"
                        my="2rem"
                        flexDir="column"
                        gap="5rem"
                        align="stretch"
                        bg="white"
                        display={{ base: "none", md: "flex" }}
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
                                                <span className="ml-2">{`(${cart.quantity})`}</span>
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
                                <Text>{`$${subTotal.toFixed(2)}`}</Text>
                            </Flex>
                            <AppButton
                                type="button"
                                variant="primary"
                                width="100%"
                                bRadius=".5rem"
                                isLoading={navigation.state === "loading"}
                                loadingText="Proceeding to Checkout"
                                to="/checkout"
                            >
                                Proceed to Checkout
                            </AppButton>
                        </Flex>
                    </Flex>

                    <Flex flexDir="column" gap="1rem" flexGrow="1" overflowX="hidden">
                        {carts.map((cart) => (
                            <Flex
                                key={cart.id}
                                borderBottom="2px"
                                borderBottomColor="#88888880"
                                py="2rem"
                                px={{ base: "1rem", lg: "2rem" }}
                                justifyContent="space-between"
                                gap="2rem"
                                flexDir={{ base: "column", md: "row" }}
                            >
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    gap="3rem"
                                    w="full"
                                    flexGrow="1"
                                >
                                    <Flex
                                        alignItems="center"
                                        w={{ base: "10%", xs: "15%" }}
                                        minW="7rem"
                                    >
                                        <Image height="12rem" src={cart.image} alt={cart.name} />
                                    </Flex>
                                    <Flex flexDir="column" gap="1rem" flexGrow="1">
                                        <Text
                                            fontSize={{ base: "1.35rem", sm: "1.5rem", lg: "2rem" }}
                                            fontWeight="bold"
                                        >
                                            {cart.name}
                                        </Text>
                                        <Text
                                            fontSize={{ base: "1.1rem", sm: "1.4rem" }}
                                            fontWeight="bold"
                                        >
                                            Color: <span className="font-normal">{cart.color}</span>
                                        </Text>
                                        {cart.in_stock ? (
                                            <Text fontSize="1.2rem">In Stock</Text>
                                        ) : (
                                            <Text
                                                fontSize="1.2rem"
                                                textDecoration="line-through"
                                                color="brand.orange"
                                            >
                                                Out Of Stock
                                            </Text>
                                        )}
                                        <Text
                                            fontSize={{ base: "1.5rem", sm: "2rem" }}
                                            fontWeight="500"
                                            display={{ base: "block", md: "none" }}
                                        >
                                            {`$${cart.price}`}
                                        </Text>
                                    </Flex>
                                    <Flex display={{ base: "none", md: "flex" }}>
                                        <Select
                                            size="md"
                                            border="none"
                                            outline="none"
                                            fontSize="1.5rem"
                                            fontWeight="700"
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
                                </Flex>
                                <Flex
                                    display={{ base: "none", md: "flex" }}
                                    flexDir="column"
                                    gap="2rem"
                                    alignItems="center"
                                    ml={{ lg: "10%" }}
                                >
                                    <Text fontSize="2.25rem" fontWeight="700">
                                        {`$${cart.price}`}
                                    </Text>
                                    <AppButton
                                        type="button"
                                        variant="primary"
                                        borderRadius=".3rem"
                                        height="3.5rem"
                                        w="12rem"
                                        isLoading={false}
                                        loadingText="Proceeding to Checkout"
                                        onClick={() =>
                                            setCarts(carts.filter((c) => c.id !== cart.id))
                                        }
                                    >
                                        Remove Item
                                    </AppButton>
                                </Flex>
                                <Flex
                                    display={{ base: "flex", md: "none" }}
                                    justifyContent="space-between"
                                    pr=".5rem"
                                >
                                    <Button
                                        variant="ghost"
                                        leftIcon={<MdDelete className="text-[#DF6A12] w-12 h-12" />}
                                        onClick={() =>
                                            setCarts(carts.filter((c) => c.id !== cart.id))
                                        }
                                        w="2rem"
                                    ></Button>
                                    <Flex bg="#ADADD3" borderRadius=".5rem" alignItems="center">
                                        <Button
                                            leftIcon={
                                                <AiOutlineMinus className="text-4xl font-black" />
                                            }
                                            variant="ghost"
                                            bg="#EBEBF5"
                                            pr="0"
                                            pl=".6rem"
                                            py="1.5rem"
                                            borderEndRadius=".5rem"
                                            isDisabled={cart.quantity === 1}
                                            onClick={() => {
                                                handleQuantityChange(
                                                    cart.id,
                                                    (Number(cart.price) / cart.quantity) *
                                                        (cart.quantity - 1),
                                                    cart.quantity - 1,
                                                );
                                            }}
                                        ></Button>
                                        <Text
                                            mx="1rem"
                                            flexGrow="1"
                                            fontSize={{ base: "1.5rem", sm: "2rem" }}
                                            fontWeight="700"
                                            textAlign="center"
                                        >
                                            {cart.quantity}
                                        </Text>
                                        <Button
                                            leftIcon={
                                                <AiOutlinePlus className="text-4xl text-white font-black" />
                                            }
                                            variant="ghost"
                                            bg="#3E3FCD"
                                            pr="0"
                                            pl=".6rem"
                                            py="1.5rem"
                                            colorScheme="purple"
                                            _hover={{ bg: "#4E3FCD" }}
                                            borderStartRadius=".5rem"
                                            onClick={() => {
                                                handleQuantityChange(
                                                    cart.id,
                                                    (Number(cart.price) / cart.quantity) *
                                                        (cart.quantity + 1),
                                                    cart.quantity + 1,
                                                );
                                            }}
                                        ></Button>
                                    </Flex>
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
                            px="2rem"
                        >
                            <Flex alignItems="center" justifyContent="space-between" gap="3rem">
                                <Text>Sub Total</Text>
                                <Text>{`$${subTotal.toFixed(2)}`}</Text>
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
                            <Text>{`$${total.toFixed(2)}`}</Text>
                        </Flex>
                        <Flex mx="auto" w="80%" mt="3rem" display={{ base: "flex", md: "none" }}>
                            <AppButton
                                type="button"
                                variant="primary"
                                width="100%"
                                bRadius=".5rem"
                                isLoading={navigation.state === "loading"}
                                loadingText="Proceeding to Checkout"
                                to="/checkout"
                            >
                                Proceed to Checkout
                            </AppButton>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Footer />
        </Box>
    );
};

export default Cart;
