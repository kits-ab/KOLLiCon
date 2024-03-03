import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Button = styled(MuiButton)({
  backgroundColor: '#596b4d',
  color: '#ffffff',
  fontWeight: 'normal',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#475a39',
  },
  '&:active': {
    backgroundColor: '#354a2b',
  },
  '&.Mui-disabled': {
    backgroundColor: '#4B5048',
    color: 'gray',
  },
});

export default Button;
