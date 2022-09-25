/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Card = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  padding: 50px;
  box-shadow: 10px 10px 5px #888888;
  margin-bottom: 20px;
`;
export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
`;
export const InputContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  input {
    width: 100%;
    padding: 10px;
  }
`;
export const ButtonStyle = styled.button`
  width: 100%;
  font-size: 16px;
  padding: 5px;
  padding: 15px 32px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  background-color: #1366e7;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #64748b;
  }
`;
export const GuestList = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 500px;

  padding: 10px;
  flex-direction: row;
  border: 0.5px solid black;
  border-bottom: 0.5px solid black;
`;
export const RemoveButton = styled.button`
  padding: 5px 15px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;

  border: none;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  background-color: #ef233c;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #64748b;
  }
`;

export const CheckBox = styled.input`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
