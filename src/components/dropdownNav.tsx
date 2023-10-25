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
import styled from "styled-components";
import { useState, useEffect } from 'react';
import URLS from '../services/urls';

interface CategoryChild {
  id: number;
  name: string;
  is_active: boolean;
  is_trending: boolean;
  children: CategoryChild[];
}

const maxDepth = 1;

const DropdownNav = () => {
    const [categories, setCategories] = useState<CategoryChild[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const API_ENDPOINT = `${URLS.API_URL}${URLS.CATEGORY_INVENTORY}`;
        fetch(API_ENDPOINT)
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    const RecursiveMenuItem = ({ item, depth = 1 }) => {
        if (depth > maxDepth) return null;
    
        return (
            <MenuGroup title={item.name} fontSize="1.5rem" fontWeight="bold">
                {item.children.map(child => (
                    <MenuItem key={child.id} minH="48px">
                        <Image
                            boxSize="2rem"
                            borderRadius="full"
                            src={child.image} // If your API provides images
                            alt={child.name}
                            mr="12px"
                        />
                        <Link to={`/shop?category=${encodeURIComponent(child.name)}`}>
                            <span>{child.name}</span>
                        </Link>
                        {child.children.length > 0 && (
                            <MenuList mx="1rem" zIndex={10}>
                                <Grid templateColumns="repeat(2, 1fr)" gap={{ base: "1.5rem", sm: "3rem" }} px="1rem">
                                    {child.children.map(subChild => (
                                        <GridItem key={subChild.id}>
                                            <RecursiveMenuItem item={subChild} depth={depth + 1} />
                                        </GridItem>
                                    ))}
                                </Grid>
                            </MenuList>
                        )}
                    </MenuItem>
                ))}
            </MenuGroup>
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Wrapper>
            <Flex bg="bg.nav" w="100%">
                <Flex
                    alignItems={{ base: "flex-start", md: "center" }}
                    color="typography.dark"
                    mx="auto"
                    w="100%"
                    gap="1rem"
                    py="1rem"
                    height=" 50px"
                >
                    <div className="container">
                        {categories.map(category => (
                            <Menu isLazy key={category.id}>
                                <MenuButton
                                    as={Button}
                                    rightIcon={<AiFillCaretDown className="text-white" />}
                                    colorScheme="brand"
                                    fontFamily="Lato"
                                    fontSize="16px"
                                    fontWeight="700"
                                >
                                    {category.name}
                                </MenuButton>
                                <MenuList mx="1rem" zIndex={10}>
                                    <Grid templateColumns="repeat(2, 1fr)" gap={{ base: "1.5rem", sm: "3rem" }} px="1rem">
                                        {category.children.map(child => (
                                            <GridItem key={child.id}>
                                                <RecursiveMenuItem item={child} />
                                            </GridItem>
                                        ))}
                                    </Grid>
                                </MenuList>
                            </Menu>
                        ))}
                    </div>
                </Flex>
            </Flex>
        </Wrapper>
    );
};

export default DropdownNav;

const Wrapper = styled.div`
  .dropdown-nav {
    width: 100%;
    @media screen and (max-width: 760px) {
      display: none;
    }
  }
`;
