import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <Container>
      <h1>
        Sign Up Today To Begin Any Transaction!
      </h1>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 60px;
    font-weight: 70000;
    color: #fff;

    @media (max-width: 700px) {
      display: none;
    }
  }
`;

export default Main;
