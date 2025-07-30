import styled from 'styled-components';

const IconButton = styled.p`
  max-width: 350px;
  display: flex;
  justify-content: center;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  width: max-content;
  transition: all 0.2s;
  font-size: 14px;
  white-space: wrap;
  align-items: center;
  cursor: pointer;
  & svg {
    height: 20px;
    margin-right: 6px;
  }

  &:hover {
    color: ${({ theme }) => theme.primaryLight};
  }
`;

export default IconButton;
