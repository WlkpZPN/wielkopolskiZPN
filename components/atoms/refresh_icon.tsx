import styled from 'styled-components';
import { RefreshOutline } from '@styled-icons/evaicons-outline/RefreshOutline';

const RefreshIcon = styled(RefreshOutline)`
  width: 25px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  margin-left: 15px;
  /* transition: all 3s;
  &:hover {
    transform: rotate(360deg);
  } */
`;

export default RefreshIcon;
