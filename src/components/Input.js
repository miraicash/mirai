import React from "react";
import styled from "styled-components";

const Input = ({ type, placeholder }) => {
  return (
    <Container>
      <StyledInput
        placeholder={placeholder && placeholder}
        type={type ? type : "text"}
        required
        autocomplete="off"
      />
    </Container>
  );
};

const StyledInput = styled.input`
  width: 80%;
  max-width: 350px;
  min-width: 250px;
  height: 50px;
  border: none;
  margin: 0.5rem 0;
  background-color: #e8ede9;
  box-shadow: 0px 17px 9px -15px rgba(0, 0, 0, 0);
  border-radius: 180px;
  padding: 0 1rem;
  transition: all 0.20s ease-in;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Input;
