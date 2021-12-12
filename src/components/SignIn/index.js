import React from "react";
import { Container, FormWrap, Icon, FormContent, Form, FormH1, FormLabel, FormInput, FormButton, Text } from "./SigninElements";
import { useAlert } from "react-alert";

const SignIn = () => {
    const alert = useAlert();

    const username = React.useRef(null);
    const password = React.useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let login = await fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value,
            }),
            credentials: "include",
        });
        let json = await login.json();
        if (login.status === 200) {
            console.log("Login success:", json);
            window.location.href = "/wallet";
        } else {
            alert.error(json.message);
            console.error(json.message || "Login failed");
        }
    };

    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">Mirai 未来</Icon>
                    <FormContent>
                        <Form onSubmit={handleSubmit}>
                            <FormH1>Please Sign In Below</FormH1>
                            <FormLabel htmlFor="for">Email:</FormLabel>
                            <FormInput type="email" required ref={username} placeholder="wenjia.li@mirai.cash" />
                            <FormLabel htmlFor="for">Password:</FormLabel>
                            <FormInput type="password" required ref={password} placeholder="*******" />
                            <FormButton type="submit">Continue</FormButton>
                            <Text onClick={() => alert.error("Coming soon")}>Forgot password?</Text>
                            <Text onClick={() => (window.location.href = "/signup")}>New User? Click Here!</Text>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    );
};

export default SignIn;
