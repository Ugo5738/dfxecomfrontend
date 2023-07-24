import { Flex, Text, Center, Button } from "@chakra-ui/react";
import AppInput from "../components/input";
import { SignUpFormType } from "../utils/schema";
import { useSignUpForm } from "../utils/form";
import AppButton from "../components/button";
import { Link } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
// import { RegisterPayloadType } from '../utils/types';
import { UseRegisterMutation } from "../services/mutation";
import { ErrorToast, SuccessToast } from "../utils/toast";

const mapDataToRegister = (data: SignUpFormType) => {
    const { email, password, first_name, last_name } = data;
    return { email, password, first_name, last_name };
};

const Register = () => {
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const { mutateAsync: reg } = UseRegisterMutation();

    const onRegister = async (data: SignUpFormType) => {
        setLoading(true);
        if (!country.trim()) return;
        const mappedData = mapDataToRegister(data);
        const registerData = { ...mappedData, profile: { country: country } };
        const regResult = await reg(registerData);
        // console.log("regResult", regResult);
        try {
            if (!regResult) {
                return;
            }
            if (regResult.status === 200 || regResult.status === 201) {
                SuccessToast("Registration Successful!");
            }
        } catch (error) {
            ErrorToast("An error occurred");
            throw new Error(error as string);
        } finally {
            setLoading(false);
        }
    };

    const { register, handleFormSubmit, errors } = useSignUpForm(onRegister);

    return (
        <Center h="100vh" my="5rem">
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
                    Create Your Account
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
                            // label="First Name"
                            name="first_name"
                            placeholder="First Name"
                            type="text"
                            autoComplete="name"
                            register={register}
                            errors={errors}
                        />
                        <AppInput
                            // label="Last Name"
                            name="last_name"
                            placeholder="Last Name"
                            type="text"
                            autoComplete="name"
                            register={register}
                            errors={errors}
                        />
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
                            autoComplete="new-password"
                            register={register}
                            errors={errors}
                            size="md"
                        />
                        <AppInput
                            // label="Confirm Password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            type="password"
                            autoComplete="new-password"
                            register={register}
                            errors={errors}
                            size="md"
                        />
                        <ReactFlagsSelect
                            selected={country}
                            onSelect={(code) => setCountry(code)}
                            placeholder="Select Country"
                            searchable={true}
                            searchPlaceholder="Search countries"
                            className="w-full"
                            id="country"
                        />
                        {!country.trim() && (
                            <Text role="alert" color={"red"} fontSize="1.2rem">
                                Please Select Your Country
                            </Text>
                        )}
                        <AppButton
                            type="submit"
                            variant="primary"
                            width="100%"
                            mt="2rem"
                            isLoading={loading}
                            loadingText="Creating Account"
                            onClick={handleFormSubmit}
                        >
                            Create Account
                        </AppButton>
                    </Flex>
                </form>
                <Flex alignItems="center" justifyContent="center" mt="1rem">
                    <Text>Already have an account?</Text>
                    <Link to="/login" className="text-[#3E3FCD] pl-2">
                        Login
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

export default Register;
