import styled from 'styled-components';

export const Button = styled.button`
  width: 48px;
  height: 48px;
  font-size: 16px;
  border: 1px solid rgb(30, 159, 210);
  border-radius: 4px;
  color: rgb(30, 159, 210);
  background-color: #fff;
  font-size: 24px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? '0.48' : '1')};
`;

export const Input = styled.input`
  width: 48px;
  height: 48px;
  font-size: 16px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 8px;
`;
