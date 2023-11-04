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
import { getShopURLWithCategory } from '../utils/urlUtils';

interface CategoryChild {
  id: number;
  name: string;
  is_active: boolean;
  is_trending: boolean;
  children: CategoryChild[];
}

const maxDepth = 1;

const MenuOverride = styled(MenuList)`
  /* This assumes the line is a border on the MenuList */
  border-right: none;

  /* If the line is inside each MenuItem, you might need a rule like this: */
  .chakra-menu__menuitem {
    border-right: none;
  }
`;


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
            <MenuGroup title={item.name} fontSize="1.5rem" fontWeight="bold" _hover={{ bg: 'transparent' }} _focus={{ boxShadow: 'none' }}>
                {item.children.map(child => (
                    <MenuItem key={child.id} minH="48px">
                        <Image
                            boxSize="2rem"
                            borderRadius="full"
                            src={child.image} // If your API provides images
                            alt={child.name}
                            mr="12px"
                        />
                        <Link to={getShopURLWithCategory(child.name)}>
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


// <div 
//     class="css-1qq679y" 
//     style="visibility: visible; min-width: max-content; 
//         --popper-transform-origin: top left; position: absolute; 
//         inset: 0px auto auto 0px; margin: 0px; 
//         transform: translate(112px, 166px);" 
//     data-popper-placement="bottom-start"
// >
//     <div 
//         class="chakra-menu__menu-list css-6flit5" 
//         tabindex="-1" 
//         role="menu" 
//         id="menu-list-:rb:" 
//         aria-orientation="vertical" 
//         style="transform-origin: var(--popper-transform-origin); 
//             opacity: 1; visibility: visible; transform: none;"
//     >
//         <div class="css-rrgp7n">
//             <div class="css-0">
//                 <div 
//                     class="chakra-menu__group" 
//                     role="group"
//                 >
//                     <p class="chakra-menu__group__title css-zhzj9k">
//                         Laptops
//                     </p>
//                     <button 
//                         type="button" 
//                         id="menu-list-:rb:-menuitem-:r21:" 
//                         role="menuitem" 
//                         tabindex="-1" 
//                         class="chakra-menu__menuitem css-1k2sfp5" 
//                         data-index="0"
//                     >
//                         <img 
//                             alt="Gaming Laptops" 
//                             class="chakra-image css-cmmiq2"
//                         >
//                             <a href="/shop?category=Gaming%20Laptops">
//                                 <span>Gaming Laptops</span>
//                             </a>
//                         <div class="css-1qq679y" 
//                             style="visibility: visible; 
//                                 min-width: max-content; 
//                                 --popper-transform-origin: top left;"
//                         >
//                             <div 
//                                 class="css-r6z5ec" 
//                                 style="visibility: visible; min-width: max-content; 
//                                     --popper-transform-origin: top left;"
//                             >
//                                 <div 
//                                     class="sc-gLDxTj fxvYSj chakra-menu__menu-list css-1cum0zs" 
//                                     tabindex="-1" 
//                                     role="menu" 
//                                     id="menu-list-:rb:" 
//                                     aria-orientation="vertical" 
//                                     style="transform-origin: var(--popper-transform-origin); visibility: visible; opacity: 1; transform: none;">
//                                         <div class="css-rrgp7n">
//                                             <div class="css-0">
//                                             </div>
//                                         </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </button>
//                     <button type="button" id="menu-list-:rb:-menuitem-:r23:" role="menuitem" tabindex="-1" class="chakra-menu__menuitem css-1k2sfp5" data-index="1"><img alt="Mac Laptops" class="chakra-image css-cmmiq2"><a href="/shop?category=Mac%20Laptops"><span>Mac Laptops</span></a><div class="css-1qq679y" style="visibility: visible; min-width: max-content; --popper-transform-origin: top left;"><div class="css-r6z5ec" style="visibility: visible; min-width: max-content; --popper-transform-origin: top left;"><div class="sc-gLDxTj fxvYSj chakra-menu__menu-list css-1cum0zs" tabindex="-1" role="menu" id="menu-list-:rb:" aria-orientation="vertical" style="transform-origin: var(--popper-transform-origin); visibility: visible; opacity: 1; transform: none;"><div class="css-rrgp7n"><div class="css-0"></div></div></div></div></div></button></div></div><div class="css-0"><div class="chakra-menu__group" role="group"><p class="chakra-menu__group__title css-zhzj9k">Tablets</p><button type="button" id="menu-list-:rb:-menuitem-:r25:" role="menuitem" tabindex="-1" class="chakra-menu__menuitem css-1k2sfp5" data-index="2"><img alt="Android Tablets" class="chakra-image css-cmmiq2"><a href="/shop?category=Android%20Tablets"><span>Android Tablets</span></a></button><button type="button" id="menu-list-:rb:-menuitem-:r27:" role="menuitem" tabindex="0" class="chakra-menu__menuitem css-1k2sfp5" data-index="3"><img alt="iPads" class="chakra-image css-cmmiq2"><a href="/shop?category=iPads"><span>iPads</span></a><div class="css-1qq679y" style="visibility: visible; min-width: max-content; --popper-transform-origin: top left;"><div class="css-r6z5ec" style="visibility: visible; min-width: max-content; --popper-transform-origin: top left;"><div class="sc-gLDxTj fxvYSj chakra-menu__menu-list css-1cum0zs" tabindex="-1" role="menu" id="menu-list-:rb:" aria-orientation="vertical" style="transform-origin: var(--popper-transform-origin); visibility: visible; opacity: 1; transform: none;"><div class="css-rrgp7n"><div class="css-0"></div></div></div></div></div></button></div></div></div></div></div>