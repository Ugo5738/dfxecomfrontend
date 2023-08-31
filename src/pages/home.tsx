import { Flex, Text, Box, Grid, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import { homeCarousel } from "../utils/staticData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import AppButton from "../components/button";
import Nav from "../components/nav";
import WaitList from "../components/waitlist";
import Seamless from "../components/seamless";
import { useGetTrendingInventory, useGetInventoryProducts } from "../services/products";
import LoadingSpinner from "../components/loading";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { ErrorPropsType, ParentRefType } from "../utils/types";
import Error404 from "../components/error";

const Home = () => {
    const {
        data: trendingInventory,
        error: trendingInventoryError,
        isLoading: trendingInventoryLoading,
        isSuccess: trendingInventorySuccess,
    } = useGetTrendingInventory();

    const {
        data: inventoryProducts,
        error: inventoryProductsError,
        isLoading: inventoryProductsLoading,
        isSuccess: inventoryProductsSuccess,
    } = useGetInventoryProducts();

    const [searchTerm, setSearchTerm] = useState("");
    const [scrollDuration, setScrollDuration] = useState(30);
    const parentRef = useRef<ParentRefType>(null);

    useEffect(() => {
        let scrollAmount = 0;
        if (!parentRef?.current) return;
        const maxScroll = parentRef?.current?.scrollWidth - parentRef?.current?.clientWidth;

        const scroll = () => {
            scrollAmount += 2;
            if (scrollAmount > maxScroll) {
                scrollAmount = 0;
            }
            if (parentRef?.current) parentRef.current.scrollLeft = scrollAmount;
        };

        const scrollInterval = setInterval(scroll, scrollDuration);

        return () => clearInterval(scrollInterval);
    }, [scrollDuration]);

    if (trendingInventoryLoading || inventoryProductsLoading) return <LoadingSpinner />;
    if (
        trendingInventoryError ||
        inventoryProductsError ||
        !inventoryProducts?.results ||
        !trendingInventory
    )
        return <Error404 error={trendingInventoryError as ErrorPropsType} />;

    return (
        <Box overflowX="hidden">
            <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Box bg="bg.main" py={{ base: "3rem", sm: "5rem" }} color="typography.dark">
                <Swiper
                    modules={[Pagination, A11y, Autoplay, Keyboard]}
                    spaceBetween={600}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    a11y={{
                        enabled: true,
                        prevSlideMessage: "Previous slide",
                        nextSlideMessage: "Next slide",
                    }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    keyboard={{ enabled: true, onlyInViewport: false }}
                >
                    {homeCarousel.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Flex
                                backgroundImage={`url(${item.image})`}
                                backgroundSize="90% 100%"
                                backgroundRepeat="no-repeat"
                                backgroundPosition="right"
                            >
                                <Flex
                                    flexDir="column"
                                    gap="1rem"
                                    mb={{ base: "5rem", md: "10rem" }}
                                    px="3rem"
                                    w="full"
                                    minH="15rem"
                                >
                                    <Text
                                        color="brand.orange"
                                        fontSize="2.5rem"
                                        fontWeight="600"
                                        display={{ base: "none", md: "flex" }}
                                    >
                                        {"New"}
                                    </Text>
                                    <Flex flexDir="column" display={{ base: "none", md: "flex" }}>
                                        <Text
                                            fontSize={{ base: "2.25rem", md: "3rem" }}
                                            fontFamily="Raleway"
                                            fontWeight="600"
                                            mb="-1rem"
                                        >
                                            {item.title}
                                        </Text>
                                        <Text
                                            fontSize={{ base: "3rem", md: "5rem" }}
                                            fontWeight="800"
                                            whiteSpace="nowrap"
                                        >
                                            {item.header}
                                        </Text>
                                    </Flex>
                                    <Text
                                        fontSize="2.6rem"
                                        fontWeight="500"
                                        lineHeight="normal"
                                        display={{ base: "none", md: "flex" }}
                                    >
                                        {item.text}
                                    </Text>
                                    <AppButton
                                        variant="primary"
                                        colorScheme="brand"
                                        w={{ base: "100%", md: "12rem" }}
                                        mt="10rem"
                                        display={{ base: "none", md: "flex" }}
                                        to="/shop"
                                    >
                                        Shop Now
                                    </AppButton>
                                </Flex>
                            </Flex>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Flex mt="3rem" mx="auto" w="90%0" display={{ base: "flex", md: "none" }} px="10%">
                    <AppButton variant="primary" colorScheme="brand" w="100%" to="/shop">
                        Shop Now
                    </AppButton>
                </Flex>
            </Box>
            {inventoryProductsSuccess && (
                <Box bg="bg.light" overflow="hidden">
                    <Box py="5rem" mx="auto" w="100%" color="typography.dark">
                        <Text
                            textAlign="left"
                            color="typography.dark"
                            fontSize={{ base: "2rem", sm: "2.5rem" }}
                            fontWeight="700"
                            ml={{ base: "1.5rem", sm: "3rem" }}
                        >
                            Hot Deals
                        </Text>
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            gap="2rem"
                            mt={{ base: "2rem", md: "4rem" }}
                            pl={{ base: "110rem", sm: "137rem" }}
                            overflow="hidden"
                            ref={parentRef as unknown as LegacyRef<HTMLDivElement>}
                        >
                            {inventoryProductsSuccess &&
                                inventoryProducts?.results?.length > 0 &&
                                inventoryProducts?.results?.map((item) => (
                                    <Box
                                        key={item.sku}
                                        className="w-full pt-4"
                                        minW={{ base: "20rem", sm: "25rem" }}
                                        onMouseEnter={() => setScrollDuration(10000)}
                                        onMouseLeave={() => setScrollDuration(30)}
                                    >
                                        <Flex
                                            flexDir="column"
                                            gap="3rem"
                                            justifyContent="center"
                                            alignItems="center"
                                            boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.2)"
                                            className="w-full bg-white p-8 rounded-3xl hover:scale-105 transition-all duration-300"
                                            as={Link}
                                            to={`/product/${item.sku}/`}
                                        >
                                            <Text
                                                fontSize="1.2rem"
                                                fontWeight="600"
                                                color="brand.orange"
                                                justifySelf="flex-end"
                                                ml="auto"
                                                textTransform="uppercase"
                                            >
                                                {item.condition}
                                            </Text>
                                            <img
                                                src={item.default_image}
                                                alt={item.product_name}
                                                className="h-[15rem] md:h-[23rem] mix-blend-darken"
                                            />
                                        </Flex>
                                        <Flex
                                            flexDir="column"
                                            alignSelf="flex-start"
                                            alignItems="flex-start"
                                            mt="2rem"
                                        >
                                            <Text fontSize="1.75rem" fontWeight={400}>
                                                {item.product_name}
                                            </Text>
                                            <Flex alignItems="baseline" flexDir="column">
                                                <Text
                                                    color="typography.dark"
                                                    fontSize="2rem"
                                                    fontWeight="600"
                                                >
                                                    {`$${item.sale_price}`}
                                                </Text>
                                                {item.store_price && (
                                                    <Text
                                                        color="typography.ash"
                                                        fontSize="1.5rem"
                                                        textDecoration="line-through"
                                                        fontFamily="Bebas Neue"
                                                    >
                                                        {`$${item.store_price}`}
                                                    </Text>
                                                )}
                                            </Flex>
                                        </Flex>
                                    </Box>
                                ))}
                        </Flex>
                    </Box>
                </Box>
            )}
            {trendingInventorySuccess && (
                <Box py="3rem" mx="auto" w="100%" color="typography.dark">
                    <Text
                        textAlign="left"
                        color="typography.dark"
                        fontSize={{ base: "2rem", sm: "2.5rem" }}
                        fontWeight="700"
                        ml={{ base: "1.5rem", sm: "3rem" }}
                    >
                        Shop by Categories
                    </Text>
                    <Grid
                        templateColumns={{
                            base: "repeat(2, 1fr)",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(6, 1fr)",
                        }}
                        mt="4rem"
                        justifyContent="center"
                        gap="3rem"
                        mx="2rem"
                        flexWrap={{ base: "wrap", md: "nowrap" }}
                    >
                        {trendingInventorySuccess &&
                            trendingInventory?.length > 0 &&
                            trendingInventory?.map((item) => (
                                <GridItem
                                    key={item?.id}
                                    className="hover:scale-105 transition-all duration-300 w-full bg-white px-2 md:px-4 py-8 rounded-3xl"
                                    boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.2)"
                                >
                                    <Flex
                                        flexDir="column"
                                        gap="3rem"
                                        justifyContent="center"
                                        alignItems="center"
                                        as={Link}
                                        to={`/shop?category=${item?.name.toLowerCase()}`}
                                    >
                                        <img
                                            src={item?.sample_product?.image}
                                            alt={item?.name}
                                            className="h-[14rem] md:h-[18rem] mt-6 mix-blend-darken"
                                        />
                                        <Text textAlign="center" fontSize="1.5rem" fontWeight={700}>
                                            {item?.name}
                                        </Text>
                                    </Flex>
                                </GridItem>
                            ))}
                    </Grid>
                </Box>
            )}
            <Seamless />
            <WaitList />
            <Footer />
        </Box>
    );
};

export default Home;
