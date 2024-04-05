import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Logotype, Contact, types, Image } from '@kokitotsos/react-components';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import { LogoutChildPart } from '@/styles/MenuStyles/StylesForMenu';
import { useUser } from '@/utils/Authorization/Auth';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useUserProfile } from '@/utils/Hooks/useUserProfile';

function UserProfile(props: any) {
  const { setDisplayUserProfile } = props;
  const [open, setOpen] = React.useState(false);
  const { signOut } = useUser();
  const { name, email, phoneNumber, picture } = useUserProfile();

  const closeUserProfile = () => {
    setDisplayUserProfile(false);
  };

  React.useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <Drawer
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
        variant='permanent'
        sx={{ width: '100%' }}
      >
        <ArrowBackIosIcon
          sx={{ color: '#DBDBD8', position: 'relative', bottom: 1, cursor: 'pointer'}}
          onClick={closeUserProfile}
        ></ArrowBackIosIcon>
        <div
          style={{
            backgroundColor: '#596B4D',
            width: '100%',
            height: '170px',
            position: 'absolute',
            top: 60,
            left: -1,
          }}
        >
          <div style={{ position: 'relative', left: 250, top: 35 }}>
            <Logotype color='#E3E3E3' width={130} />
          </div>
        </div>
        <Image
          href='#'
          src={picture}
          style={{ marginTop: '50px', marginLeft: '20px', height: '200px', width: '150px' }}
        />
        <div style={{ marginTop: '30px' }}>
          <div style={{ marginLeft: '20px', color: '#E3E3E3', fontSize: '30px' }}>{name}</div>
          <div style={{ marginLeft: '20px', color: '#6F6F70', fontSize: '20px' }}>{email}</div>
          <Contact
            style={{ marginLeft: '20px', color: '#6F6F70' }}
            info={{
              phone: new types.PhoneNumber(phoneNumber),
            }}
            type={0}
          />
        </div>
        <LogoutChildPart
          style={{ position: 'fixed', height: '100px', width: '100%', bottom: 0, right: 0 }}
        >
          <ExitToAppIcon
            cursor='pointer'
            onClick={() => {
              signOut();
            }}
          />
          <Typography
            component='div'
            style={{ padding: '20px 0 20px 0' }}
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Typography>
        </LogoutChildPart>
      </Drawer>
    </>
  );
}

export default UserProfile;
