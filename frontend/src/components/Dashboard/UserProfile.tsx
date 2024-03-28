import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import userManager from '@/utils/Authorization/Auth';
import userManagerConfig from '@/utils/Authorization/Auth';

interface UserProfileProps {
  setDisplayUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserProfile(props: any) {
  const { setDisplayUserProfile } = props;
  const [open, setOpen] = React.useState(false);

  const closeUserProfile = () => {
    setDisplayUserProfile(false);
  };

  const show = async () => {
    const currentEmail = userManager.getUser().then((user) => user?.profile.email);
    console.log(currentEmail.then((email) => console.log(email)));
  };

  React.useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <SwipeableDrawer
        PaperProps={{
          sx: {
            width: '100%',
            height: '100%',
            padding: '20px',
          },
        }}
        anchor={'right'}
        open={open}
        onClose={closeUserProfile}
        onOpen={closeUserProfile}
        variant='temporary'
        sx={{ width: '100%' }}
      >
        <div style={{ color: 'white' }}>HELLO!</div>
        <button onClick={show}>Show</button>
      </SwipeableDrawer>
    </>
  );
}

export default UserProfile;
