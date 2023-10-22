import { Flex, Text, Box, Image, Select, Button } from "@chakra-ui/react";
import Footer from "../components/footer";
// import MainNav from "../components/mainNav";
import AppButton from "../components/button";
import { useMemo, useState } from "react";
// import ScrollNav from "../components/scrollNav";
import { MdDelete } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useGetOrderSummary } from "../services/order";
import {
  UseAddToCartMutation,
  UseRemoveFromCartMutation,
  UseReduceFromCartMutation,
} from "../services/mutation";
import { ErrorPropsType } from "../utils/types";
import LoadingSpinner from "../components/loading";
import React from "react";
import { SuccessToast } from "../utils/toast";
import Error404 from "../components/error";
import { useGetUser } from "../services/auth";
import { PaystackButton } from "react-paystack";
import { InfoToast } from "./../utils/toast";
import Header from "../layouts/Header";
import styled from "styled-components";

const PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;

const Cart = () => {
  const { data: user } = useGetUser();
  const {
    id: customer_id,
    email: customer_email,
    first_name: customer_first_name,
    last_name: customer_last_name,
    phone: customer_phone_number,
  } = user || {};

  const { mutateAsync: addToCart } = UseAddToCartMutation();
  const { mutateAsync: removeFromCart } = UseRemoveFromCartMutation();
  const { mutateAsync: reduceFromCart } = UseReduceFromCartMutation();
  const { data: orderSummaryData, error, isLoading, isSuccess } = useGetOrderSummary();
  const { products, sub_total, total } = orderSummaryData?.order_summary || {};
  const carts = products || [];
  const [searchTerm, setSearchTerm] = useState("");
  const shippingFee = 0;

  const paymentBtnProps = useMemo(() => {
    return {
      publicKey: PUBLIC_KEY,
      email: customer_email!,
      amount: total! * 100,
      firstname: customer_first_name,
      lastname: customer_last_name,
      phone: customer_phone_number,
      quantity: carts.length,
      metadata: {
        custom_fields: [
          {
            display_name: "Customer ID",
            variable_name: "customer_id",
            value: customer_id,
          },
        ],
      },
      onSuccess: () => {
        SuccessToast("Payment Successful, you will be redirected to the order page");
        window.location.href = "/";
      },
      onClose: () => InfoToast("Payment Cancelled"),
    };
  }, [
    carts.length,
    customer_email,
    customer_first_name,
    customer_id,
    customer_last_name,
    customer_phone_number,
    total,
  ]);

  //   const totalPrice = products?.reduce((accumulator, product) => {
  //     const salePrice = product?.product?.sale_price;
  //     if (salePrice !== undefined) {
  //       const numericSalePrice = parseFloat(salePrice);
  //       if (!isNaN(numericSalePrice)) {
  //         return accumulator + numericSalePrice * carts.length;
  //       }
  //     }
  //     return accumulator;
  //   }, 0);

  const handleRemoveItem = async (cartId: string) => {
    const removeItem = await removeFromCart(cartId);
    try {
      if (removeItem.status === 200 || removeItem.status === 201) {
        SuccessToast("Item removed from cart");
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const handleReduceFromCart = async (sku: string) => {
    const reduceItem = await reduceFromCart(sku);
    try {
      if (reduceItem.status === 200 || reduceItem.status === 201) {
        SuccessToast("Item quantity reduced");
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const handleItemQuantityChange = async (sku: string, newQuantity: number) => {
    const updateItem = await addToCart({
      sku,
      quantity: newQuantity,
    });
    try {
      if (updateItem.status === 200 || updateItem.status === 201) {
        SuccessToast("Item quantity updated");
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) return <Error404 error={error as ErrorPropsType} />;

  return (
    <Box className="cart">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Wrapper>
        {/* <ScrollNav /> */}
        {isSuccess && (
          <Box className="mx-auto w-[100%] container" backgroundColor="#ebebf5">
            <div className="order pt-5">
              <p className=" o-text ">ORDER SUMMARY</p>

              <div className="order-inner">
                <div className="right">
                  <p>Subtotal</p>
                  <p>{`$${sub_total!.toFixed(2)}`}</p>
                </div>
                <div className="right">
                  <p>Shipping</p>
                  <p>{shippingFee === 0 ? "Free" : `$${shippingFee as number}`}</p>
                </div>
                <div className="right">
                  <p>
                    <strong>Total</strong>
                  </p>
                  <p>
                    <strong>{`$${total!.toFixed(2)}`}</strong>
                  </p>
                </div>
              </div>
            </div>
            <Text
              textAlign={{ base: "left", md: "right" }}
              fontWeight="600"
              className="my-3"
              fontSize="2.25rem"
              mx="auto"
              w="100%"
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
                py="2rem"
                px="1rem"
                ml="2rem"
                my="2rem"
                flexDir="column"
                gap="5rem"
                w="28rem"
                align="stretch"
                bg="white"
                display={{ base: "none", md: "flex" }}
              >
                <Flex flexDir="column" flexGrow="1">
                  <Box py="1rem" borderBottom="2px" borderBottomColor="#88888880" mb="2rem">
                    <Text textAlign="center" fontWeight="600" fontSize="1.625rem">
                      ORDER SUMMARY
                    </Text>
                  </Box>
                  <Flex flexDir="column" gap="2rem">
                    {isSuccess &&
                      carts.map((cart) => {
                        const { id, quantity, product } = cart;
                        return (
                          <React.Fragment key={id}>
                            <Flex
                              key={product.sku}
                              alignItems="center"
                              justifyContent="space-between"
                              gap="2rem"
                            >
                              <Flex alignItems="center">
                                <Image
                                  boxSize="3rem"
                                  borderRadius="full"
                                  mr="8px"
                                  src={product.default_image}
                                  alt={product.product_name}
                                  mixBlendMode="darken"
                                />
                                <Text fontSize="1.3rem">
                                  {product.product_name}
                                  <span className="ml-2">{`(${quantity})`}</span>
                                </Text>
                              </Flex>
                              <Text fontSize="1.3rem" justifySelf="flex-end">
                                {`$${product.store_price}`}
                              </Text>
                            </Flex>
                          </React.Fragment>
                        );
                      })}
                  </Flex>
                </Flex>
                <Flex flexDir="column">
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap="3rem"
                    my="2rem"
                    py="1.5rem"
                    px="1rem"
                    borderY="2px"
                    borderColor="#88888880"
                    fontSize="1.5rem"
                  >
                    <Text>Sub Total</Text>
                    <Text>{`$${sub_total!.toFixed(2)}`}</Text>
                  </Flex>
                  <PaystackButton {...paymentBtnProps} className="w-full">
                    <Flex
                      w="full"
                      h="4rem"
                      fontWeight="normal"
                      fontSize="1.5rem"
                      bg="brand.orange"
                      color="white"
                      borderRadius=".5rem"
                      alignItems="center"
                      justifyContent="center"
                      _hover={{
                        opacity: 0.8,
                      }}
                    >
                      Proceed to Checkout
                    </Flex>
                  </PaystackButton>
                </Flex>
              </Flex>

              <Flex flexDir="column" gap="1rem" flexGrow="1" overflowX="hidden">
                {isSuccess &&
                  carts.map((cart) => {
                    const { id, ordered, quantity, product } = cart;
                    return (
                      <Box
                        key={id}
                        backgroundColor="#fff"
                        boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.2)"
                        margin="1rem"
                        borderRadius="5px"
                      >
                        <Flex
                          key={product.sku}
                          width="100%"
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
                            <Flex alignItems="center" w={{ base: "10%", xs: "15%" }} minW="7rem">
                              <Image
                                height="12rem"
                                src={product.default_image}
                                alt={product.product_name}
                                mixBlendMode="darken"
                                objectFit="contain"
                                aspectRatio="3/2"
                              />
                            </Flex>
                            <Flex flexDir="column" flexGrow="1">
                              <Text
                                fontSize={{
                                  base: "1.35rem",
                                  sm: "1.5rem",
                                  lg: "2rem",
                                }}
                                margin={0}
                                fontWeight="bold"
                              >
                                {product.product_name}
                              </Text>
                              {!ordered ? (
                                <Text fontSize="1.2rem" margin={0}>
                                  In Stock
                                </Text>
                              ) : (
                                <Text
                                  fontSize="1.2rem"
                                  textDecoration="line-through"
                                  color="brand.orange"
                                >
                                  Out Of Stock
                                </Text>
                              )}
                              <Flex alignItems="center" gap="5px">
                                <Text
                                  fontSize={{
                                    base: "1.5rem",
                                    sm: "2rem",
                                  }}
                                  margin={0}
                                  fontWeight="500"
                                  display={{ base: "block", md: "none" }}
                                >
                                  {`$${product.store_price}`}
                                </Text>
                                {product?.store_price && (
                                  <Text
                                    color="typography.ash"
                                    fontSize="1rem"
                                    textDecoration="line-through"
                                    margin={0}
                                    fontFamily="Bebas Neue"
                                    textColor="#E54335"
                                  >
                                    {`$${product?.store_price}`}
                                  </Text>
                                )}
                              </Flex>
                            </Flex>
                            <Flex
                              display={{ base: "none", md: "flex" }}
                              title="Quantity"
                              minW="4rem"
                            >
                              <Select
                                size="md"
                                border="none"
                                outline="none"
                                fontSize="1.5rem"
                                fontWeight="700"
                                value={quantity}
                                onChange={(e) => {
                                  void handleItemQuantityChange(
                                    product.sku,
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
                            ml={{ lg: "5%" }}
                          >
                            <Text fontSize="2.25rem" fontWeight="700">
                              {`$${product.store_price}`}
                            </Text>
                            <AppButton
                              type="button"
                              variant="primary"
                              borderRadius=".3rem"
                              height="3.5rem"
                              w="12rem"
                              isLoading={false}
                              loadingText="Proceeding to Checkout"
                              onClick={() => handleRemoveItem(product.sku)}
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
                              onClick={() => handleRemoveItem(product.sku)}
                              w="2rem"
                            ></Button>
                            <div className="action-btn">
                              <Button
                                leftIcon={<AiOutlineMinus className="text-4xl font-black" />}
                                variant="ghost"
                                bg="#EBEBF5"
                                pr="0"
                                pl=".6rem"
                                py="1.5rem"
                                borderEndRadius=".5rem"
                                isDisabled={cart.quantity === 1}
                                onClick={() => {
                                  void handleReduceFromCart(product.sku);
                                }}
                              ></Button>
                              <Text
                                margin={0}
                                mx="1rem"
                                flexGrow="1"
                                fontSize={{
                                  base: "1.5rem",
                                  sm: "2rem",
                                }}
                                fontWeight="700"
                                textAlign="center"
                              >
                                {quantity}
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
                                  void handleItemQuantityChange(product.sku, Number(1));
                                }}
                              ></Button>
                            </div>
                          </Flex>
                        </Flex>
                      </Box>
                    );
                  })}
                {/* <Flex
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
                  <Text>{`$${sub_total!.toFixed(2)}`}</Text>
                </Flex>
                <Flex alignItems="center" justifyContent="space-between" gap="3rem">
                  <Text>Shipping Fee</Text>
                  <Text>{shippingFee === 0 ? "Free" : `$${shippingFee as number}`}</Text>
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
                <Text>{`$${total!.toFixed(2)}`}</Text>
              </Flex> */}
                <Flex mx="auto" w="80%" mt="3rem" display={{ base: "flex", md: "none" }}>
                  <PaystackButton {...paymentBtnProps} className="w-full">
                    <Flex
                      w="full"
                      h="4rem"
                      fontWeight="normal"
                      fontSize="1.5rem"
                      bg="brand.orange"
                      color="white"
                      borderRadius=".5rem"
                      alignItems="center"
                      justifyContent="center"
                      _hover={{
                        opacity: 0.8,
                      }}
                    >
                      Proceed to Checkout
                    </Flex>
                  </PaystackButton>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        )}
      </Wrapper>
      <Footer />
    </Box>
  );
};

export default Cart;
const Wrapper = styled.div`
  background-color: #ebebf5;
`;
