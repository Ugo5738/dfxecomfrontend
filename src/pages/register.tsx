import { Flex, Text, Center, Button, Box, useTheme } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import AppInput, { CustomPhoneInput } from "../components/input";
import { ColorObject, SignUpFormType } from "../utils/types";
import { useSignUpForm } from "../utils/form";
import AppButton from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
import { UseRegisterMutation } from "../services/mutation";
import { ErrorToast, SuccessToast } from "../utils/toast";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const mapDataToRegister = (data: SignUpFormType) => {
    const { email, password, first_name, last_name, phone } = data;
    return { email, password, first_name, last_name, phone };
};

const Register = () => {
    const color = useTheme().colors as ColorObject;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { mutateAsync: reg } = UseRegisterMutation();

    const onRegister = async (data: SignUpFormType) => {
        setLoading(true);
        const mappedData = mapDataToRegister(data);
        const registerData = { ...mappedData, profile: { country: data.country } };
        const regResult = await reg(registerData);
        try {
            if (!regResult) {
                return;
            }
            if (regResult.status === 200 || regResult.status === 201) {
                SuccessToast("Registration Successful!");
                sessionStorage.setItem("dfx-user", JSON.stringify(regResult.data));
                navigate("/login");
            }
        } catch (error) {
            ErrorToast("An error occurred");
            throw new Error(error as string);
        } finally {
            setLoading(false);
        }
    };

    const { register, handleFormSubmit, errors, control } = useSignUpForm(onRegister);

    return (
        <Box bg="bg.opaque">
            <Center py="5rem">
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
                    <Text fontSize="2rem" mb="3rem" w={{ base: "96%", md: "90%" }} mx="auto">
                        Welcome to DFX Gadgets Hub
                    </Text>
                    <form onSubmit={handleFormSubmit}>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            flexDir="column"
                            w={{ base: "96%", md: "90%" }}
                            mx="auto"
                        >
                            <Flex
                                alignItems="center"
                                flexDir={{ base: "column", sm: "row" }}
                                gap={{ base: "0", sm: "3rem" }}
                                justifyContent="space-between"
                                w="full"
                            >
                                <AppInput
                                    name="first_name"
                                    placeholder="First Name"
                                    type="text"
                                    autoComplete="name"
                                    register={register}
                                    errors={errors}
                                />
                                <AppInput
                                    name="last_name"
                                    placeholder="Last Name"
                                    type="text"
                                    autoComplete="name"
                                    register={register}
                                    errors={errors}
                                />
                            </Flex>
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
                                autoComplete="new-password"
                                register={register}
                                errors={errors}
                                size="md"
                            />
                            <AppInput
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                type="password"
                                autoComplete="new-password"
                                register={register}
                                errors={errors}
                                size="md"
                            />
                            <Controller
                                control={control}
                                name="phone"
                                render={({ field: { onChange, value } }) => (
                                    <PhoneInput
                                        id="phone"
                                        placeholder="Enter phone number"
                                        value={value}
                                        onChange={onChange}
                                        defaultCountry="NG"
                                        className="w-full"
                                        inputComponent={CustomPhoneInput as never}
                                    />
                                )}
                            />
                            {errors?.phone && (
                                <Text
                                    role="alert"
                                    color={"red"}
                                    fontSize="1.2rem"
                                    alignSelf="flex-start"
                                >
                                    {errors?.phone?.message}
                                </Text>
                            )}
                            <Controller
                                control={control}
                                name="country"
                                render={({ field: { onChange, value } }) => (
                                    <ReactFlagsSelect
                                        selected={value}
                                        onSelect={onChange}
                                        searchable={true}
                                        placeholder="Select Country"
                                        searchPlaceholder="Search countries"
                                        fullWidth
                                        selectButtonClassName="-mb-2"
                                        className="w-full h-full mt-8 border border-[#888] rounded-md"
                                        id="country"
                                    />
                                )}
                            />
                            {errors?.country && (
                                <Text
                                    role="alert"
                                    color={"red"}
                                    fontSize="1.2rem"
                                    alignSelf="flex-start"
                                >
                                    {errors?.country?.message}
                                </Text>
                            )}
                            <AppButton
                                type="submit"
                                variant="primary"
                                width="100%"
                                mt="3rem"
                                borderRadius=".3rem"
                                fontWeight="400"
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
                        <Flex alignItems="center" w={{ base: "96%", md: "90%" }} mx="auto">
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

export default Register;
