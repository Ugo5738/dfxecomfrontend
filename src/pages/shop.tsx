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
    Checkbox,
    VStack,
    Collapse,
    useMediaQuery,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import Footer from "../components/footer";
import WaitList from "../components/waitlist";
import MainNav from "../components/mainNav";
import Seamless from "../components/seamless";
import ScrollNav from "../components/scrollNav";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { products } from "../utils/dummyData";
import { useGetProducts } from "../services/products";
import LoadingSpinner from "../components/loading";
import { ErrorPropsType, ParamsType, ProductResultType } from "../utils/types";
import Error404 from "../components/error";
import { useCalculateMinMaxPrice } from "../services/hooks";
import { useDebounce } from "./../services/hooks";
import AppButton from "../components/button";

const Shop = () => {
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    // const [categories, setCategories] = useState({});
    // const [brands, setBrands] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState<number[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [toggleFilters, setToggleFilters] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);
    const [params, setParams] = useState<ParamsType>({
        search: "",
        page_size: 12,
        page: page,
        product_name: "",
        brand_name: "",
        color: "",
        storage: "",
        attribute: "",
        price_min: "",
        price_max: "",
        condition: [],
    });

    const debouncedSearchTerm = useDebounce(searchTerm.trim(), 700);

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
    };

    const handlePriceFilter = (priceRange: { price_min: number; price_max: number }) => {
        setParams((prevParams) => ({
            ...prevParams,
            price_min: priceRange.price_min.toString(),
            price_max: priceRange.price_max.toString(),
        }));
    };

    const handleResetFilters = () => {
        // setCategories({});
        // setBrands([]);
        setParams((prevParams) => ({
            ...prevParams,
            search: "",
            brand_name: "",
            price_min: "",
            price_max: "",
            condition: [],
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

    if (productsInventoryLoading) {
        return <LoadingSpinner />;
    }

    if (productsInventoryError || !productsInventory?.results) {
        return <Error404 error={productsInventoryError as ErrorPropsType} />;
    }

    return (
        <Box>
            <MainNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ScrollNav />
            <Flex>
                {toggleFilters && (
                    <Flex
                        bg="white"
                        pl={{ base: "2rem", md: "1rem" }}
                        pr={{ base: "2rem", md: ".5rem" }}
                        py="2rem"
                        flexDir="column"
                        gap="3rem"
                        w={{ base: "100%", md: "30%", lg: "15%" }}
                        align="stretch"
                        position={{ base: "fixed", md: "static" }}
                        inset={{ base: "0", md: "auto" }}
                        minH="100vh"
                        overflowY={{ base: "auto", md: "hidden" }}
                        zIndex="100000"
                    >
                        <Flex
                            flexDir="column"
                            cursor="pointer"
                            display={{ base: "flex", md: "none" }}
                            onClick={() => setToggleFilters(false)}
                        >
                            <MdArrowBackIosNew className="text-4xl" />
                        </Flex>
                        <Flex flexDir="column" gap="1rem" align="start">
                            <Text fontWeight="600" fontSize="1.75rem">
                                Categories
                            </Text>
                            {Object.entries(products?.categories).map(
                                ([category, subCategories]) => (
                                    <Flex flexDir="column" key={category} gap="1rem" align="start">
                                        <Button
                                            variant="unstyled"
                                            fontSize="1.5rem"
                                            fontWeight="normal"
                                            _hover={{ color: "brand.orange" }}
                                            onClick={() => {
                                                setCurrentCategory((prevCategory) =>
                                                    prevCategory === category ? null : category,
                                                );
                                            }}
                                        >
                                            {category}
                                        </Button>
                                        <Collapse in={currentCategory === category} animateOpacity>
                                            <ul>
                                                {subCategories.map((subCategory) => (
                                                    <li key={subCategory} className="my-2 pl-4">
                                                        <Button
                                                            variant="ghost"
                                                            fontSize="1.25rem"
                                                            fontWeight="normal"
                                                            _active={{
                                                                color: "brand.orange",
                                                                fontWeight: "bold",
                                                            }}
                                                            isActive={params.search === subCategory}
                                                            onClick={() => {
                                                                handleCategoryFilter([subCategory]);
                                                            }}
                                                        >
                                                            {subCategory}
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Collapse>
                                    </Flex>
                                ),
                            )}
                        </Flex>
                        <Flex flexDir="column" gap="1rem">
                            <Text fontWeight="600" fontSize="1.75rem">
                                Brands
                            </Text>
                            <ul>
                                {products?.brands?.map((brand) => (
                                    <li key={brand} className="my-2">
                                        <Button
                                            variant="unstyled"
                                            fontSize="1.5rem"
                                            fontWeight="normal"
                                            _hover={{ color: "brand.orange" }}
                                            onClick={() => handleBrandFilter(brand)}
                                            _active={{
                                                color: "brand.orange",
                                                fontWeight: "bold",
                                            }}
                                            isActive={params.brand_name === brand}
                                        >
                                            {brand}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </Flex>
                        <Flex flexDir="column" gap="1rem">
                            <Text fontWeight="600" fontSize="1.75rem">
                                Prices
                            </Text>
                            <VStack spacing={4} align="stretch">
                                {products?.priceRange.map((priceRange) => (
                                    <Checkbox
                                        key={`${priceRange.price_min}-${priceRange.price_max}`}
                                        size="lg"
                                        colorScheme="orange"
                                        isChecked={
                                            params.price_min === priceRange.price_min.toString() &&
                                            params.price_max === priceRange.price_max.toString()
                                        }
                                        onChange={() => handlePriceFilter(priceRange)}
                                    >
                                        {`$${priceRange.price_min} - $${priceRange.price_max}`}
                                    </Checkbox>
                                ))}
                            </VStack>
                        </Flex>
                        <Flex>
                            <Button
                                variant="outline"
                                bg={"typography.ash"}
                                color="white"
                                fontSize="1.5rem"
                                fontWeight="bold"
                                w="full"
                                px="1rem"
                                onClick={handleResetFilters}
                                _hover={{ bg: "brand.orange", color: "white" }}
                            >
                                Reset Filters
                            </Button>
                        </Flex>
                    </Flex>
                )}

                <Flex bg="bg.light" p={{ base: "1rem", sm: "2rem" }} flexGrow="1" flexDir="column">
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
                                    Showing all products
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
                            base: "repeat(1, 1fr)",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(4, 1fr)",
                        }}
                        mt="4rem"
                        justifyContent="center"
                        gap="3rem"
                    >
                        {productsInventorySuccess &&
                            productItems?.map((item) => (
                                <Flex
                                    key={item.sku}
                                    flexDir="column"
                                    className="hover:scale-105 w-full bg-white py-8 px-4 sm:px-8 rounded-3xl"
                                    boxShadow="lg"
                                    justifyContent="space-between"
                                >
                                    <Image
                                        src={item.default_image}
                                        alt={item.product_name}
                                        height="20rem"
                                        objectFit="contain"
                                        mb="3rem"
                                    />
                                    <Text color="typography.dark" fontSize="1.5rem" minH="4rem">
                                        {item.product_name}
                                    </Text>
                                    <Flex alignItems="baseline" minH="4rem">
                                        <Text
                                            color="typography.dark"
                                            fontSize="2.2rem"
                                            fontWeight="600"
                                        >
                                            {`$${item.store_price}`}
                                        </Text>
                                        {item.discount_store_price && (
                                            <Text
                                                color="typography.red"
                                                fontSize="1.2rem"
                                                px="2"
                                                textDecoration="line-through"
                                            >
                                                {`$${item.discount_store_price}`}
                                            </Text>
                                        )}
                                    </Flex>
                                    <AppButton
                                        variant="primary"
                                        borderRadius=".3rem"
                                        height="3rem"
                                        loadingText="Adding to cart"
                                    >
                                        ADD TO CART
                                    </AppButton>
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
                            px={{ base: "1rem", sm: "2rem" }}
                            py="1rem"
                            fontSize={{ base: "1rem", sm: "1.5rem" }}
                            border="1px solid rgba(22, 22, 22, 0.50)"
                            onClick={handlePrevPage}
                            isDisabled={page === 1}
                            _active={{ bg: "brand.orange", color: "white" }}
                            _disabled={{
                                pointerEvents: "none",
                                cursor: "not-allowed",
                                opacity: 0.5,
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
                                    px={{ base: "1rem", md: "2rem" }}
                                    py="1rem"
                                    fontSize="1.5rem"
                                    border="1px solid rgba(22, 22, 22, 0.50)"
                                    onClick={() => handleSetPage(num)}
                                    _active={{ bg: "brand.orange", color: "white", border: "none" }}
                                    isActive={page === num}
                                >
                                    {num}
                                </Button>
                            ))}
                        </Box>
                        <Text
                            fontWeight="bold"
                            fontSize="1.2rem"
                            display={{ base: "block", md: "none" }}
                        >
                            <span className="text-[#DF6A12] mr-1">{page}</span>/
                            <span className="ml-1">{count}</span>
                        </Text>
                        <Button
                            colorScheme="brand"
                            variant="outline"
                            color="bg.opaque"
                            borderRadius=".3rem"
                            px={{ base: "1rem", sm: "2rem" }}
                            py="1rem"
                            fontSize={{ base: "1rem", sm: "1.5rem" }}
                            border="1px solid rgba(22, 22, 22, 0.50)"
                            onClick={handleNextPage}
                            isDisabled={page === count}
                            _active={{ bg: "brand.orange", color: "white" }}
                            _disabled={{
                                pointerEvents: "none",
                                cursor: "not-allowed",
                                opacity: 0.5,
                            }}
                            rightIcon={<BsChevronRight className="text-[#88888880] font-bold" />}
                        >
                            Next
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            <Seamless />
            <WaitList />
            <Footer />
        </Box>
    );
};

export default Shop;
