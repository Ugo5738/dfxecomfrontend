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

/**
 * NavBar Component
 * @description A responsive navigation bar component with a mobile-friendly drawer.
 * @returns {JSX.Element} The rendered NavBar component.
 */
const NavBar = () => {
  // State management for the drawer
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Check if the screen width is larger than 768 pixels
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  // Close the drawer when the screen width becomes larger than 768 pixels
  useEffect(() => {
    if (isLargerThan768) {
      onClose();
    }
  }, [isLargerThan768, onClose]);

  return (
    <Flex bg={{ base: "white", md: "bg.nav" }}>
      {/* Hamburger button for mobile screens */}
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
        {/* Drawer component for mobile screens */}
        <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            {/* Drawer header */}
            <DrawerHeader borderBottomWidth="1px" py="1.5rem">
              Shopping Categories
            </DrawerHeader>

            {/* Drawer body with navigation options */}
            <DrawerBody bg="bg.nav">
              <DropdownNav />
            </DrawerBody>

            {/* Drawer footer with a close button */}
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose} title="Close">
                DFX LOGO
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
      <Flex display={{ base: "none", md: "flex" }}>
        {/* Render navigation options directly for larger screens */}
        <DropdownNav />
      </Flex>
    </Flex>
  );
};

export default NavBar;
