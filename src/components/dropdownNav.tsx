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
    <Flex bg="bg.nav" w="100%">
      <Flex
        alignItems={{ base: "flex-start", md: "center" }}
        color="typography.dark"
        mx="auto"
        w="100%"
        gap="1rem"
        py="1rem"
        zIndex={2}
        height=" 50px"
      >
        <div className="container">
          <Menu isLazy>
            <MenuButton
              as={Button}
              rightIcon={<AiFillCaretDown className="text-white" />}
              colorScheme="brand"
              fontFamily="Lato"
              fontSize="16px"
              fontWeight="700"
              padding="0"
            >
              Mobile
            </MenuButton>
            <MenuList mx="1rem">
              <Grid templateColumns="repeat(2, 1fr)" gap={{ base: "1.5rem", sm: "3rem" }} px="1rem">
                {mobileDropdownMenu.map((item) => (
                  <GridItem key={item.id}>
                    <MenuGroup title={item.category} fontSize="1.5rem" fontWeight="bold">
                      {item.items.map((item) => (
                        <MenuItem key={item.id} minH="48px" as={Link} to={`/shop/${item.title}`}>
                          <Image
                            boxSize="2rem"
                            borderRadius="full"
                            src={item.image}
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
          <Menu isLazy offset={[0, -20]}>
            <MenuButton
              as={Button}
              rightIcon={<AiFillCaretDown className="text-white" />}
              colorScheme="brand"
              fontFamily="Lato"
              fontSize="16px"
              fontWeight="700"
            >
              Computing
            </MenuButton>
            <MenuList mx="1rem">
              <Grid templateColumns="repeat(2, 1fr)" gap={{ base: "1.5rem", sm: "3rem" }} px="1rem">
                {computingDropdownMenu.map((item) => (
                  <GridItem key={item.id}>
                    <MenuGroup title={item.category} fontSize="1.5rem" fontWeight="bold">
                      {item.items.map((item) => (
                        <MenuItem key={item.id} minH="48px" as={Link} to={`/shop/${item.title}`}>
                          <Image
                            boxSize="2rem"
                            borderRadius="full"
                            src={item.image}
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
          <Menu isLazy>
            <MenuButton
              as={Button}
              rightIcon={<AiFillCaretDown className="text-white" />}
              colorScheme="brand"
              fontFamily="Lato"
              fontSize="16px"
              fontWeight="700"
            >
              Accessories
            </MenuButton>
            <MenuList mx="1rem">
              <Grid templateColumns="repeat(2, 1fr)" gap={{ base: "1.5rem", sm: "3rem" }} px="1rem">
                {accessoriesDropdownMenu.map((item) => (
                  <GridItem key={item.id}>
                    <MenuGroup title={item.category} fontSize="1.5rem" fontWeight="bold">
                      {item.items.map((item) => (
                        <MenuItem key={item.id} minH="48px" as={Link} to={`/shop/${item.title}`}>
                          <Image
                            boxSize="2rem"
                            borderRadius="full"
                            src={item.image}
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
          <Menu isLazy>
            <MenuButton
              as={Button}
              rightIcon={<AiFillCaretDown className="text-white" />}
              colorScheme="brand"
              fontFamily="Lato"
              fontSize="16px"
              fontWeight="700"
            >
              Gaming
            </MenuButton>
            <MenuList mx="1rem">
              <Grid templateColumns="repeat(2, 1fr)" gap={{ base: "1.5rem", sm: "3rem" }} px="1rem">
                {gamingDropdownMenu.map((item) => (
                  <GridItem key={item.id}>
                    <MenuGroup title={item.category} fontSize="1.5rem" fontWeight="bold">
                      {item.items.map((item) => (
                        <MenuItem key={item.id} minH="48px" as={Link} to={`/shop/${item.title}`}>
                          <Image
                            boxSize="2rem"
                            borderRadius="full"
                            src={item.image}
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
          <Menu isLazy>
            <MenuButton
              as={Button}
              rightIcon={<AiFillCaretDown className="text-white" />}
              colorScheme="brand"
              fontFamily="Lato"
              fontSize="16px"
              fontWeight="700"
            >
              Wearables
            </MenuButton>
            <MenuList mx="1rem">
              <Grid templateColumns="repeat(2, 1fr)" gap={{ base: "1.5rem", sm: "3rem" }} px="1rem">
                {wearablesDropdownMenu.map((item) => (
                  <GridItem key={item.id}>
                    <MenuGroup title={item.category} fontSize="1.5rem" fontWeight="bold">
                      {item.items.map((item) => (
                        <MenuItem key={item.id} minH="48px" as={Link} to={`/shop/${item.title}`}>
                          <Image
                            boxSize="2rem"
                            borderRadius="full"
                            src={item.image}
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
        </div>
      </Flex>
    </Flex>
  );
};

export default DropdownNav;
