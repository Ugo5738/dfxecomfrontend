import {
    Flex,
    Box,
    useDisclosure,
    Button,
    Collapse,
    Text,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Nav from "../components/nav";
import { useState } from "react";
import Seamless from "../components/seamless";
import { productDetailsData } from "../utils/dummyData";
import AppButton from "../components/button";
import { useGetSingleProduct } from "../services/products";
import LoadingSpinner from "../components/loading";
import { UseAddToCartMutation } from "../services/mutation";
import { ErrorToast, SuccessToast } from "../utils/toast";

const ProductDetail = () => {
    const { sku } = useParams<{ sku: string }>();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const { isOpen, onToggle } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState<string>(
        productDetailsData.info.variants[0].image,
    );
    const [selectedStorage, setSelectedStorage] = useState(
        productDetailsData.info.storage[0].capacity,
    );
    const [selectedColor, setSelectedColor] = useState(productDetailsData.info.variants[0].color);
    const { mutateAsync: isAddingToCart } = UseAddToCartMutation();
    const { data: productDetail, error, isLoading, isSuccess } = useGetSingleProduct(sku!);
    console.log("productDetail", productDetail, error, isLoading, isSuccess, sku);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleStorageFilter = (storage: string) => {
        setSelectedStorage(storage);
    };

    const handleColorFilter = (color: string) => {
        setSelectedColor(color);
    };

    const handleAddToCart = async () => {
        const result = await isAddingToCart({ sku: sku!, quantity: 1 });
        try {
            if (!result) return;

            if (result.status === 200 || result.status === 201) {
                SuccessToast(result.data?.message as string);
            }
            navigate("/cart");
        } catch (error) {
            ErrorToast("An error occurred");
            throw new Error(error as string);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <Box>
            <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Box>
                <Box mx="auto" w="98%" mb="5rem" my={{ base: "2rem", md: "5rem" }}>
                    <Flex
                        flexDir="column"
                        display={{ base: "flex", md: "none" }}
                        mb="2rem"
                        pl="1rem"
                    >
                        <Text
                            fontSize="1.5rem"
                            fontWeight="600"
                            color="brand.orange"
                            textTransform="uppercase"
                            mb=".8rem"
                        >
                            {productDetailsData.info.condition}
                        </Text>
                        <Text fontSize="2rem" fontWeight="700">
                            {productDetailsData.info.name}
                        </Text>
                        <Text fontSize="1.2rem" fontWeight="600">
                            {productDetailsData.info.description}
                        </Text>
                    </Flex>
                    <Flex flexDir={{ base: "column", md: "row" }}>
                        <Flex flexGrow="1" flexDir={{ base: "column", md: "row" }}>
                            <Flex
                                flexDir={{ base: "row", md: "column" }}
                                gap={{ base: "1rem", sm: "2rem", md: "3rem" }}
                                px={{ base: "1rem", md: "2rem" }}
                                pb={{ md: "3rem" }}
                                my={{ base: "2rem", md: "0" }}
                                order={{ base: 1, md: 0 }}
                            >
                                {productDetailsData.info.variants.map((variant) => (
                                    <div
                                        key={variant.image}
                                        className={`hover:scale-105 transition-all duration-300 w-full bg-white xs:p-6 rounded-xl shadow-lg cursor-pointer ${
                                            selectedImage === variant.image
                                                ? "border-2 border-[#DF6A12]"
                                                : ""
                                        }`}
                                        onClick={() => handleImageClick(variant.image)}
                                    >
                                        <img
                                            src={variant.image}
                                            alt="main product image"
                                            className="max-h-[10rem] max-w-[10rem] min-w-12 min-h-12 w-full h-full object-cover xs:object-contain mix-blend-darken"
                                        />
                                    </div>
                                ))}
                            </Flex>
                            <Flex
                                alignItems="center"
                                justifyContent="center"
                                bg="bg.light"
                                p="2rem"
                                flexGrow="1"
                                order={{ base: 0, md: 1 }}
                            >
                                <img
                                    src={selectedImage}
                                    alt="main product image"
                                    className="max-h-[40rem] h-full w-full object-contain mix-blend-darken"
                                />
                            </Flex>
                        </Flex>
                        <Flex
                            flexDir="column"
                            gap="3rem"
                            px={{ base: "1rem", sm: "2rem" }}
                            pb="3rem"
                            justifyContent="space-between"
                        >
                            <Flex flexDir="column" display={{ base: "none", md: "flex" }}>
                                <Text
                                    fontSize="1.5rem"
                                    fontWeight="600"
                                    color="brand.orange"
                                    textTransform="uppercase"
                                    mb="1rem"
                                >
                                    {productDetailsData.info.condition}
                                </Text>
                                <Text fontSize="2.5rem" fontWeight="700">
                                    {productDetailsData.info.name}
                                </Text>
                                <Text fontSize="1.5rem" fontWeight="600">
                                    {productDetailsData.info.description}
                                </Text>
                            </Flex>
                            <Flex flexDir="column" gap="2rem">
                                <Text fontSize="2rem" fontWeight="600">
                                    {`$${productDetailsData.info.storage[0].price}`}
                                </Text>
                                <Flex alignItems="center" gap="1rem">
                                    {productDetailsData.info.storage.map((storage) => (
                                        <Box
                                            key={storage.id}
                                            px="1rem"
                                            py=".5rem"
                                            borderRadius=".6rem"
                                            border={
                                                selectedStorage === storage.capacity
                                                    ? "1px solid #DF6A12"
                                                    : "1px solid #161616"
                                            }
                                            cursor="pointer"
                                            onClick={() => handleStorageFilter(storage.capacity)}
                                        >
                                            <Text>{storage.capacity}</Text>
                                        </Box>
                                    ))}
                                </Flex>
                            </Flex>
                            <Flex flexDir="column">
                                <Text fontSize="1.75rem">
                                    Color:{" "}
                                    <span className="font-medium">
                                        {productDetailsData.info.variants[0].color}
                                    </span>
                                </Text>
                                <Flex alignItems="center" gap="1rem" my="1rem">
                                    {productDetailsData.info.variants.map((color) => (
                                        <Box
                                            key={color.code}
                                            bg={color.code}
                                            p="1rem"
                                            w="3rem"
                                            h="3rem"
                                            rounded="full"
                                            cursor="pointer"
                                            border="none"
                                            outlineOffset="2px"
                                            outline={
                                                selectedColor === color.color
                                                    ? "2px solid #0086D1"
                                                    : ""
                                            }
                                            onClick={() => handleColorFilter(color.color)}
                                        />
                                    ))}
                                </Flex>
                            </Flex>
                            <AppButton
                                variant="primary"
                                height="3rem"
                                loadingText="Adding to cart"
                                onClick={handleAddToCart}
                            >
                                ADD TO CART
                            </AppButton>
                            <Flex
                                flexDir="column"
                                gap="2rem"
                                borderBlock="2px solid #88888880"
                                py="2rem"
                            >
                                {productDetailsData.info.free_shipping && (
                                    <Flex alignItems="center" gap="1rem">
                                        <img
                                            src="/delivery-icon.png"
                                            alt="free shipping"
                                            className="w-16 h-16 mix-blend-darken"
                                        />
                                        <Flex flexDir="column">
                                            <Text fontSize="1.5rem" fontWeight="600">
                                                Free Shipping and Returns
                                            </Text>
                                            <Text fontSize="1.25rem" color="bg.opaque">
                                                Pick up your order at any DFX store close to you
                                            </Text>
                                        </Flex>
                                    </Flex>
                                )}
                                {productDetailsData.info.pickup && (
                                    <Flex alignItems="center" gap="1rem">
                                        <img
                                            src="/pickup-icon.png"
                                            alt="pickup"
                                            className="w-16 h-16 mix-blend-darken"
                                        />
                                        <Flex flexDir="column">
                                            <Text fontSize="1.5rem" fontWeight="600">
                                                On-site Pickup
                                            </Text>
                                            <Text fontSize="1.25rem" color="bg.opaque">
                                                Pick up your order at any DFX store close to you
                                            </Text>
                                        </Flex>
                                    </Flex>
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
                <Box mx="auto" w="96%" my="5rem">
                    <Text fontSize="2rem" color="typography.dark" fontWeight="600">
                        Product Description
                    </Text>
                    <Flex flexDir="column" gap="1.5rem" mt="1rem">
                        {productDetailsData.description.map((data) => (
                            <UnorderedList key={data.id} ml="2rem">
                                <ListItem>
                                    <Text fontSize="1.5rem">{data.text}</Text>
                                </ListItem>
                            </UnorderedList>
                        ))}
                    </Flex>
                </Box>
                <Box mx="auto" w="96%">
                    <Button
                        onClick={onToggle}
                        variant="link"
                        my="1rem"
                        fontSize="2rem"
                        color="typography.dark"
                    >
                        See all details
                    </Button>
                    <Collapse in={isOpen} animateOpacity>
                        <Box mb="3rem" mx="auto" w="98%">
                            {productDetailsData.data.map((data) => (
                                <Flex
                                    key={data.id}
                                    justifyContent="space-between"
                                    gap={{ base: "3rem", sm: "10%", md: "15%" }}
                                    my="2rem"
                                    pr=".5rem"
                                    w="full"
                                >
                                    <Text fontSize="1.5rem" fontWeight="bold" mb="1rem" w="30%">
                                        {data.title}
                                    </Text>
                                    <Flex flexDir="column" flexGrow="1" w="full">
                                        {data.details.map((detail) => (
                                            <Box key={detail.id}>
                                                <UnorderedList>
                                                    <ListItem>
                                                        <Flex flexWrap="wrap">
                                                            <Text
                                                                fontWeight="bold"
                                                                whiteSpace="nowrap"
                                                            >
                                                                {detail.text}
                                                            </Text>
                                                            <span className="mx-2 text-2xl font-bold -mt-1">
                                                                -
                                                            </span>
                                                            <Text>{detail.description}</Text>
                                                        </Flex>
                                                    </ListItem>
                                                </UnorderedList>
                                                {detail.more
                                                    ? detail.more?.map((more) => (
                                                          <Box key={more.id} ml="1.5rem">
                                                              <UnorderedList>
                                                                  <ListItem>
                                                                      <Text>
                                                                          {more.description}
                                                                      </Text>
                                                                  </ListItem>
                                                              </UnorderedList>
                                                          </Box>
                                                      ))
                                                    : null}
                                            </Box>
                                        ))}
                                    </Flex>
                                </Flex>
                            ))}
                        </Box>
                    </Collapse>
                </Box>
                <img
                    src="/iphone-product.png"
                    alt="main product image"
                    className="max-h-[40rem] w-full object-cover mix-blend-darken"
                />
            </Box>
            <Seamless />
            <Footer />
        </Box>
    );
};

export default ProductDetail;
