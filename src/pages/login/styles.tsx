import styled from "styled-components";

export const LoginInput = styled.input`
  background: grey;
  border-style: none;
  height: 20px;
  border-radius: 15px;
  padding-left: 5px;
  ::placeholder{
    color: black;
    padding-left: 5px;
  }
`;

export const LoginContainer = styled.div`
  display:flex;
  height: 65px;
  flex-direction: column;
  justify-content:space-around;

`;

export const LoginButton = styled.button`
  background-color: #EF5B0C;
  border-style:none;
  border-radius: 15px;
  width: 80px;
  height: 20px;
`;

