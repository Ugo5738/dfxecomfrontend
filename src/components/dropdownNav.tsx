import { Link } from "react-router-dom";
import {
    Flex,
    Grid,
    GridItem,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    Button,
    Image,
} from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
import {
    mobileDropdownMenu,
    computingDropdownMenu,
    accessoriesDropdownMenu,
    gamingDropdownMenu,
    wearablesDropdownMenu,
} from "../utils/dummyData";

const DropdownNav = () => {
    return (
        <Flex bg="bg.nav">
            <Flex
                alignItems={{ base: "flex-start", sm: "center" }}
                flexDir={{ base: "column", sm: "row" }}
                color="typography.dark"
                mx="auto"
                w="98%"
                gap="1rem"
                py="1rem"
                fontSize="1.25rem"
                zIndex={10000}
            >
                <Menu isLazy closeOnSelect={false}>
                    <MenuButton
                        as={Button}
                        rightIcon={<AiFillCaretDown className="text-white" />}
                        colorScheme="brand"
                        fontSize="1.65rem"
                    >
                        Mobile
                    </MenuButton>
                    <MenuList mx="1rem">
                        <Grid
                            templateColumns="repeat(2, 1fr)"
                            gap={{ base: "1.5rem", sm: "3rem" }}
                            px="1rem"
                        >
                            {mobileDropdownMenu.map((item) => (
                                <GridItem key={item.id}>
                                    <MenuGroup
                                        title={item.category}
                                        fontSize="1.5rem"
                                        fontWeight="bold"
                                    >
                                        {item.items.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                minH="48px"
                                                as={Link}
                                                to={`/${item.title}`}
                                            >
                                                <Image
                                                    boxSize="2rem"
                                                    borderRadius="full"
                                                    src={item.imgSrc}
                                                    alt={item.title}
                                                    mr="12px"
                                                />
                                                <span>{item.title}</span>
                                            </MenuItem>
                                        ))}
                                    </MenuGroup>
                                </GridItem>
                            ))}
                        </Grid>
                    </MenuList>
                </Menu>
                <Menu isLazy closeOnSelect={false}>
                    <MenuButton
                        as={Button}
                        rightIcon={<AiFillCaretDown className="text-white" />}
                        colorScheme="brand"
                        fontSize="1.65rem"
                    >
                        Computing
                    </MenuButton>
                    <MenuList mx="1rem">
                        <Grid
                            templateColumns="repeat(2, 1fr)"
                            gap={{ base: "1.5rem", sm: "3rem" }}
                            px="1rem"
                        >
                            {computingDropdownMenu.map((item) => (
                                <GridItem key={item.id}>
                                    <MenuGroup
                                        title={item.category}
                                        fontSize="1.5rem"
                                        fontWeight="bold"
                                    >
                                        {item.items.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                minH="48px"
                                                as={Link}
                                                to={`/${item.title}`}
                                            >
                                                <Image
                                                    boxSize="2rem"
                                                    borderRadius="full"
                                                    src={item.imgSrc}
                                                    alt={item.title}
                                                    mr="12px"
                                                />
                                                <span>{item.title}</span>
                                            </MenuItem>
                                        ))}
                                    </MenuGroup>
                                </GridItem>
                            ))}
                        </Grid>
                    </MenuList>
                </Menu>
                <Menu isLazy closeOnSelect={false}>
                    <MenuButton
                        as={Button}
                        rightIcon={<AiFillCaretDown className="text-white" />}
                        colorScheme="brand"
                        fontSize="1.65rem"
                    >
                        Accessories
                    </MenuButton>
                    <MenuList mx="1rem">
                        <Grid
                            templateColumns="repeat(2, 1fr)"
                            gap={{ base: "1.5rem", sm: "3rem" }}
                            px="1rem"
                        >
                            {accessoriesDropdownMenu.map((item) => (
                                <GridItem key={item.id}>
                                    <MenuGroup
                                        title={item.category}
                                        fontSize="1.5rem"
                                        fontWeight="bold"
                                    >
                                        {item.items.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                minH="48px"
                                                as={Link}
                                                to={`/${item.title}`}
                                            >
                                                <Image
                                                    boxSize="2rem"
                                                    borderRadius="full"
                                                    src={item.imgSrc}
                                                    alt={item.title}
                                                    mr="12px"
                                                />
                                                <span>{item.title}</span>
                                            </MenuItem>
                                        ))}
                                    </MenuGroup>
                                </GridItem>
                            ))}
                        </Grid>
                    </MenuList>
                </Menu>
                <Menu isLazy closeOnSelect={false}>
                    <MenuButton
                        as={Button}
                        rightIcon={<AiFillCaretDown className="text-white" />}
                        colorScheme="brand"
                        fontSize="1.65rem"
                    >
                        Gaming
                    </MenuButton>
                    <MenuList mx="1rem">
                        <Grid
                            templateColumns="repeat(2, 1fr)"
                            gap={{ base: "1.5rem", sm: "3rem" }}
                            px="1rem"
                        >
                            {gamingDropdownMenu.map((item) => (
                                <GridItem key={item.id}>
                                    <MenuGroup
                                        title={item.category}
                                        fontSize="1.5rem"
                                        fontWeight="bold"
                                    >
                                        {item.items.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                minH="48px"
                                                as={Link}
                                                to={`/${item.title}`}
                                            >
                                                <Image
                                                    boxSize="2rem"
                                                    borderRadius="full"
                                                    src={item.imgSrc}
                                                    alt={item.title}
                                                    mr="12px"
                                                />
                                                <span>{item.title}</span>
                                            </MenuItem>
                                        ))}
                                    </MenuGroup>
                                </GridItem>
                            ))}
                        </Grid>
                    </MenuList>
                </Menu>
                <Menu isLazy closeOnSelect={false}>
                    <MenuButton
                        as={Button}
                        rightIcon={<AiFillCaretDown className="text-white" />}
                        colorScheme="brand"
                        fontSize="1.65rem"
                    >
                        Wearables
                    </MenuButton>
                    <MenuList mx="1rem">
                        <Grid
                            templateColumns="repeat(2, 1fr)"
                            gap={{ base: "1.5rem", sm: "3rem" }}
                            px="1rem"
                        >
                            {wearablesDropdownMenu.map((item) => (
                                <GridItem key={item.id}>
                                    <MenuGroup
                                        title={item.category}
                                        fontSize="1.5rem"
                                        fontWeight="bold"
                                    >
                                        {item.items.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                minH="48px"
                                                as={Link}
                                                to={`/${item.title}`}
                                            >
                                                <Image
                                                    boxSize="2rem"
                                                    borderRadius="full"
                                                    src={item.imgSrc}
                                                    alt={item.title}
                                                    mr="12px"
                                                />
                                                <span>{item.title}</span>
                                            </MenuItem>
                                        ))}
                                    </MenuGroup>
                                </GridItem>
                            ))}
                        </Grid>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
};

export default DropdownNav;
