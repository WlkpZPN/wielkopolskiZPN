import styled from 'styled-components';
import { useState } from 'react';
import { DownArrow } from '@styled-icons/boxicons-solid/DownArrow';
import Parser from 'html-react-parser';

const Arrow = styled(DownArrow)<{ expanded?: boolean }>`
  width: 18px;
  transform: ${({ expanded }) => (expanded ? 'rotate(180deg)' : 'rotate(0)')};
  transition: all 0.2s;
  color: ${({ expanded, theme }) => (expanded ? theme.primary : 'black')};
  margin-right: 8px;
`;
const Wrapper = styled.div`
  padding: 12px 0;
`;

const TopText = styled.div<{ expanded?: boolean }>`
  cursor: pointer;
  display: 'flex';
  align-items: center;
  color: ${({ expanded, theme }) => (expanded ? theme.primary : 'black')};
  font-weight: bold;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 12px;
`;

const Expandable = styled.div<{ expanded?: boolean }>`
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
  margin: 12px 0;
  overflow: hidden;
  transition: all 0.2s;
  color: ${({ expanded, theme }) => (expanded ? theme.primary : 'black')};
`;

const QuestionItem = ({ question }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Wrapper>
      <TopText expanded={expanded} onClick={() => setExpanded(!expanded)}>
        <Arrow expanded={expanded} />
        {question.id.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        .&nbsp; {question.question}
      </TopText>
      <Expandable expanded={expanded}>
        {Parser(question.answer || 'Wielkopolski ZPN nie odpowiedział jeszcze na to pytanie')}
      </Expandable>
    </Wrapper>
  );
};

export default QuestionItem;
