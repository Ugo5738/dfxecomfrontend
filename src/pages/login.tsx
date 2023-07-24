import { Flex, Text, Center, Button } from "@chakra-ui/react";
import AppInput from "../components/input";
import { LoginFormType } from "../utils/schema";
import { useLoginForm } from "../utils/form";
import AppButton from "../components/button";
import { UseLoginMutation } from "../services/mutation";
import { ErrorToast, SuccessToast } from "../utils/toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
        <Center h="100vh">
            <Flex
                bg="white"
                rounded="2xl"
                shadow="inner"
                p="2rem"
                width={{ base: "90%", sm: "80%", md: "60%" }}
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
                            // label="Email"
                            name="email"
                            placeholder="Email Address"
                            type="email"
                            autoComplete="email"
                            register={register}
                            errors={errors}
                        />
                        <AppInput
                            // label="Password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            autoComplete="current-password"
                            register={register}
                            errors={errors}
                            size="md"
                        />
                        <Button color={"typography.red"} alignSelf={"start"} mb="1rem" bg="white">
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
                        mt="3rem"
                    >
                        <Button>
                            <img src={"src/assets/facebook-logo.png"} alt="facebook" />
                        </Button>
                        <Button>
                            <img src={"src/assets/twitter-logo.png"} alt="twitter" />
                        </Button>
                        <Button>
                            <img src={"src/assets/google-logo.png"} alt="google" />
                        </Button>
                        <Button>
                            <img src={"src/assets/linkedin-logo.png"} alt="linkedin" />
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Center>
    );
};

export default Login;
