import styled from 'styled-components';

export default styled.div`
  font-size: 1.4em;
  margin-bottom: 5px;

  &::after {
    content: ':';
  }

  &:not(:first-child) {
    margin-top: 16px;
  }
`;
