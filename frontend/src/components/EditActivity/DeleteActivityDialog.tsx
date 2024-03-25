import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { CancelButton } from '@/styles/RegisterActivity/StyledActivity';
import { SaveButton } from '@/styles/RegisterActivity/StyledActivity';
import { Text } from '@kokitotsos/react-components';
import { Colors } from '../../styles/Common/colors';

const TerminateActivityDialog = ({
  open,
  onClose,
  onTerminate,
}: {
  open: boolean;
  onClose: () => void;
  onTerminate: () => void;
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { backgroundColor: `${Colors.primaryBackground}` } }}
    >
      <Text>
        <div style={{ position: 'relative', right: 20, padding: '20px'}}>
          <h3 style={{ position: 'relative', left: 20, marginBottom: '20px'}}>
            Vill du terminera aktiviteten?
          </h3>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <SaveButton
              style={{ position: 'relative', left: 40 }}
              onClick={onTerminate}
              color='error'
            >
              Ja
            </SaveButton>
            <CancelButton
              style={{ position: 'relative', right: 3 }}
              onClick={onClose}
              color='primary'
            >
              Nej
            </CancelButton>
          </Box>
        </div>
      </Text>
    </Dialog>
  );
};

export default TerminateActivityDialog;
