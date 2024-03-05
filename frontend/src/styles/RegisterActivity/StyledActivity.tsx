import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextArea from '@mui/joy/Textarea';
import Button from '../Common/Button/Button';

export const EventsWrapper = styled(Box)`
  margin-left: auto;
  margin-right: auto;
  max-width: 50%;
  padding-bottom: 10%;
  @media (max-width: 650px) {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    max-width: 90%;
  }
`;

export const GlobalBox = styled(Box)`
 width: 100%;
 height: 100%;
`;

export const TitleStyled = styled.div`
font-weight: lighter;
font-size: 15px;
color: #D4D4D4;
margin: 2% 7% 1% 7%;
`;

export const HeaderStyled = styled.div`
font-weight: lighter;
color: #D4D4D4;
margin: 2% 0 2% 28%;
text-align:initial;
font-size:27px;
fontFamily: segueUI;
@media (max-width: 650px) {
  margin: 2% 7% 1% 11%;
}
`;

export const BoxWrapper = styled(Box)`
 display: flex;
 flex-direction: column;
`;

export const BoxWrapper1 = styled(BoxWrapper)`
flex-direction: row;
margin-top: 2%;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  text-align: center;
  font-family: sans-serif;
`;

export const StyledSelect = styled.select`
  padding: 8px;
  border-radius: 2px;
  border: none;
  margin: 2% 7%;
  background-color: #262626;
  border: 1px solid #3A3A39;
  color: #cccccc;
`;

export const StyledLine = styled.hr`
  width: 100%;
  margin: 15px auto;
  border: none;
  border-top: 1px solid #3A3A39;
  height: 0.1px;
`;

export const StyledLine1 = styled(StyledLine)`
width: 85%;
margin: 40px auto;
`

export const SubmitButton = styled(Button) ({
  padding: '3px',
  borderRadius: '6px',
  border: 'none',
  marginTop: '2%',
  maxWidth: '30%',
  backgroundColor: '#596b4d',
  marginLeft: '35%',
  color: '#d4d4d4',
  fontSize: '15px',
});

export const CancelButton = styled(Button)({
  width: '20%',
  position: 'relative',
  left: '40%',
  height: '30px',
  border: '1px solid gray',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: '#454545',
  },
  
});

export const ErrorStyled = styled.div`
  color: #963939;
  font-weight: lighter;
  margin: 4% 0 4% 0;
`;

export const SaveButton = styled(Button)({
  width: '20%',
  position: 'relative',
  left: '72.5%',
  marginRight: '-10%',
  height: '30px',
});

export const AddButton = styled(Button)({
  cursor: 'pointer',
  padding: '1px',
  borderRadius: '6px',
  marginTop: '4%',
  maxWidth: '20%',
  marginLeft: '41%',
  color: '#d4d4d4',
  fontSize: '11px',
});

export const DeleteButton = styled(Button)({
  fontSize: '11px',
  backgroundColor: '#963939',
  cursor: 'pointer',
  padding: '0.5px',
  '&:hover': {
    backgroundColor: '#6F2A2A',
  },
});

export const AddedPresenterList = styled(Box)`
  margin: 0 1% 4% 0;
  color: #709756;
  max-width: 100%;
  font-weight: initial;
  font-size: 15px;
`;

export const PresenterBoxWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2%;
  margin: 0 8% 0 7%;
`;

export const ListStyled = styled.li`
  color: #cccccc;
  background-color: #262626;
  border: 1px solid #3A3A39;
  border-radius: 2px;
  margin: 4px;
  padding: 4px 8px;
  cursor: pointer;
  list-style: none;
`;

export const TypeFormStyled = {
  margin: '5% 7% 0 7%',
  height: '-20px',
  '& .MuiInputBase-root': {
    color: 'gray',
    border: '1px solid #3A3A39',
    backgroundColor: '#262626',
    borderRadius: '4px',
  },
  '& .MuiFormLabel-root': {
    color: 'gray',
    fontSize: '15px',
  },
  '& .MuiOutlinedInput-root': {
    height: '50px',
  },
};

export const TypeSelectStyled = {
  backgroundColor: '#262626',
  color: '#cccccc',
  maxHeight: '200px',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: '#cccccc #424241',
};

export const SuggestionBoxWrapper = styled(Box)`
  display: flex;
  justify-content: start;
  text-align: start;
  margin-top: 8px;
`;

export const SuggestionBoxStyled = styled(Box)`
  margin-left: 6%;
  width: 88%;
  padding: 0;
  list-style: none;
  max-height: 110px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cccccc #424241;
`;

export const DateTimePickerWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 2%;
`;

export const InputStyled = styled(Input)`
  margin: 2% 7% 0 7%;
  padding: 0 0 0 12px;
  background-color: #262626;
  color: #DDDDDD;
  border: 1px solid #3A3A39;
  border-radius: 4px;
  @media (max-width: 650px) {
    padding: 0 0 0% 2%;
  }
`;

export const TextAreaStyled = styled(TextArea)`
  height: 100px;
  margin: 2% 7% 0 7%;
  padding: 8px 0 0% 12px;
  background-color: #262626;
  color: #B6B6B6;
  border: 1px solid #3A3A39;
  border-radius: 4px;
  overflow: 100px;
  scrollbar-width: thin;
  @media (max-width: 650px) {
    padding: 2% 0 0% 2%;
  }
`;
