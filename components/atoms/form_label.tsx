import styled from 'styled-components';

const Label = styled.label<{
  direction?: string;
  margin?: string;
  width?: string;
  pointer?: boolean;
}>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
  font-weight: 600;
  margin: ${({ margin }) => (margin ? margin : '24px 0')};
  /* position: relative; */
  z-index: 0;
  width: ${({ width }) => (width ? width : '100%')};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'initial')};
  & input[type='text'] {
    display: block;
    margin-top: 15px;
  }
  & span {
    display: flex;
    flex-wrap: nowrap;
  }
`;

export default Label;
