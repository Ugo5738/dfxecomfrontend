import { ChakraProvider } from "@chakra-ui/react"
import customTheme from "./utils/theme"
import { RouterProvider } from "react-router-dom"
import router from "./routes"
import Loading from "./components/loading"

function App() {

  return (
    <>
      <ChakraProvider theme={customTheme}>
        <RouterProvider router={router} fallbackElement={<Loading />} />
      </ChakraProvider>
    </>
  )
}

export default App
