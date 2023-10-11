import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./navBar";
import MainNav from "./mainNav";
import ScrollNav from "./scrollNav";
import { SearchProps } from "../utils/types";

// Nav Component
const Nav = ({ searchTerm, setSearchTerm }: SearchProps) => {
  return (
    <Grid
      // Define grid template areas for different screen sizes
      templateAreas={{
        base: `"dropdownNav mainNav"
                  "scrollNav scrollNav"`,
        md: `"mainNav"
                  "scrollNav"
                  "dropdownNav"`,
      }}
      // Define grid template rows and columns for different screen sizes
      gridTemplateRows={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }}
      gridTemplateColumns={{ base: "3rem 1fr", md: "1fr" }}
      gap="0"
      // Align grid items based on screen size
      alignItems={{ base: "flex-end", md: "end" }}
      // Adjust margin bottom for different screen sizes
      mb={{ base: "-1.5rem", md: "-5.5rem" }}
      w="100%"
    >
      {/* Grid item for the MainNav component */}
      <GridItem area={"mainNav"}>
        <MainNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </GridItem>
      {/* Grid item for the ScrollNav component */}
      <GridItem area={"scrollNav"} alignSelf="baseline" w="100%">
        <ScrollNav />
      </GridItem>
      {/* Grid item for the NavBar component */}
      <GridItem
        area={"dropdownNav"}
        alignSelf="flex-start"
        // Adjust top margin for different screen sizes
        mt={{ base: ".8rem", md: "-2.9rem" }}
      >
        <NavBar />
      </GridItem>
    </Grid>
  );
};

export default Nav;
