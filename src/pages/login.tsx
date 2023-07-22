import { Flex, Text, Center } from '@chakra-ui/react';
import AppInput from '../components/input';
import { LoginFormType } from '../utils/schema';
import { useLoginForm } from '../utils/form';
import AppButton from '../components/button';

const Login = () => {
    const onLogin = async (data: LoginFormType) => {
        console.log(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    const { register, handleFormSubmit, errors } = useLoginForm(onLogin);

    return (
        <Center h="100vh">
            <Flex bg="white" rounded="2xl" shadow="inner" p="2rem" width={{ base: "90%", sm: "80%", md: "60%" }} mx="auto" flexDir="column">
                <Text fontSize="2rem" fontWeight="bold" mb="3rem">Welcome Back</Text>
                <form
                    onSubmit={handleFormSubmit}
                >
                    <Flex alignItems="center" justifyContent="center" flexDir='column' w={{base: "96%", md: "80%"}} mx="auto">
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
                        <AppButton
                            type="submit"
                            variant="primary"
                            width="100%"
                            // onClick={handleFormSubmit}
                            loading={false}
                        >
                            Sign In
                        </AppButton>
                    </Flex>
                </form>
            </Flex>
        </Center>
    )
}

export default Login;