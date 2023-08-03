import { Flex, Text, Center, Button, Box } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import AppInput, { CustomPhoneInput } from "../components/input";
import { SignUpFormType } from "../utils/schema";
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
    const [loading, setLoading] = useState(false);
    const { mutateAsync: reg } = UseRegisterMutation();
    const navigate = useNavigate();

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
                    shadow="inner"
                    p="2rem"
                    width={{ base: "90%", sm: "60%", md: "40%" }}
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
                                        className="w-full px-2"
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
                                        className="w-full mt-8"
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

export default Register;
