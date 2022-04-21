import styled from 'styled-components';
import Loader from 'react-loader-spinner';

export default function Button ({ isLoading = false, children, ...props }) {
  return (
    <StyledButton {...props}>
      {
        isLoading
         ? <Loader type="ThreeDots" color="#FFF" height={20} width={20} />
         : children
      }
    </StyledButton>
  )
}

const StyledButton = styled.button`
  width: 100%;
  border: none;
  padding: 16px;
  background-color: rgb(53,121,220);
  color: #FFF;
  margin-top: ${props => props.noMarginTop ? '0px' : '16px'};
  margin-bottom: ${props => props.noMarginBottom ? '0px' : '16px'};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgb(44, 97, 176);
  }
`;
