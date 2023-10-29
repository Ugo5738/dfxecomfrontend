import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./utils/theme";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import router from "./routes";
import LoadingSpinner from "./components/loading";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  removeOldestQuery,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import React from "react";
import { ToastContainer } from "react-toastify";
import { ErrorFallback } from "./components/error-page";
import "@fontsource-variable/raleway";
import "@fontsource/lato/100.css";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24,
      },
    },
  });
  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
    retry: removeOldestQuery,
  });

  return (
    <React.Fragment>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: localStoragePersister }}
        >
          <ChakraProvider theme={customTheme}>
            <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
            <ToastContainer theme="colored" />
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </PersistQueryClientProvider>
      </ErrorBoundary>
    </React.Fragment>
  );
}

export default App;
