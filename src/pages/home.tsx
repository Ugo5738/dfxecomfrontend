/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import { homeCarousel } from "../utils/staticData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import AppButton from "../components/button";
// import Nav from "../components/nav";
import WaitList from "../components/waitlist";

import Seamless from "../components/seamless";
import { useGetTrendingInventory, useGetInventorySalesProducts } from "../services/products";
import LoadingSpinner from "../components/loading";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { ParentRefType } from "../utils/types";
import Header from "../layouts/Header";
import styled from "styled-components";

const Home = () => {
  const {
    data: trendingInventory,
    // error: trendingInventoryError,
    isLoading: trendingInventoryLoading,
    isSuccess: trendingInventorySuccess,
  } = useGetTrendingInventory();
  
  const {
    data: inventoryProducts,
    // error: inventoryProductsError,
    isLoading: inventoryProductsLoading,
    isSuccess: inventoryProductsSuccess,
  } = useGetInventorySalesProducts();

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

  return (
    <Wrapper>
      <Box overflowX="hidden">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Box bg="bg.main" py={{ base: "3rem", sm: "5rem" }} color="typography.dark">
          <div className="container">
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
                  <Flex w="100%">
                    <Box flex="1" width="80%" height="60">
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        mb="22rem"
                        minHeight="100px"
                        backgroundImage={`url(${item.image})`}
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        backgroundPosition="center"
                        zIndex="1"
                      ></Box>
                    </Box>

                    <Flex
                      flexDir="column"
                      gap="1rem"
                      mb={{ base: "4rem", md: "10rem" }}
                      w="full"
                      minH="10rem"
                      zIndex="2"
                    >
                      <Text
                        color="brand.orange"
                        fontSize="2.5rem"
                        fontFamily="Raleway Variable"
                        fontWeight="600"
                        display={{ base: "none", md: "flex" }}
                      >
                        {"New"}
                      </Text>
                      <Flex flexDir="column" display={{ base: "none", md: "flex" }}>
                        <Text
                          fontSize={{ base: "3rem", md: "3rem" }}
                          fontFamily="Raleway Variable"
                          fontWeight="600"
                          mb="-1rem"
                        >
                          {item.title}
                        </Text>
                        <Text
                          fontSize={{ base: "6rem", md: "5rem" }}
                          fontFamily="Lato"
                          fontWeight="700"
                          whiteSpace="nowrap"
                        >
                          {item.header}
                        </Text>
                      </Flex>
                      <Text
                        fontSize="2.625rem"
                        fontWeight="700"
                        lineHeight="normal"
                        maxW="580px"
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
                        fontFamily="Roboto Slab"
                      >
                        Shop Now
                      </AppButton>
                    </Flex>
                  </Flex>
                </SwiperSlide>
              ))}
            </Swiper>
            <Flex mt="3rem" mx="auto" w="90%" display={{ base: "flex", md: "none" }}>
              <AppButton variant="primary" colorScheme="brand" w="100%" to="/shop">
                Shop Now
              </AppButton>
            </Flex>
          </div>
        </Box>
        {inventoryProductsSuccess && (
          <Box bg="bg.light" overflow="hidden">
            <div className="container">
              <Box py="2rem" mx="auto" w="100%" color="typography.dark">
                <Text
                  textAlign="left"
                  color="typography.dark"
                  fontSize={{ base: "2rem", sm: "3rem" }}
                  fontWeight="700"
                  // ml={{ base: "1.5rem", sm: "3rem" }}
                >
                  Hot Deals
                </Text>
                <Flex
                  className=""
                  justifyContent="center"
                  alignItems="center"
                  gap="1rem"
                  // pt={{ base: "2rem", md: "4rem" }}
                  overflow="hidden"
                  ref={parentRef as unknown as LegacyRef<HTMLDivElement>}
                >
                  {inventoryProductsSuccess &&
                    inventoryProducts?.results?.length &&
                    inventoryProducts?.results?.map((item) => (
                      <Box
                        key={item.sku}
                        className="w-full "
                        padding={0}
                        minW={{ base: "10rem", sm: "25rem" }}
                        onMouseEnter={() => setScrollDuration(10000)}
                        onMouseLeave={() => setScrollDuration(30)}
                      >
                        <Link
                          className="image-link w-full bg-white rounded-2xl hover:scale-105 transition-all duration-300"
                          to={`/product/${item.sku}/`}
                        >
                          <Text
                            fontSize="1rem"
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
                            className="h-[8rem] md:h-[23rem] sm:h-[9rem] mix-blend-darken"
                          />
                          {/* <img
                                                src="https://dfxfolder.s3.amazonaws.com/media/inventory/iphone_13_kxK7AID.jpg"
                                                alt={item.product_name}
                                                className="h-[15rem] md:h-[23rem] mix-blend-darken"
                                            /> */}
                        </Link>
                        <Flex
                          flexDir="column"
                          alignSelf="flex-start"
                          alignItems="flex-start"
                          mt="1rem"
                        >
                          <Text fontSize={{ base: "1rem", sm: "16px" }} fontWeight={400}>
                            {item.product_name}
                          </Text>
                          <Flex alignItems="baseline" flexDir="column">
                            <Text
                              color="typography.dark"
                              fontSize={{ base: "1rem", sm: "2rem" }}
                              fontWeight="600"
                              margin={0}
                            >
                              {`₦${item.sale_price}`}
                            </Text>
                            {item.store_price && (
                              <Text
                                color="typography.ash"
                                fontSize="1rem"
                                textDecoration="line-through"
                                fontFamily="Bebas Neue"
                              >
                                {`₦${item.store_price}`}
                              </Text>
                            )}
                          </Flex>
                        </Flex>
                      </Box>
                    ))}
                </Flex>
              </Box>
            </div>
          </Box>
        )}
        {trendingInventorySuccess && (
          <Box py="3rem" mx="auto" w="100%" color="typography.dark">
            <div className="container">
              <Text
                textAlign="left"
                color="typography.dark"
                fontSize={{ base: "2rem", sm: "2.5rem" }}
                fontWeight="700"
                // ml={{ base: "1.5rem", sm: "3rem" }}
              >
                Shop by Categories
              </Text>
              <div
                className="cat-grid"
                // templateColumns={{
                //   base: "repeat(3, 1fr)",
                //   sm: "repeat(3, 1fr)",
                //   md: "repeat(3, 1fr)",
                //   lg: "repeat(6, 1fr)",
                // }}
                // mt="4rem"
                // justifyContent="center"
                // gap="1rem"
                // // mx="2rem"
                // flexWrap={{ base: "wrap", md: "nowrap" }}
              >
                {trendingInventorySuccess &&
                  trendingInventory?.length &&
                  trendingInventory?.map((item) => (
                    <div
                      key={item?.id}
                      className=" i-grid hover:scale-105 transition-all duration-300 bg-white rounded-3xl"
                    >
                      <Flex
                        flexDir="column"
                        className="flex"
                        gap="1rem"
                        justifyContent="center"
                        alignItems="center"
                        as={Link}
                        to={`/shop?category=${item?.name}`}
                      >
                        <div className="img-holder">
                          <img
                            src={item?.sample_product?.image || "/iphone-14.png"}
                            alt={item?.name}
                            className="  mix-blend-darken"
                          />
                        </div>
                        <p className="m-0">{item?.name}</p>
                      </Flex>
                    </div>
                  ))}
              </div>
            </div>
          </Box>
        )}
        <Seamless />
        <WaitList />
        <Footer />
      </Box>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  .image-link {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.5rem 2rem 1.5rem;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
    @media screen and (max-width: 700px) {
      padding: 5px 1rem 1rem 1rem;
      img {
        width: 100%;
      }
    }
  }

  .cat-grid {
    display: grid;
    grid-gap: 10px;
    height: auto;
    justify-content: center;
    flex-wrap: wrap;
    grid-template-columns: repeat(6, 1fr);
    .i-grid {
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
      height: 100%;
      padding: 1rem;
      .flex {
        .img-holder {
          height: 25vh;
          width: 100%;
          .mix-blend-darken {
            height: 100%;
            width: 100%;
          }
        }
        p {
          font-size: 16px;
          text-align: center;
        }
      }
    }
    @media screen and (max-width: 920px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (max-width: 720px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(3, 1fr);
      flex-wrap: nowrap;
      .i-grid {
        .flex {
          .img-holder {
            height: 9rem;
            width: 100%;
          }
          p {
            font-size: 12px;
            text-align: center;
          }
        }
      }
    }
  }

  .accordion-body {
    display: block;
    background-color: red;
  }
  .underline {
    border-bottom: 1px solid #161616;
  }
`;
