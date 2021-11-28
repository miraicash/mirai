import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <Container>
      <h1>
        Your Education Can Make a Difference!
      </h1>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 65px;
    font-weight: 70000;
    color: #fff;

    @media (max-width: 700px) {
      display: none;
    }
  }
`;

export default Main;
