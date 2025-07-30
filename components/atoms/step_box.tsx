import styled from 'styled-components';
import { Check } from '@styled-icons/boxicons-regular/Check';
import { Close } from '@styled-icons/remix-line/Close';
const Wrapper = styled.div<{ active?: boolean }>`
  color: ${({ active }) => (active ? 'white' : 'black')};

  background: ${({ color }) => color};
  background: ${({ active, theme, color }) => (active ? theme.primary : color)};
  min-height: 175px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 6px 4px;
  cursor: pointer;
  max-width: 180px;
  width: 100%;
  position: relative;
  border-left: 0px;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  // &::after {
  //   content: '';
  //   -webkit-text-stroke: 1px rgba(0, 0, 0, 0.5);
  //   color: transparent;
  //   font-size: 20px;

  //   width: 0;
  //   height: 0;
  //   border-top: 60px solid transparent;
  //   border-left: 60px solid
  //     ${({ theme, active }) => (active ? theme.primary : '')};
  //   z-index: 100;
  //   border-bottom: 60px solid transparent;
  //   position: absolute;
  //   right: -10px;
  // }
  &:last-child {
    &::after {
      display: none;
    }
  }
`;
const Number = styled.p`
  font-size: 60px;
  font-weight: bold;
`;

const Header = styled.p<{ active?: boolean }>`
  font-weight: bold;
  font-size: 14px;
  color: ${({ color }) => color};

  color: ${({ active, theme, color }) => (active ? 'white' : color)};
`;

const BoxContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  text-align: center;
`;

const HelperText = styled.p`
  font-size: 12px;
  line-height: 1rem;
`;

const StyledCheck = styled(Check)`
  fill: #3dba77;
  width: 32px;
`;

const StyledClose = styled(Close)`
  fill: ${({ theme }) => theme.danger};
  width: 20px;
`;
const StepBox = ({ number, text, helperText, active, state, handleStepChange, improvements }) => {
  if (improvements) {
    return (
      <Wrapper onClick={() => handleStepChange('jump', number)} color="#D3E500" active={active}>
        <Header active={active} color="black">
          {text}
        </Header>
        <Number>
          {' '}
          <StyledClose />
        </Number>
        <BoxContent>
          <HelperText>{helperText}</HelperText>
        </BoxContent>
      </Wrapper>
    );
  }
  const renderState = () => {
    switch (state) {
      case 'default':
        return (
          <Wrapper onClick={() => handleStepChange('jump', number)} color="white" active={active}>
            <Header active={active} color="black">
              {text}
            </Header>
            <Number>{number}</Number>
            <BoxContent>
              <HelperText>{helperText}</HelperText>
            </BoxContent>
          </Wrapper>
        );
      case 'uncompleted':
        return (
          <Wrapper onClick={() => handleStepChange('jump', number)} color="#DEDEDE" active={active}>
            <Header active={active} color="black">
              {text}
            </Header>
            <Number>{number}</Number>
            <BoxContent>
              <HelperText>{helperText}</HelperText>
            </BoxContent>
          </Wrapper>
        );

      case 'completed':
        return (
          <Wrapper
            onClick={() => handleStepChange('jump', number)}
            color="transparent"
            active={active}
          >
            <Header active={active} color="#3dba77">
              {text}
            </Header>

            <Number>{number}</Number>
            <BoxContent>
              <HelperText>{helperText}</HelperText>
              <StyledCheck />
            </BoxContent>
          </Wrapper>
        );

      case 'error':
        return (
          <Wrapper
            onClick={() => handleStepChange('jump', number)}
            color="transparent"
            active={active}
          >
            <Header active={active} color="#D10101">
              {text}
            </Header>

            <Number>
              {' '}
              <StyledClose />
            </Number>
            <BoxContent>
              <HelperText>{helperText}</HelperText>
            </BoxContent>
          </Wrapper>
        );
      default:
        return (
          <Wrapper
            onClick={() => handleStepChange('jump', number)}
            color="transparent"
            active={active}
          >
            <Header active={active} color="black">
              {text}
            </Header>
            <Number> {number}</Number>
            <BoxContent>
              <HelperText>{helperText}</HelperText>
            </BoxContent>
          </Wrapper>
        );
    }
  };
  return <>{renderState()} </>;
};

export default StepBox;
