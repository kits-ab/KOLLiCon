import { styled } from '@mui/material/styles';
import { Colors } from '@/styles/Common/colors';

export const AddAcitivityStyling = styled('div')(() => ({
  color: 'white',
  borderRadius: '10px',
  padding: '20px',
  marginTop: '20px',
  marginBottom: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `${Colors.secondaryBackground}`,
}));