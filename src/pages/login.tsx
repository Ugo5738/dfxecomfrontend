import { Flex, Text, Center, Button, Box, useTheme } from "@chakra-ui/react";
import AppInput from "../components/input";
import { ColorObject, LoginFormType } from "../utils/types";
import { useLoginForm } from "../utils/form";
import AppButton from "../components/button";
import { UseLoginMutation } from "../services/mutation";
import { ErrorToast, SuccessToast } from "../utils/toast";
import { useState } from "react";
import { Link, useNavigate, useSearchParams} from "react-router-dom";

const Login = () => {
    const color = useTheme().colors as ColorObject;
    const { mutateAsync: login } = UseLoginMutation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectUrl = searchParams.get("redirectedFrom");

    const onLogin = async (data: LoginFormType) => {
        setLoading(true);
        const loginResult = await login(data);
        try {
            if (!loginResult) return;

            if (loginResult.status === 200) {
                SuccessToast("Login Successful!");
            }
            sessionStorage.setItem("dfx-token", loginResult.data?.access as string);
            redirectUrl ? navigate(redirectUrl) : navigate("/");
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
                    <Text fontSize="2rem" mb="3rem" w={{ base: "96%", md: "86%" }} mx="auto">
                        Welcome Back to DFX Gadgets Hub
                    </Text>
                    <form onSubmit={handleFormSubmit}>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            flexDir="column"
                            w={{ base: "96%", md: "86%" }}
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
                                color={"typography.red"}
                                alignSelf={"start"}
                                mb="2rem"
                                bg="white"
                                as={Link}
                                to="/forgot-password"
                                fontSize="1.25rem"
                                fontWeight={400}
                            >
                                Forgot Password?
                            </Button>
                            <AppButton
                                type="submit"
                                variant="primary"
                                width="100%"
                                borderRadius=".3rem"
                                fontWeight="400"
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
                        <Flex alignItems="center" w={{ base: "96%", md: "86%" }} mx="auto">
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
                            <Button variant="link">
                                <img
                                    src={"/facebook-logo.png"}
                                    alt="facebook"
                                    className="h-12 w-12 object-contain"
                                />
                            </Button>
                            <Button variant="link">
                                <img
                                    src={"/twitter-logo.png"}
                                    alt="twitter"
                                    className="h-12 w-12 object-contain"
                                />
                            </Button>
                            <Button variant="link">
                                <img
                                    src={"/google-logo.png"}
                                    alt="google"
                                    className="h-12 w-12 object-contain"
                                />
                            </Button>
                            <Button variant="link">
                                <img
                                    src={"/linkedin-logo.png"}
                                    alt="linkedin"
                                    className="h-12 w-12 object-contain"
                                />
                            </Button>
                        </Flex>
                    </Flex>
                    <Text textAlign="center" mt="2rem" fontSize="1rem">
                        For any further assistance, please visit our{" "}
                        <Link to="/help" className="text-[#3E3FCD]">
                            help center
                        </Link>{" "}
                        or{" "}
                        <Link to="/support" className="text-[#3E3FCD]">
                            contact our CS
                        </Link>{" "}
                        team
                    </Text>
                </Flex>
            </Center>
        </Box>
    );
};

export default Login;
