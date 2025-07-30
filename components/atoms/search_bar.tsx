import styled from 'styled-components';

const SearchBar = styled.input`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);

  height: 33px;
  min-width: 200px;
  max-width: 350px;
  width: 100%;
  background-image: url('/loupe.png');
  background-repeat: no-repeat;
  background-position: 95% 50%;
  padding-right: 16px;
  outline: none;
`;

export default SearchBar;
