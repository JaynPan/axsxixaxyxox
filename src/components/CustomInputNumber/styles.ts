import styled from 'styled-components';

export const Container = styled.div`
  padding: 8px;
  display: flex;
`;

export const NativeInputNumber = styled.input`
  /* hide default Arrow buttons */
  /* Firefox */
  -moz-appearance: textfield;
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  width: 48px;
  height: 48px;
  font-size: 16px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'auto')};
`;

export const Button = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid rgb(30, 159, 210);
  border-radius: 4px;
  color: rgb(30, 159, 210);
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? '0.48' : '1')};

  &:hover {
    background-color: rgb(240, 253, 255);
  }
`;
