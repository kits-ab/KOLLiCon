import styled from '@emotion/styled';
import Box from '@mui/material/Box';

export const EventsWrapper = styled(Box)`
  margin-left: auto;
  margin-right: auto;
  max-width: 50%;
  @media (max-width: 500px) {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    max-width: 90%;
  }
`;

export const PStyled = styled.p`
  margin-top: 50%;
  font-size: 30px;
  font-weight: bold;
  @media (max-width: 500px) {
    font-size: 40px;
    margin-top: 50%;
  }
`;

export const StyledButton = styled.button`
  padding: 6px;
  border-radius: 6px;
  border: none;
  margin-top: 2%;
  max-width: 30%;
  background-color: #596b4d;
  margin-left: 35%;
  color: #d4d4d4;
  font-size: 15px;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  text-align: center;
  font-family: sans-serif;
`;

export const StyledInput = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: none;
  background-color: #424241;
  margin: 2% 7%;
  border: 1px solid gray;
  color: #cccccc;
  min-height: 45px;
  ::placeholder {
    color: #cccccc;
    position: absolute;
    padding: 13px 0px 0 10px;
    left: 0px;
    top: 0px;
    right: 10px;
  }
`;

export const StyledTextArea = styled.textarea`
  padding: 8px;
  border-radius: 6px;
  border: none;
  background-color: #424241;
  margin: 2% 7%;
  border: 1px solid gray;
  color: #cccccc;
  ::placeholder {
    color: #cccccc;
    position: absolute;
    padding: 7px 10px;
    left: 0px;
    top: 0px;
    right: 10px;
  }
`;

export const StyledSelect = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: none;
  margin: 2% 7%;
  background-color: #424241;
  border: 1px solid gray;
  color: #cccccc;
`;

export const StyledLine = styled.hr`
  width: 100%;
  margin: 15px auto;
  border: none;
  border-top: 1px solid #272727;
  height: 0.1px;
`;
