import styled from "styled-components";
import {Trash} from "@styled-icons/fa-solid/Trash"

export const DeleteButton = styled.button`
  position: relative;
  align-self: flex-end;
  border: none;
  width: 40px;
  font-size: 30px;
  height: 40px;
  background-color: #EF5B0C;
  color: #fff;
  border-radius: 100%;
`;

export const TrashIcon = styled(Trash)`
    width: 20px;
`;