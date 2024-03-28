import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Beer from '@/assets/BearWithMe.png';
import Typography from '@mui/material/Typography';
import { signOut } from '@/utils/Authorization/Auth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Text } from '@kokitotsos/react-components';
import Box from '@mui/material/Box';
import ExportFileUI from '../ExportSchedule/ExportFileUI';
import { Global } from '@emotion/react';
import UserProfile from '../Dashboard/UserProfile';

import {
  LogoutChildPart,
  MenuDiv,
  menuItems,
  MenuItem,
  FixedMenuIcon,
  drawerBleeding,
} from '@/styles/MenuStyles/StylesForMenu';
import { Colors } from '@/styles/Common/colors';

interface Props {
  window?: () => Window;
}

function MenuDrawer(props: Props) {
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [display, SetDisplay] = React.useState(false);
  const [displayUserProfile, setDisplayUserProfile] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const logoutPage = () => {
    navigate('/login');
  };

  const openUI = () => {
    setOpen(false);
    SetDisplay(true);
  };

  const openUserrProfile = () => {
    setDisplayUserProfile(true);
  };

  const handleMenuItemClick = (label: string) => {
    switch (label) {
      case 'Schema':
        break;
      case 'Min profil':
        openUserrProfile();
        break;
      case 'Tidigare KitsCons':
        break;
      case 'Exportera Markdownfil':
        openUI();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {display && <ExportFileUI onClose={() => SetDisplay(false)} />}
      {displayUserProfile && <UserProfile setDisplayUserProfile={setDisplayUserProfile} setOpen />}
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            overflow: 'visible',
            backgroundColor: `${Colors.primaryBackground}`,
            borderRadius: '20px 20px 0px 0px',
          },
        }}
      />
      <Box>
        <FixedMenuIcon fontSize='large' cursor='pointer' sx={{}} onClick={toggleDrawer(true)} />
      </Box>
      <SwipeableDrawer
        PaperProps={{
          sx: {
            overflow: 'visible',
            backgroundColor: `${Colors.primaryBackground}`,
            borderRadius: '20px 20px 0px 0px',
          },
        }}
        container={container}
        anchor='bottom'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
          slotProps: {
            backdrop: { sx: { backgroundColor: 'transparent' } },
          },
        }}
      >
        <MenuDiv>
          <Text>
            {menuItems.map((menuItem, index) => (
              <MenuItem
                key={index}
                onClick={() => handleMenuItemClick(menuItem.label)}
                style={{
                  textAlign: 'center',
                  fontSize: '1.1rem',
                  margin: '13px 0 13px 0',
                  cursor: 'pointer',
                  color: `${Colors.primaryText}`,
                }}
              >
                {menuItem.label}
              </MenuItem>
            ))}
            <Link to='https://beerwithme.se' style={{ textDecoration: 'none', color: 'white' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}
              >
                <img
                  src={Beer}
                  alt=''
                  style={{
                    width: '40px',
                    height: '30px',
                    marginRight: '10px',
                    cursor: 'pointer',
                    alignItems: 'top',
                    marginTop: '10px',
                  }}
                />
                <MenuItem style={{ fontSize: '1.1rem', color: `${Colors.primaryText}` }}>
                  BeerWithMe
                </MenuItem>
              </div>
            </Link>
          </Text>
        </MenuDiv>
        <LogoutChildPart>
          <ExitToAppIcon
            cursor='pointer'
            onClick={() => {
              signOut();
              logoutPage();
            }}
          />
          <Typography
            component='div'
            style={{ padding: '20px 0 20px 0' }}
            onClick={() => {
              signOut();
              logoutPage();
            }}
          >
            Logout
          </Typography>
        </LogoutChildPart>
      </SwipeableDrawer>
    </>
  );
}

export default MenuDrawer;
