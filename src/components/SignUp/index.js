import React from "react";
import { Container, FormWrap, Icon, FormContent, Form, FormH1, FormLabel, FormInput, FormButton, Text } from "./SignupElements";
import { useAlert } from "react-alert";

const SignUp = () => {
    const alert = useAlert();

    const username = React.useRef(null);
    const password = React.useRef(null);
    const firstName = React.useRef(null);
    const lastName = React.useRef(null);
    const debitCardNumber = React.useRef(null);
    const debitCardCVV = React.useRef(null);
    const debitCardExpiry = React.useRef(null);
    const debitCardZip = React.useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let login = await fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"}/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value,
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                debitCardNumber: debitCardNumber.current.value,
                debitCardCVV: debitCardCVV.current.value,
                debitCardExpiry: debitCardExpiry.current.value,
                debitCardZip: debitCardZip.current.value,
            }),
            credentials: "include",
        });
        let json = await login.json();
        if (login.status === 200) {
            console.log("Signup success:", json);
            window.location.href = "/dashboard";
        } else {
            alert.error(json.message);
            console.error(json.message || "Signup failed");
        }
    };

    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">Mirai 未来</Icon>
                    <FormContent>
                        <Form onSubmit={handleSubmit}>
                            <FormH1>Please Sign Up Below</FormH1>
                            <FormLabel htmlFor="for">Email:</FormLabel>
                            <FormInput type="email" required ref={username} placeholder="wenjia.li@mirai.cash" />
                            <FormLabel htmlFor="for">Password:</FormLabel>
                            <FormInput type="password" required ref={password} placeholder="*******" />
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <FormLabel htmlFor="for">First Name:</FormLabel>
                                    <FormInput type="text" required ref={firstName} placeholder="Wenjia" style={{ width: "9rem" }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <FormLabel htmlFor="for">Last Name:</FormLabel>
                                    <FormInput type="text" required ref={lastName} placeholder="Li" style={{ width: "9rem" }} />
                                </div>
                            </div>
                            <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                            <FormH1 style={{ fontSize: "17px" }}>Add funds using your debit card:</FormH1>
                            <FormLabel htmlFor="for">Debit Card Number:</FormLabel>
                            <FormInput type="number" required ref={debitCardNumber} placeholder="1234567890123456" />
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <FormLabel htmlFor="for">MM/YY:</FormLabel>
                                    <FormInput type="text" required ref={debitCardExpiry} placeholder="06/25" style={{ width: "6rem" }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <FormLabel htmlFor="for">CVV:</FormLabel>
                                    <FormInput type="number" required ref={debitCardCVV} placeholder="987" style={{ width: "5rem" }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <FormLabel htmlFor="for">ZIP:</FormLabel>
                                    <FormInput type="number" required ref={debitCardZip} placeholder="10011" style={{ width: "6rem" }} />
                                </div>
                            </div>
                            <FormButton type="submit" style={{ marginTop: "1rem" }}>
                                Continue
                            </FormButton>
                            <Text onClick={() => (window.location.href = "/signin")}>Returning User? Click Here!</Text>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    );
};

export default SignUp;
