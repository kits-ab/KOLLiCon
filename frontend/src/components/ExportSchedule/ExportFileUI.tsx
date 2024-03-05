import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const backendUrl = import.meta.env.VITE_API_URL;

function ExportFileUI({ onClose }: { onClose: any }) {
  const [open, setOpen] = React.useState(true);
  const [schedules, setSchedules] = React.useState([]);
  const [idOfPickedSchedule, setIdOfPickedSchedule] = React.useState<string[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
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
      const yolo = await axios.get(
        `http://localhost:8080/api/${idOfPickedSchedule[i]}/generatemdfile`,
      );
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
      <Button variant='outlined' onClick={handleClickOpen}>
        Open dialog
      </Button>

      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle
          sx={{ m: 3, p: 3, width: '150px', marginLeft: '100px' }}
          id='customized-dialog-title'
        >
          Exportera markdownfile
        </DialogTitle>

        {schedules.map((value: { id: string; title: string }, index: number) => (
          <DialogContent key={index} dividers>
            {String(value.title)}
            <Checkbox
              onClick={() => {
                addSelectedObjectIdToState(value.id);
              }}
            />
          </DialogContent>
        ))}

        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              onClose();
              createYamlobjects();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default ExportFileUI;
