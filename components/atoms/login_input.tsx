import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 3px;
  font-size: 16px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  &::placeholder {
    opacity: 0.3;
  }

  &:focus {
    box-shadow: 1px 1px 1px ${({ theme }) => theme.primary};
    opacity: 0.8;
  }
`;

export default Input;
