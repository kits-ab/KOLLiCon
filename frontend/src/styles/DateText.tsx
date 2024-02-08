import styled from '@emotion/styled';

const DateText = styled.h1`
  color: #bbbbbb;
  position: relative;
  text-align: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 120px; // Adjust this to change the length of the line
    height: 1px; // Adjust this to change the thickness of the line
    background: #5c5c5c;
  }

  &::before {
    left: -1px; // Adjust this to change the distance of the line from the text
  }

  &::after {
    right: -1px; // Adjust this to change the distance of the line from the text
  }
`;

export default DateText;
