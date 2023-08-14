import { Flex, Text, Center, Button, Box, useTheme } from "@chakra-ui/react";
import AppInput from "../components/input";
import { ColorObject, LoginFormType } from "../utils/types";
import { useLoginForm } from "../utils/form";
import AppButton from "../components/button";
import { UseLoginMutation } from "../services/mutation";
import { ErrorToast, SuccessToast } from "../utils/toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const color = useTheme().colors as ColorObject;
    const { mutateAsync: login } = UseLoginMutation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onLogin = async (data: LoginFormType) => {
        setLoading(true);
        const loginResult = await login(data);
        // console.log("loginResult", loginResult);
        try {
            if (!loginResult) return;

            if (loginResult.status === 200) {
                SuccessToast("Login Successful!");
            }
            sessionStorage.setItem("dfx-token", loginResult.data?.access as string);
            navigate("/");
        } catch (error) {
            ErrorToast("An error occurred");
            throw new Error(error as string);
        } finally {
            setLoading(false);
        }
    };

    const { register, handleFormSubmit, errors } = useLoginForm(onLogin);

    return (
        <Box bg="bg.opaque">
            <Center h="100vh" py="5rem">
                <Flex
                    bg="white"
                    rounded="2xl"
                    shadow={color.shadow.main}
                    p="2rem"
                    w="90%"
                    maxW="50rem"
                    mx="auto"
                    flexDir="column"
                >
                    <Text fontSize="2rem" fontWeight="bold" mb="3rem">
                        Welcome Back
                    </Text>
                    <form onSubmit={handleFormSubmit}>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            flexDir="column"
                            w={{ base: "96%", md: "80%" }}
                            mx="auto"
                        >
                            <AppInput
                                name="email"
                                placeholder="Email Address"
                                type="email"
                                autoComplete="email"
                                register={register}
                                errors={errors}
                            />
                            <AppInput
                                name="password"
                                placeholder="Password"
                                type="password"
                                autoComplete="current-password"
                                register={register}
                                errors={errors}
                                size="md"
                            />
                            <Button
                                color={"brand.orange"}
                                alignSelf={"start"}
                                mb="1rem"
                                bg="white"
                                as={Link}
                                to="/forgot-password"
                            >
                                Forgot Password?
                            </Button>
                            <AppButton
                                type="submit"
                                variant="primary"
                                width="100%"
                                isLoading={loading}
                                loadingText="Signing In"
                                onClick={handleFormSubmit}
                            >
                                Sign In
                            </AppButton>
                        </Flex>
                    </form>
                    <Flex alignItems="center" justifyContent="center" mt="1rem">
                        <Text>Don’t have an account?</Text>
                        <Link to="/register" className="text-[#3E3FCD] pl-2">
                            Sign Up
                        </Link>
                    </Flex>
                    <Flex flexDir="column" mt="3rem">
                        <Flex alignItems="center">
                            <hr className="flex-1 border-t-2" />
                            <p className="mx-auto px-8">Or Sign In with</p>
                            <hr className="flex-1 border-t-2" />
                        </Flex>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            gap={{ base: "1rem", sm: "3rem" }}
                            my="3rem"
                        >
                            <Button>
                                <img src={"/facebook-logo.png"} alt="facebook" />
                            </Button>
                            <Button>
                                <img src={"/twitter-logo.png"} alt="twitter" />
                            </Button>
                            <Button>
                                <img src={"/google-logo.png"} alt="google" />
                            </Button>
                            <Button>
                                <img src={"/linkedin-logo.png"} alt="linkedin" />
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Center>
        </Box>
    );
};

export default Login;
