import Box from '@mui/material/Box';
import { Colors } from '../../styles/Common/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { Text } from '@kokitotsos/react-components';
import { HeaderEditStyled } from '@/styles/RegisterActivity/StyledActivity';
export const DeleteActivityBox = ({
  handleDeleteActivity,
}: {
  handleDeleteActivity: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => (
  <HeaderEditStyled>
    <h3>Uppdatera aktivitiet</h3>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '-10px',
      }}
    >
      <Box
        onClick={handleDeleteActivity}
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <DeleteIcon
          style={{ color: `${Colors.primaryDeleteButton}`, marginTop: '5px', width: '20' }}
        />
        <Text>
          <h4 style={{ marginBottom: '20px' }}>Ta bort</h4>
        </Text>
      </Box>
    </Box>
  </HeaderEditStyled>
);
