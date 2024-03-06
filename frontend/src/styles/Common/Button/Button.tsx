import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Colors } from '../colors';

const Button = styled(MuiButton)({
  backgroundColor: `${Colors.primaryAddButton}`,
  color: '#ffffff',
  fontWeight: 'normal',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: `${Colors.hoverAddButton}`,
  },
  '&:active': {
    backgroundColor: '#354a2b',
  },
  '&.Mui-disabled': {
    backgroundColor: `${Colors.disableButton}`,
    color: 'gray',
  },
});

export default Button;
