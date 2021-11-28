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
  background-color: #e6d5d5;
  box-shadow: 0px 17px 9px -15px rgba(245, 40, 145, 0.8);
  border-radius: 18px;
  padding: 0 1rem;
  transition: all 0.20s ease-in;

  &:hover {
    transform: translateY(-7px);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Input;
