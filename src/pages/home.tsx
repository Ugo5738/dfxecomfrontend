import { Flex, Text, Box, Grid, GridItem, Image } from "@chakra-ui/react";
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
            scrollAmount++;
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
        <Box>
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
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log('slide change')}
                >
                    {homeCarousel.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Flex
                                // justifyContent="space-between"
                                flexDir={{ base: "column", md: "row" }}
                            >
                                <Flex
                                    flexDir="column"
                                    gap="1rem"
                                    alignItems={{ base: "center", md: "flex-start" }}
                                    mb={{ base: "5rem", md: "10rem" }}
                                    order={{ base: 2, md: 1 }}
                                    pl={{ base: "0", md: "3rem" }}
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
                                        w="12rem"
                                        mt={{ base: "2rem", md: "10rem" }}
                                        to="/shop"
                                    >
                                        Shop Now
                                    </AppButton>
                                </Flex>
                                <Flex
                                    order={{ base: 1, md: 2 }}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        w="full"
                                        h="full"
                                        minW={{ base: "15rem", sm: "25rem", md: "35rem" }}
                                        maxH={{ base: "20rem", sm: "full", md: "full" }}
                                        objectFit="contain"
                                        zIndex="10"
                                    />
                                </Flex>
                            </Flex>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Box bg="bg.light">
                <Box py="5rem" mx="auto" w={{ base: "90%", md: "80%" }} color="typography.dark">
                    <Text
                        textAlign="center"
                        color="typography.dark"
                        fontSize={{ base: "2rem", sm: "2.5rem" }}
                        fontWeight="700"
                    >
                        Hot Deals
                    </Text>
                    <Flex
                        justifyContent="center"
                        gap="3rem"
                        mt="4rem"
                        ref={parentRef as unknown as LegacyRef<HTMLDivElement>}
                        overflow="hidden"
                    >
                        {inventoryProductsSuccess &&
                            inventoryProducts?.results.length > 0 &&
                            inventoryProducts?.results?.map((item) => (
                                <Box
                                    key={item.sku}
                                    className="hover:scale-105 w-full pb-2 pt-4"
                                    minW="25rem"
                                    onMouseEnter={() => setScrollDuration(10000)}
                                    onMouseLeave={() => setScrollDuration(30)}
                                >
                                    <Flex
                                        flexDir="column"
                                        gap="3rem"
                                        justifyContent="center"
                                        alignItems="center"
                                        boxShadow="lg"
                                        className="w-full bg-white p-8 rounded-3xl"
                                        as={Link}
                                        to={`/product/${item.product_name}`}
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
                                            className="h-[27rem]"
                                        />
                                    </Flex>
                                    <Flex
                                        flexDir="column"
                                        alignSelf="flex-start"
                                        alignItems="flex-start"
                                        mt="2rem"
                                    >
                                        <Text fontSize="1.75rem">{item.product_name}</Text>
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
            <Box py="3rem" mx="auto" w={{ base: "90%", md: "80%" }} color="typography.dark">
                <Text
                    textAlign="center"
                    color="typography.dark"
                    fontSize={{ base: "2rem", sm: "2.5rem" }}
                    fontWeight="700"
                >
                    Shop by Categories
                </Text>
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                    }}
                    mt="4rem"
                    justifyContent="center"
                    gap="3rem"
                    flexWrap={{ base: "wrap", md: "nowrap" }}
                >
                    {trendingInventorySuccess &&
                        trendingInventory.length > 0 &&
                        trendingInventory?.map((item) => (
                            <GridItem
                                key={item?.id}
                                className="hover:scale-105 w-full bg-white p-8 rounded-3xl"
                                boxShadow="lg"
                                // maxW="25rem"
                                // w="full"
                            >
                                <Flex
                                    flexDir="column"
                                    gap="3rem"
                                    justifyContent="center"
                                    alignItems="center"
                                    as={Link}
                                    to={`/shop/${item?.name}`}
                                >
                                    <img
                                        src={item?.sample_product?.image}
                                        alt={item?.name}
                                        className="h-[18rem]"
                                    />
                                    <Text
                                        textAlign="center"
                                        fontSize={{ base: "1.5rem", sm: "2rem" }}
                                        fontWeight="600"
                                        mt="1rem"
                                    >
                                        {item?.name}
                                    </Text>
                                </Flex>
                            </GridItem>
                        ))}
                </Grid>
            </Box>
            <Seamless />
            <WaitList />
            <Footer />
        </Box>
    );
};

export default Home;
