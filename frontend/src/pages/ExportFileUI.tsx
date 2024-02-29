import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function ExportFileUI({ onClose }) {
  const [open, setOpen] = React.useState(true);
  const [schedules, setSchedules] = React.useState([]);
  const [make, setMake] = React.useState({});
  const [title, setTitle] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(true);
  };

  const fetchAllSchedules = async () => {
    const responseOfSchedules = await axios.get('http://localhost:8080/api/allschedule');
    setSchedules(responseOfSchedules.data);
  };

  React.useEffect(() => {
    fetchAllSchedules();
  }, []);

  // Man får göra yolo till en lista eller array för att få ett flertal objekt.
  const recieveTheScheduleObject = async (schedule) => {
    await axios.post(`http://localhost:8080/api/generateMdFile/${schedule.id}`);
    const yolo = await axios.get(`http://localhost:8080/api/${schedule.id}/getyaml`);
    setMake(yolo.data);
  };

  const selectedSchedule = () => {
    console.log(title);

    const blob = new Blob([make], { type: 'application/md' });

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

        {schedules.map((value: { id: string }, index: number) => (
          <DialogContent
            key={index}
            onClick={() => {
              recieveTheScheduleObject(value);
              setTitle(value.title);
            }}
            dividers
            sx={{
              '&:hover': {
                backgroundColor: '#555555',
                cursor: 'pointer',
              },
            }}
          >
            {String(value.title)}
          </DialogContent>
        ))}

        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              onClose();
              selectedSchedule();
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
