import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./utils/theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import LoadingSpinner from "./components/loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ToastContainer } from "react-toastify";

function App() {
    const queryClient = new QueryClient();

    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={customTheme}>
                    <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
                    <ToastContainer theme="colored" />
                </ChakraProvider>
            </QueryClientProvider>
        </React.Fragment>
    );
}

export default App;
