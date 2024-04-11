import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { Colors } from '../../styles/Common/colors';
import { CancelButton, SaveButton } from '@/styles/RegisterActivity/StyledActivity';

const BootstrapDialog = styled(Dialog)(() => ({
  '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
    backgroundColor: `${Colors.primaryBackground}`,
  },
  '& .css-m64m4g-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': {
    color: `${Colors.primaryAddButton}`,
  },
  '& .css-1m9pwf3': {
    width: '50%',
    position: 'absolute',
    left: '25%',
  },
  '& .css-i4bv87-MuiSvgIcon-root': {
    width: '25px',
    height: '25px',
  },
  '& .css-m64m4g-MuiButtonBase-root-MuiCheckbox-root': {
    padding: '3px',
  },
}));

//MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium css-m64m4g-MuiButtonBase-root-MuiCheckbox-root
const backendUrl = import.meta.env.VITE_API_URL;

function ExportFileUI({ onClose }: { onClose: any }) {
  const [open, setOpen] = React.useState(true);
  const [schedules, setSchedules] = React.useState([]);
  const [idOfPickedSchedule, setIdOfPickedSchedule] = React.useState<string[]>([]);

  const handleClose = () => {
    setOpen(true);
  };

  const fetchAllSchedules = async () => {
    const responseOfSchedules = await axios.get(`${backendUrl}/api/allschedule`);
    setSchedules(responseOfSchedules.data);
  };

  React.useEffect(() => {
    fetchAllSchedules();
  }, []);

  // Track id of selected schedules.
  const addSelectedObjectIdToState = (objectId: string) => {
    const isSelected = idOfPickedSchedule.includes(objectId);

    if (isSelected) {
      setIdOfPickedSchedule((alreadyExitingId) => alreadyExitingId.filter((id) => id !== objectId));
    } else {
      setIdOfPickedSchedule((alreadyExitingId) => [...alreadyExitingId, objectId]);
    }
  };

  // Create yaml objects of selected schedules.
  const createYamlobjects = async () => {
    for (let i = 0; i < idOfPickedSchedule.length; i++) {
      const yolo = await axios.get(`${backendUrl}/api/${idOfPickedSchedule[i]}/generatemdfile`);
      const titleOfSchedule = await axios.get(
        `${backendUrl}/api/scheduletitle/${idOfPickedSchedule[i]}`,
      );
      selectedSchedule(yolo.data, titleOfSchedule.data);
    }
  };

  // Create BLOB object of selected schedules.
  const selectedSchedule = (theSchedule: string, title: string) => {
    const blob = new Blob([theSchedule], { type: 'application/md' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${String(title)}.md`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(link.href);
    }, 100);
  };

  return (
    <>
      <BootstrapDialog
        sx={{ marginLeft: 'auto', marginRight: 'auto', overflow: 'hidden' }}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle
          sx={{
            backgroundColor: `${Colors.primaryBackground}`,
            color: '#cccccc',
            width: '270px',
            height: '70px',
          }}
          id='customized-dialog-title'
        >
          Exportera markdown fil
        </DialogTitle>
        <div
          style={{
            overflowY: 'auto',
            maxHeight: '200px',
            scrollbarWidth: 'thin',
            scrollbarColor: `${Colors.textColor} ${Colors.scrollColor}`,
          }}
        >
          {schedules.map((value: { id: string; title: string }, index: number) => (
            <DialogContent
              sx={{
                display: 'flex',
                backgroundColor: `${Colors.primaryBackground}`,
                color: '#cccccc',
                width: '99%',
                height: '45px',
                overflow: 'hidden',
              }}
              key={index}
              dividers
            >
              {String(value.title)}
              <Checkbox
                disableTouchRipple
                sx={{ color: '#cccccc', marginLeft: 'auto' }}
                onClick={() => {
                  addSelectedObjectIdToState(value.id);
                }}
              />
            </DialogContent>
          ))}
        </div>

        <DialogActions style={{ marginRight: 'auto', marginTop: '20px' }}>
          <CancelButton style={{ left: '55%' }} autoFocus onClick={onClose}>
            Close
          </CancelButton>
          <SaveButton
            style={{ left: '55%' }}
            onClick={() => {
              onClose();
              createYamlobjects();
            }}
          >
            Save
          </SaveButton>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default ExportFileUI;
