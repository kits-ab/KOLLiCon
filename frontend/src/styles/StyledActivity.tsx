import styled from '@emotion/styled';
import { Box } from '@mui/material';

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
  margin-bottom: 4%;
  max-width: 30%;
  background-color: #718863;
  margin-left: 35%;
  color: #D4D4D4;
  font-size:15px;
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
  color: #CCCCCC;
  ::placeholder {
    color: #CCCCCC;
    position: absolute;
    padding: 7px 10px;
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
  color: #CCCCCC;
  ::placeholder {
    color: #CCCCCC;
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
  color: #CCCCCC;
`;

export const StyledLine = styled.hr`
  width: 100%;
  margin: 20px auto;
  border: none; 
  border-top: 1px solid black; 
  height: 0.1px; 
`;
