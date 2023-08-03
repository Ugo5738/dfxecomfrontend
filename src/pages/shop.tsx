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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import WaitList from "../components/waitlist";
import MainNav from "../components/mainNav";
import Seamless from "../components/seamless";
import ScrollNav from "../components/scrollNav";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { products } from "../utils/dummyData";

const itemsPerPage = 14;

const Shop = () => {
    const [page, setPage] = useState(1);
    // const [price, setPrice] = useState({ min: 0, max: 0 });
    const duplicatedProductItems = Array.from({ length: 15 }, () => products?.nodes).flat();
    const [productItems, setProductItems] = useState(duplicatedProductItems);
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);
    // const [filteredCategories, setFilteredCategories] = useState({});
    // const [filteredBrands, setFilteredBrands] = useState([]);
    // const [filteredPrices, setFilteredPrices] = useState([]);
    const pages = [...Array(5).keys()].map((num) => num + 1);

    // Paginate the filtered products
    const skip = page * itemsPerPage - itemsPerPage;

    useEffect(() => {
        setProductItems(duplicatedProductItems);
    }, [duplicatedProductItems]);

    return (
        <Box>
            <MainNav />
            <ScrollNav />
            <Flex>
                <Flex
                    bg="white"
                    px="2rem"
                    py="3rem"
                    flexDir="column"
                    gap="3rem"
                    w={{ base: "20%" }}
                    align="stretch"
                >
                    <Flex flexDir="column" gap="1rem" align="start">
                        <Text fontWeight="600" fontSize="1.75rem">
                            Categories
                        </Text>
                        {Object.entries(products?.categories).map(([category, subCategories]) => (
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
                                    // onClick={() => {
                                    //     handleCategoryFilter(category, subCategories);
                                    // }}
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
                                                    // onClick={() =>
                                                    //     handleCategoryFilter(category, [
                                                    //         subCategory,
                                                    //     ])
                                                    // }
                                                >
                                                    {subCategory}
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </Collapse>
                            </Flex>
                        ))}
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
                                        // onClick={() => handleBrandFilter(brand)}
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
                                    key={`${priceRange.min}-${priceRange.max}`}
                                    size="lg"
                                    colorScheme="orange"
                                    // onChange={() => handlePriceFilter(priceRange)}
                                >
                                    {`$${priceRange.min} - $${priceRange.max}`}
                                </Checkbox>
                            ))}
                        </VStack>
                    </Flex>
                    <Flex>
                        <Button
                            colorScheme="brand"
                            variant="outline"
                            fontSize="1.5rem"
                            fontWeight="bold"
                            w="full"
                            // onClick={handleResetFilters}
                            _hover={{ bg: "brand.orange", color: "white" }}
                        >
                            Reset Filters
                        </Button>
                    </Flex>
                </Flex>

                <Flex
                    bg="bg.light"
                    p="2rem"
                    flexGrow="1"
                    flexDir="column"
                    // justifyContent="space-between"
                >
                    <Flex flexDir="column">
                        <Breadcrumb
                            spacing="4px"
                            fontSize="1.75rem"
                            separator={<BsChevronRight className="text-gray-500" />}
                        >
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    as={Link}
                                    to="#"
                                    textDecoration="none"
                                    color="bg.opaque"
                                >
                                    DFX Gadgets Hub
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink as={Link} to="#" isCurrentPage>
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
                            >{`${"Min"}`}</Text>
                            <Text>-</Text>
                            <Text
                                bg="white"
                                borderRadius=".3rem"
                                p=".5rem 1rem"
                                mx=".5rem"
                                color="bg.opaque"
                            >{`${"Max"}`}</Text>
                        </Flex>
                    </Flex>
                    <Grid
                        templateColumns={{
                            base: "repeat(1, 1fr)",
                            xs: "repeat(2, 1fr)",
                            sm: "repeat(3, 1fr)",
                            md: "repeat(4, 1fr)",
                        }}
                        mt="4rem"
                        justifyContent="center"
                        gap="3rem"
                    >
                        {productItems.slice(skip, skip + itemsPerPage).map((item) => (
                            <Flex
                                key={item.id}
                                as={Link}
                                to={`/carts${item.id}`}
                                flexDir="column"
                                className="hover:scale-105 w-full bg-white p-8 rounded-3xl"
                                boxShadow="lg"
                                justifyContent="space-between"
                            >
                                <Image
                                    src={item.imgSrc}
                                    alt={item.name}
                                    height="20rem"
                                    objectFit="contain"
                                    mb="3rem"
                                />
                                <Text color="typography.dark" fontSize="1.5rem" h="4rem">
                                    {item.name}
                                </Text>
                                <Flex alignItems="baseline">
                                    <Text
                                        color="typography.dark"
                                        fontSize="2.2rem"
                                        fontWeight="600"
                                    >
                                        {item.current_price}
                                    </Text>
                                    {item.old_price && (
                                        <Text
                                            color="typography.red"
                                            fontSize="1.2rem"
                                            px="2"
                                            textDecoration="line-through"
                                        >
                                            {item.old_price}
                                        </Text>
                                    )}
                                </Flex>
                            </Flex>
                        ))}
                    </Grid>
                    <Flex
                        alignItems="center"
                        justifyContent="center"
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
                            px="2rem"
                            py="1rem"
                            fontSize="1.5rem"
                            border="1px solid rgba(22, 22, 22, 0.50)"
                            onClick={() => setPage(page - 1)}
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
                        {pages.map((num) => (
                            <Button
                                key={num}
                                colorScheme="brand"
                                variant="outline"
                                color="bg.opaque"
                                borderRadius=".3rem"
                                px="2rem"
                                py="1rem"
                                fontSize="1.5rem"
                                border="1px solid rgba(22, 22, 22, 0.50)"
                                onClick={() => setPage(num)}
                                _active={{ bg: "brand.orange", color: "white", border: "none" }}
                                isActive={page === num}
                            >
                                {num}
                            </Button>
                        ))}
                        <Button
                            colorScheme="brand"
                            variant="outline"
                            color="bg.opaque"
                            borderRadius=".3rem"
                            px="2rem"
                            py="1rem"
                            fontSize="1.5rem"
                            border="1px solid rgba(22, 22, 22, 0.50)"
                            onClick={() => setPage(page + 1)}
                            isDisabled={page === pages.length}
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
