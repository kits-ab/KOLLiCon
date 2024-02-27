import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [schedules, setSchedules] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchAllSchedules = async () => {
    const responseOfSchedules = await axios.get('http://localhost:8080/api/allschedule');
    console.log(responseOfSchedules.data);
    setSchedules(responseOfSchedules.data);
  };

  useEffect(() => {
    fetchAllSchedules();
  }, []);

  const selectedSchedule = async (selectedSchedule) => {
    await axios.post(`http://localhost:8080/api/generateMdFile/${selectedSchedule.id}`);

    const scheduleJSON = JSON.stringify(selectedSchedule);
    const blob = new Blob([scheduleJSON], { type: 'application/json' });

    console.log(scheduleJSON);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${String(selectedSchedule.title)}.json`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(link.href);
    }, 100);
  };

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open dialog
      </Button>

      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle
          sx={{ m: 3, p: 3, width: '150px', marginLeft: '100px' }}
          id='customized-dialog-title'
        >
          Exportera
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        {schedules.map((value: { id: string }, index: number) => (
          <DialogContent key={index} onClick={() => selectedSchedule(value)} dividers>
            {String(value.title)}
          </DialogContent>
        ))}

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button autoFocus onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
