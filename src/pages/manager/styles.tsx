import styled from "styled-components";

export const InputContainer = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    align-items:center;
    justify-content: space-around;
    margin-bottom: 20px;
`;

export const FormContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-around;
    margin-top: 20px;

`;
export const SendButton = styled.button`
  background-color: #EF5B0C;
  border-style:none;
  border-radius: 15px;
  width: 80px;
  height: 20px;
`;
export const BackButton = styled.button`
  position: fixed;
  border: none;
  width: 40px;
  font-size: 30px;
  height: 40px;
  background-color: #EF5B0C;
  color: #fff;
  top: 10px;
  right: 10px;
  border-radius: 100%;
`;