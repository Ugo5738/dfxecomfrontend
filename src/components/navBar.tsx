import {
    Flex,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    useMediaQuery,
} from "@chakra-ui/react";
import DropdownNav from "./dropdownNav";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect } from "react";
const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

    useEffect(() => {
        if (isLargerThan480) {
            onClose();
        }
    }, [isLargerThan480, onClose]);

    return (
        <Flex bg="bg.nav">
            <Button
                aria-label="Options"
                rightIcon={<RxHamburgerMenu />}
                m="1rem"
                p="1rem"
                display={{ base: "flex", sm: "none" }}
                onClick={onOpen}
                fontSize="1.5rem"
            >
                Shopping Categories
            </Button>
            <Flex display={{ base: "flex", sm: "none" }}>
                <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px" py="2rem">
                            Shopping Categories
                        </DrawerHeader>
                        <DrawerBody bg="bg.nav">
                            <DropdownNav />
                        </DrawerBody>
                        <DrawerFooter borderTopWidth="1px">
                            <Button variant="outline" mr={3} onClick={onClose}>
                                DFX LOGO
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Flex>
            <Flex display={{ base: "none", sm: "flex" }}>
                <DropdownNav />
            </Flex>
        </Flex>
    );
};

export default NavBar;
