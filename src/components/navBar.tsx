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
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        if (isLargerThan768) {
            onClose();
        }
    }, [isLargerThan768, onClose]);

    return (
        <Flex bg={{ base: "white", md: "bg.nav" }}>
            <Button
                aria-label="Options"
                leftIcon={<RxHamburgerMenu />}
                m="1rem"
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                fontSize="2rem"
                bg="white"
            />
            <Flex display={{ base: "flex", md: "none" }}>
                <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px" py="1.5rem">
                            Shopping Categories
                        </DrawerHeader>
                        <DrawerBody bg="bg.nav">
                            <DropdownNav />
                        </DrawerBody>
                        <DrawerFooter borderTopWidth="1px">
                            <Button variant="outline" mr={3} onClick={onClose} title="Close">
                                DFX LOGO
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Flex>
            <Flex display={{ base: "none", md: "flex" }}>
                <DropdownNav />
            </Flex>
        </Flex>
    );
};

export default NavBar;
