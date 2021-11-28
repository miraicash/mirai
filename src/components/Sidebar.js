import React from "react";
import styled from "styled-components";
import logo from "../assets/Logo.png";
import Input from "./Input";

const Sidebar = () => {
  return (
    <Container>
      <LogoWrapper>
        <img src={logo} alt="" />
      </LogoWrapper>
      <Form>
        <h2> Sign Up Below</h2>
        <h3> For your Mirai Experience!</h3>
        <h4>
         Already Have An Account? <span>Sign In Here </span>
        </h4>
        <Input placeholder="Name" />
        <Input type="email" placeholder="Email Address" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confrim Password" />
        <button>Sign Up</button>
      </Form>
      <div>
        <Terms>
          © 2021 Mirai. All Rights Reserved. 
        </Terms>
      </div>
    </Container>
  );
};

const Terms = styled.p`
  padding: 0 5rem;
  text-align: center;
  font-size: 15px;
  color: #808080;
  font-weight: 300;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: #000;
    margin-bottom: 2rem;
  }

  button {
    width: 75%;
    max-width: 250px;
    min-width: 150px;
    height: 50px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 19px -5px rgba(0, 0, 0, 0.25);
    border-radius: 18px;
    background: linear-gradient(to right, #ffff66 1%, #333300 100%);
    color: #000;
    font-weight: 1000;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-13px);
    }
  }
`;

const LogoWrapper = styled.div`
  img {
    height: 20rem;
  }

  h3 {
    color: #000;
    text-align: center;
    font-size: 20px;
  }

  span {
    color: #5dc399;
    font-weight: 300;
    font-size: 18px;
  }
`;

const Container = styled.div`
  min-width: 450px;
  backdrop-filter: blur(35px);
  background-color: rgba(189, 187, 73, 0.8);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 10 2rem;

  @media (max-width: 900px) {
    width: 100vw;
    position: absolute;
    padding: 0;
  }

  h4 {
    color: #000;
    font-weight: bold;
    font-size: 18px;
    margin-top: 2rem;

    span {
      color: #fff;
      cursor: pointer;
    }
  }
`;

export default Sidebar;