import {
  Flex,
  Grid,
  Text,
  Box,
  Image,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Collapse,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import Footer from "../components/footer";
import WaitList from "../components/waitlist";
// import MainNav from "../components/mainNav";
import Seamless from "../components/seamless";
// import ScrollNav from "../components/scrollNav";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiChevronRight } from "react-icons/bi";
import { BiChevronDown } from "react-icons/bi";
// import { products } from "../utils/dummyData";
import { useGetProducts, useGetBrands, useGetCategories } from "../services/products";
import LoadingSpinner from "../components/loading";
import { ErrorPropsType, ParamsType, ProductResultType } from "../utils/types";
import Error404 from "../components/error";
import { useCalculateMinMaxPrice } from "../services/hooks";
import { useDebounce } from "./../services/hooks";
import AppButton from "../components/button";
import Header from "../layouts/Header";
import styled from "styled-components";

const Shop = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [toggleFilters, setToggleFilters] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [params, setParams] = useState<ParamsType>({
    search: searchParams.get("category") || "",
    page_size: 12,
    page: page,
    product_name: "",
    brand_name: "",
    color: "",
    storage: "",
    attribute: "",
    price_min: "",
    price_max: "",
    condition: "",
  });
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 700);

  const { data: brandsData } = useGetBrands();
  const { data: categoriesData } = useGetCategories();
  const {
    data: productsInventory,
    error: productsInventoryError,
    isLoading: productsInventoryLoading,
    isSuccess: productsInventorySuccess,
  } = useGetProducts({
    page_size: 12,
    ...params,
  });
  const { count, results } = productsInventory! || {};
  const [productItems, setProductItems] = useState<ProductResultType[] | undefined>(results);
  const { current_min_price, current_max_price } = useCalculateMinMaxPrice(productItems!);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const toggleAccordion2 = () => {
    setIsOpen2(!isOpen2);
  };

  useEffect(() => {
    const newPages = [...Array(5).keys()].map((num) => num + 1 + pageCount);
    setPages(newPages);
  }, [pageCount, setPage]);

  useEffect(() => {
    if (productsInventory && productsInventory?.results?.length > 0) {
      setProductItems(productsInventory?.results);
    }
  }, [productsInventory]);

  useEffect(() => {
    if (!debouncedSearchTerm) return;

    setParams((prevParams) => ({
      ...prevParams,
      search: debouncedSearchTerm,
    }));
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (isLargerThan768) {
      setToggleFilters(true);
    } else {
      setToggleFilters(false);
    }
  }, [isLargerThan768]);

  const handleCategoryFilter = (subCategories: string[]) => {
    setParams((prevParams) => ({ ...prevParams, search: subCategories[0], brand_name: "" }));
  };

  const handleBrandFilter = (brand: string) => {
    setParams((prevParams) => ({ ...prevParams, brand_name: brand, search: "" }));
    const filteredProducts = productItems?.filter((item) => item.product_name === brand);
    setProductItems(filteredProducts);
  };

  // const handlePriceFilter = (priceRange: { price_min?: number; price_max?: number }) => {
  //   setParams((prevParams) => ({
  //     ...prevParams,
  //     price_min: priceRange?.price_min?.toString(),
  //     price_max: priceRange?.price_max?.toString(),
  //   }));
  // };

  const handleResetFilters = () => {
    setParams((prevParams) => ({
      ...prevParams,
      search: "",
      brand_name: "",
      price_min: "",
      price_max: "",
      condition: "",
    }));
    setCurrentCategory(null);
    setProductItems(results);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setParams((prevParams) => ({ ...prevParams, page: page + 1 }));
    if (page === pages[pages.length - 1]) {
      setPageCount((prevPageCount) => prevPageCount + 1);
    }
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
    setParams((prevParams) => ({ ...prevParams, page: page - 1 }));
    if (page === pages[0] && page !== 1) {
      setPageCount((prevPageCount) => prevPageCount - 1);
    }
  };

  const handleSetPage = (page: number) => {
    setPage(page);
    setParams((prevParams) => ({ ...prevParams, page: page }));
  };

  // const filteredCategory = productItems?.filter((pro) => pro?.product_name === currentCategory);

  if (productsInventoryLoading) {
    return <LoadingSpinner />;
  }

  if (productsInventoryError || !productsInventory?.results) {
    return <Error404 error={productsInventoryError as ErrorPropsType} />;
  }

  return (
    <Box>
      {/* <MainNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ScrollNav /> */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Wrapper>
        <div className="category container">
          <Flex align="center" marginBottom="2rem" as={Link} to="/">
            <MdArrowBackIosNew className="text-4xl" />
            <Text fontWeight="700" fontSize="2rem" margin={0} marginLeft="1rem">
              Categories
            </Text>
          </Flex>
          <div className="d-flex">
            {categoriesItems?.map((cat) => (
              <div
                key={cat?.id}
                className="inner"
                onClick={() => {
                  setCurrentCategory((prevCategory) =>
                    prevCategory === cat.name ? null : cat.name,
                  );
                }}
              >
                <div className="img">
                  <img src={cat?.img} alt="" />
                </div>
                <p>{cat?.name}</p>
              </div>
            ))}
          </div>
          {productsInventorySuccess && (
            <Flex>
              {toggleFilters && (
                <Flex
                  bg="white"
                  pl={{ base: "1rem", md: "1rem" }}
                  pr={{ base: "1rem", md: "1rem" }}
                  py="2rem"
                  flexDir="column"
                  gap="3rem"
                  w={{ base: "100%", md: "30%", lg: "30%" }}
                  align="stretch"
                  position={{ base: "fixed", md: "static" }}
                  inset={{ base: "0", md: "auto" }}
                  minH="100vh"
                  overflowY={{ base: "auto", md: "hidden" }}
                  zIndex="5"
                >
                  <Flex
                    flexDir="column"
                    cursor="pointer"
                    display={{ base: "flex", md: "none" }}
                    onClick={() => setToggleFilters(false)}
                  >
                    <MdArrowBackIosNew className="text-4xl" />
                  </Flex>
                  <Flex flexDir="column" gap="1rem" align="start" pt="1rem">
                    <div className="d-flex justify-content-between" onClick={toggleAccordion2}>
                      <Text fontWeight="700" fontSize="1.75rem">
                        Categories
                      </Text>
                      <div>
                        {isOpen2 ? (
                          <BiChevronDown className="text-4xl" />
                        ) : (
                          <BiChevronRight className="text-4xl" />
                        )}
                      </div>
                    </div>
                    {isOpen2 &&
                      categoriesData?.map((category) => (
                        <Flex flexDir="column" key={category.name} gap="1rem" align="start">
                          <Button
                            variant="unstyled"
                            fontSize="16px"
                            fontWeight="500"
                            _hover={{ color: "brand.orange" }}
                            onClick={() => {
                              setCurrentCategory((prevCategory) =>
                                prevCategory === category.name ? null : category.name,
                              );
                            }}
                          >
                            {category.name}
                          </Button>
                          <Collapse in={currentCategory === category.name} animateOpacity>
                            <ul className="p-0">
                              {category.children.map((subCategory) => (
                                <li
                                  key={`${subCategory.id}-${subCategory.name}`}
                                  className="my-1 pl-2"
                                >
                                  <Button
                                    variant="ghost"
                                    fontSize="15px"
                                    fontWeight="normal"
                                    _active={{
                                      color: "brand.orange",
                                      fontWeight: "bold",
                                    }}
                                    isActive={params.search === subCategory.name}
                                    onClick={() => {
                                      handleCategoryFilter([subCategory.name]);
                                      setToggleFilters((filters) => !filters);
                                    }}
                                  >
                                    {subCategory.name}
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </Collapse>
                        </Flex>
                      ))}
                  </Flex>
                  <div className="underline"></div>

                  <Flex flexDir="column" gap="1rem">
                    <div className="d-flex justify-content-between" onClick={toggleAccordion}>
                      <Text fontWeight="700" fontSize="1.75rem">
                        Brand
                      </Text>
                      <div>
                        {isOpen ? (
                          <BiChevronDown className="text-4xl" />
                        ) : (
                          <BiChevronRight className="text-4xl" />
                        )}
                      </div>
                    </div>
                    {isOpen && (
                      <ul>
                        {brandsData?.results?.map((brand) => (
                          <li key={brand.id} className="my-2">
                            <Button
                              variant="unstyled"
                              fontSize="1.5rem"
                              fontWeight="normal"
                              _hover={{ color: "brand.orange" }}
                              onClick={() => {
                                handleBrandFilter(brand?.name);
                                setToggleFilters((filters) => !filters);
                              }}
                              _active={{
                                color: "brand.orange",
                                fontWeight: "bold",
                              }}
                              isActive={params.brand_name === brand.name}
                            >
                              {brand.name}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="underline"></div>
                  </Flex>
                  <Flex flexDir="column" gap="1rem">
                    <Text fontWeight="600" fontSize="1.75rem">
                      Prices ($)
                    </Text>
                    <div className="row">
                      <div className="form-group col-6">
                        <label htmlFor="">MIN.</label>
                        <input type="number" placeholder="1,500" />
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="">MAX.</label>
                        <input type="number" placeholder="1,000,000" />
                      </div>
                    </div>
                    <div className="lines">
                      <div className="circle"></div>
                      <div className="line"></div>
                      <div className="circle"></div>
                    </div>
                    <div className="linehr"></div>
                    {/* <VStack spacing={4} align="stretch">
                    {products?.priceRange.map((priceRange) => (
                      <Checkbox
                        key={`${priceRange.price_min}-${priceRange.price_max}`}
                        size="lg"
                        colorScheme="orange"
                        isChecked={
                          params.price_min === priceRange?.price_min?.toString() &&
                          params.price_max === priceRange?.price_max?.toString()
                        }
                        onChange={() => handlePriceFilter(priceRange)}
                      >
                        {`$${priceRange.price_min} - $${priceRange.price_max}`}
                      </Checkbox>
                    ))}
                  </VStack> */}
                  </Flex>
                  <Flex>
                    <Button
                      variant="outline"
                      bg={"typography.ash"}
                      color="white"
                      fontSize="1.5rem"
                      fontWeight="bold"
                      marginTop="5rem"
                      w="full"
                      px="1rem"
                      onClick={handleResetFilters}
                      _hover={{ bg: "brand.orange", color: "white" }}
                    >
                      Reset
                    </Button>
                  </Flex>
                </Flex>
              )}

              <Flex
                bg="bg.light"
                p={{ base: "1rem", sm: "2rem" }}
                flexGrow="1"
                flexDir="column"
                mt="3rem"
                mr="1rem"
              >
                <Flex flexDir="column">
                  <Breadcrumb
                    spacing="4px"
                    fontSize="1.75rem"
                    separator={<BsChevronRight className="text-gray-500" />}
                    display={{ base: "none", md: "flex" }}
                  >
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        as={Link}
                        to="#"
                        textDecoration="none"
                        color="bg.opaque"
                        fontSize={{ base: "1.3rem", md: "2rem" }}
                      >
                        DFX Gadgets Hub
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        as={Link}
                        to="#"
                        isCurrentPage
                        fontSize={{ base: "1.5rem", md: "2rem" }}
                      >
                        Products
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </Breadcrumb>
                  <Flex alignItems="center" my="1rem">
                    <Text fontSize="1.5rem" fontWeight="bold">
                      Price
                    </Text>
                    <Text
                      bg="white"
                      borderRadius=".3rem"
                      p=".5rem 1rem"
                      mx=".5rem"
                      color="bg.opaque"
                    >{`$${current_min_price}`}</Text>
                    <Text>-</Text>
                    <Text
                      bg="white"
                      borderRadius=".3rem"
                      p=".5rem 1rem"
                      mx=".5rem"
                      color="bg.opaque"
                    >{`$${current_max_price}`}</Text>
                  </Flex>
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap="1rem"
                    mt="1rem"
                    display={{ base: "flex", md: "none" }}
                  >
                    <Flex flexDir="column">
                      <Text
                        fontWeight="600"
                        color="typography.dark"
                        fontSize="1.8rem"
                        textTransform="capitalize"
                      >
                        {params.search ||
                          params.product_name ||
                          params.brand_name ||
                          currentCategory ||
                          "All Products"}
                      </Text>
                      <Text color="typography.ash" fontSize="1.2rem">
                        Showing {currentCategory || "all products"}
                      </Text>
                    </Flex>
                    <AppButton
                      variant="dark"
                      borderRadius=".3rem"
                      height="3rem"
                      w="6rem"
                      justifySelf="flex-end"
                      ml="auto"
                      onClick={() => setToggleFilters((filters) => !filters)}
                    >
                      Filters
                    </AppButton>
                  </Flex>
                </Flex>
                <Grid
                  templateColumns={{
                    base: "repeat(2, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  mt="2rem"
                  justifyContent="center"
                  gap={{ base: "1rem", sm: "2rem" }}
                >
                  {productsInventorySuccess &&
                    productItems?.map((item) => (
                      <Flex
                        key={item?.sku}
                        flexDir="column"
                        className="hover:scale-105 transition-all duration-300 w-full bg-white p-4 sm:p-8 rounded-3xl"
                        boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.2)"
                        justifyContent="space-between"
                        as={Link}
                        to={`/product/${item?.sku}/`}
                      >
                        <Image
                          src={item?.default_image}
                          alt={item?.product_name}
                          height={{ base: "10rem", sm: "20rem" }}
                          objectFit="contain"
                          my={{ base: "1rem", sm: "3rem", md: "0" }}
                          mixBlendMode="darken"
                        />
                        <Text
                          color="typography.dark"
                          fontSize={{ base: "1rem", sm: "1.5rem" }}
                          minH={{ base: "1.85rem", sm: "4rem" }}
                        >
                          {item?.product_name}
                        </Text>
                        <Flex alignItems="baseline">
                          <Text
                            color="typography.dark"
                            fontSize={{ base: "14px", sm: "16px" }}
                            fontWeight="600"
                          >
                            {`$${item?.store_price}`}
                          </Text>
                          {item?.discount_store_price && (
                            <Text
                              color="typography.red"
                              fontSize={{ base: "14px", sm: "14px" }}
                              px="2"
                              textDecoration="line-through"
                            >
                              {`$${item?.discount_store_price}`}
                            </Text>
                          )}
                        </Flex>
                        {/* <div className="d-flex align-items-center">
                        <img src="/star.png" alt="" style={{ height: "1rem", width: "1rem" }} />
                        <img src="/star.png" alt="" style={{ height: "1rem", width: "1rem" }} />
                        <img src="/star.png" alt="" style={{ height: "1rem", width: "1rem" }} />
                        <img src="/star.png" alt="" style={{ height: "1rem", width: "1rem" }} />
                        <img src="/star.png" alt="" style={{ height: "1rem", width: "1rem" }} />
                        <small>(48)</small>
                      </div> */}
                      </Flex>
                    ))}
                </Grid>
                <Flex
                  alignItems="center"
                  justifyContent={{ base: "space-between", md: "center" }}
                  gap="2rem"
                  bg="white"
                  p="1rem"
                  mt="3rem"
                >
                  <Button
                    colorScheme="brand"
                    variant="outline"
                    color="bg.opaque"
                    borderRadius=".3rem"
                    h="3.5rem"
                    w="9.5rem"
                    textColor="#000"
                    fontSize={{ base: "12px", sm: "1.5rem" }}
                    border="1px solid rgba(22, 22, 22, 0.50)"
                    onClick={handlePrevPage}
                    isDisabled={page === 1}
                    _active={{ bg: "brand.orange", color: "white" }}
                    _disabled={{
                      pointerEvents: "none",
                      cursor: "not-allowed",
                      opacity: 0.5,
                      textColor: "#88888880",
                    }}
                    leftIcon={<BsChevronLeft className="text-[#88888880] font-bold" />}
                  >
                    Previous
                  </Button>
                  <Box display={{ base: "none", md: "block" }}>
                    {pages.map((num) => (
                      <Button
                        key={num + Math.random() * 1000}
                        colorScheme="brand"
                        variant="outline"
                        color="bg.opaque"
                        borderRadius=".3rem"
                        m=".5rem"
                        h="3.5rem"
                        w="3.5rem"
                        fontSize="1.5rem"
                        border="1px solid rgba(22, 22, 22, 0.50)"
                        onClick={() => handleSetPage(num)}
                        _active={{
                          bg: "brand.orange",
                          color: "white",
                          border: "none",
                        }}
                        isActive={page === num}
                      >
                        {num}
                      </Button>
                    ))}
                  </Box>
                  <Text fontWeight="bold" fontSize="1.2rem" display={{ base: "block", md: "none" }}>
                    <span className="text-[#DF6A12] mr-1">{page}</span>/
                    <span className="ml-1">{count}</span>
                  </Text>
                  <Button
                    colorScheme="brand"
                    variant="outline"
                    color="bg.opaque"
                    borderRadius=".3rem"
                    h="3.5rem"
                    w="7rem"
                    textColor="#000"
                    fontSize={{ base: "12px", sm: "1.5rem" }}
                    border="1px solid rgba(22, 22, 22, 0.50)"
                    onClick={handleNextPage}
                    isDisabled={productItems && productItems?.length < 12}
                    _active={{ bg: "brand.orange", color: "white" }}
                    _disabled={{
                      pointerEvents: "none",
                      cursor: "not-allowed",
                      opacity: 0.5,
                      textColor: "#88888880",
                    }}
                    rightIcon={<BsChevronRight className="text-[#88888880] font-bold" />}
                  >
                    Next
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          )}
          <Seamless />
          <WaitList />
          <Footer />
        </div>
      </Wrapper>
    </Box>
  );
};

export default Shop;
const Wrapper = styled.div`
  .category {
    padding-top: 2rem;
    background-color: #f4f4ff;
    .d-flex {
      width: 100%;
      justify-content: space-between;
      // align-items: center;
      gap: 1rem;
      .inner {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        width: 20%;
        .img {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #ceceee;
        }
      }
    }
    .row {
      justify-content: space-between;
      .form-group {
        input {
          width: 100%;
          padding: 0 1rem;
          height: 40px;
          border-radius: 5px;
          border: 0.5px solid #161616;
        }
      }
    }
    .lines {
      margin-top: 4rem;
      width: 100%;
      display: flex;
      align-items: center;
      .circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #3e3fcd;
      }
      .line {
        width: 100%;
        height: 2px;
        background: #3e3fcd;
      }
    }
    .linehr {
      margin-top: 8vh;
      width: 100%;
      height: 0.5px;
      background: #161616;
    }
  }
`;

const categoriesItems = [
  { id: 1, img: "/ass.png", name: "Accessories" },
  { id: 2, img: "/com.png", name: "Computing" },
  { id: 3, img: "/game.png", name: "Gaming" },
  { id: 4, img: "/mobile.png", name: "Mobile" },
  { id: 5, img: "/wear.png", name: "Wearable Technology" },
];
