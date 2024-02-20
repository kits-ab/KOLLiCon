// StyledCheckbox.js
import styled from '@emotion/styled';

const StyledCheckboxLabel = styled.label`
  margin-right: 10px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  width: 60%;
`;

const StyledCheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const StyledCheckboxCustom = styled.span<{ checked: boolean }>`
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 4px;
    margin-right: 5px;
    background-color: ${(props) => (props.checked ? '#718863' : 'transparent')}; // Change background color based on checked state
`;

export const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: center;
`;

const StyledCheckbox = ({ checked, onChange, children }) => {
    return (
      <StyledCheckboxLabel>
        <StyledCheckboxInput type='checkbox' checked={checked} onChange={onChange} />
        <StyledCheckboxCustom checked={checked} />
        {children}
      </StyledCheckboxLabel>
    );
  };

export default StyledCheckbox;
