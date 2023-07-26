import { Flex, Text, Box, Grid, GridItem, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import Footer from "../components/footer";
// import { useGetUser } from "../services/auth";
import { seamLessShopping, shopCategories, hotDeals } from "../utils/dummyData";
import { homeCarousel } from "../utils/staticData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import AppButton from "../components/button";
import Nav from "../components/nav";
import WaitList from "../components/waitlist";

const Home = () => {
    // const { data: user, error, isLoading, isSuccess } = useGetUser();
    // console.log("user", user, "error", error, "isLoading", isLoading, "isSuccess", isSuccess);
    return (
        <Box>
            <Box>
                <Nav />
            </Box>
            <Box bg="bg.main" py="5rem" pl={{ base: "1.5rem", sm: "3rem" }} color="typography.dark">
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
                            <Flex justifyContent="space-between">
                                <Flex
                                    flexDir="column"
                                    gap="1rem"
                                    mb={{ base: "5rem", sm: "10rem" }}
                                    position={{ base: "relative", sm: "static" }}
                                >
                                    <Text color="brand.orange" fontSize="1.5rem" fontWeight="600">
                                        {"New"}
                                    </Text>
                                    <Flex flexDir="column">
                                        <Text
                                            fontSize={{ base: "1.75rem", sm: "2rem" }}
                                            fontWeight="600"
                                            mb="-1rem"
                                        >
                                            {item.title}
                                        </Text>
                                        <Text
                                            fontSize={{ base: "2.5rem", sm: "3rem" }}
                                            fontWeight="800"
                                            whiteSpace="nowrap"
                                        >
                                            {item.header}
                                        </Text>
                                    </Flex>
                                    <Text fontSize="1.5rem" fontWeight="500" lineHeight="1.8rem">
                                        {item.text}
                                    </Text>
                                    <AppButton
                                        variant="primary"
                                        colorScheme="brand"
                                        w="12rem"
                                        mt="10rem"
                                    >
                                        Shop Now
                                    </AppButton>
                                    <Image
                                        src={item.imgSrc}
                                        alt={item.title}
                                        display={{ base: "block", sm: "none" }}
                                        position="absolute"
                                        top="0"
                                        right="0"
                                        bottom="5%"
                                        left="0"
                                        minH="30rem"
                                        minW="30rem"
                                        maxH="50rem"
                                        width="100%"
                                        height="100%"
                                        objectFit="contain"
                                        zIndex="-10"
                                    />
                                </Flex>
                                <Flex
                                    maxH={"50rem"}
                                    justifyContent="flex-end"
                                    display={{ base: "none", sm: "flex" }}
                                >
                                    <Image
                                        src={item.imgSrc}
                                        alt={item.title}
                                        minH="40rem"
                                        minW="40rem"
                                        className="object-contain"
                                        zIndex="-10"
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
                        {hotDeals.map((item) => (
                            <GridItem
                                key={item.id}
                                className="hover:scale-105 w-full bg-white p-8 rounded-3xl"
                                boxShadow="lg"
                            >
                                <Link to={`/${item.name}`}>
                                    <Flex
                                        flexDir="column"
                                        gap="3rem"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Flex
                                            flexDir="column"
                                            alignSelf="flex-start"
                                            alignItems="flex-start"
                                        >
                                            <Text
                                                fontSize="1.2rem"
                                                fontWeight="600"
                                                color="brand.orange"
                                            >
                                                New
                                            </Text>
                                            <Text fontSize="1.5rem" fontWeight="600">
                                                {item.name}
                                            </Text>
                                            <Text fontSize="1.35rem" fontWeight="500">
                                                {item.price}
                                            </Text>
                                        </Flex>
                                        <img
                                            src={item.imgSrc}
                                            alt={item.name}
                                            className="h-[21rem]"
                                        />
                                    </Flex>
                                </Link>
                            </GridItem>
                        ))}
                    </Grid>
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
                        md: "repeat(4, 1fr)",
                    }}
                    mt="4rem"
                    justifyContent="center"
                    gap="3rem"
                    flexWrap={{ base: "wrap", md: "nowrap" }}
                >
                    {shopCategories.map((item) => (
                        <GridItem
                            key={item.id}
                            className="hover:scale-105 w-full bg-white p-8 rounded-3xl"
                            boxShadow="lg"
                        >
                            <Link to={`/${item.title}`}>
                                <Flex
                                    flexDir="column"
                                    gap="3rem"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Text
                                        textAlign="center"
                                        fontSize={{ base: "1.5rem", sm: "2rem" }}
                                        fontWeight="600"
                                        mt="1rem"
                                    >
                                        {item.title}
                                    </Text>
                                    <img src={item.imgSrc} alt={item.title} className="h-[21rem]" />
                                </Flex>
                            </Link>
                        </GridItem>
                    ))}
                </Grid>
            </Box>
            <Box py="3rem" mx="auto" w={{ base: "96%", md: "80%" }} color="typography.dark">
                <Text
                    textAlign="center"
                    color="typography.dark"
                    fontSize={{ base: "2rem", sm: "2.5rem" }}
                    fontWeight="700"
                >
                    Seamless Shopping Through DFX Gadgets Hub
                </Text>
                <Flex
                    mt="4rem"
                    justifyContent="center"
                    alignItems="center"
                    gap="3rem"
                    flexWrap={{ base: "wrap", sm: "nowrap" }}
                >
                    {seamLessShopping.map((item) => (
                        <Flex
                            key={item.id}
                            flexDir="column"
                            gap=".5rem"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <img src={item.imgSrc} alt={item.title} className="w-[8rem] h-[6rem]" />
                            <Text
                                textAlign="center"
                                fontSize={{ base: "1.5rem", sm: "2rem" }}
                                fontWeight="600"
                                mt="1rem"
                            >
                                {item.title}
                            </Text>
                            <Text
                                textAlign="center"
                                fontSize={{ base: "1.2rem", sm: "1.5rem" }}
                                lineHeight="2rem"
                            >
                                {item.description}
                            </Text>
                            <Link
                                to="/shop"
                                className="text-[1.5rem] font-semibold mt-1 sm:mt-4 flex items-center flex-nowrap gap-2 hover:underline"
                            >
                                Learn More <FiExternalLink />
                            </Link>
                        </Flex>
                    ))}
                </Flex>
            </Box>
            <WaitList />
            <Footer />
        </Box>
    );
};

export default Home;
