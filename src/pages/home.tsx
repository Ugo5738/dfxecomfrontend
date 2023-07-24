import { Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import WaitList from "../components/waitlist";
// import { useGetUser } from "../services/auth";

const Home = () => {
    // const { data: user, error, isLoading, isSuccess } = useGetUser();
    // console.log("user", user, "error", error, "isLoading", isLoading, "isSuccess", isSuccess);
    return (
        <Box>
            <WaitList />
            <Footer />
        </Box>
    );
};

export default Home;
