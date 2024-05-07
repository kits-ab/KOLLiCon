import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Beer from '@/assets/BearWithMe.png';
import Typography from '@mui/material/Typography';
import { signOut, useUser } from '@/utils/Authorization/Auth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Text } from '@kokitotsos/react-components';
import Box from '@mui/material/Box';
import ExportFileUI from '../ExportSchedule/ExportFileUI';
import { Global } from '@emotion/react';
import UserProfile from '../Dashboard/UserProfile';
import {
  LogoutChildPart,
  MenuDiv,
  MenuItem,
  FixedMenuIcon,
  drawerBleeding,
} from '@/styles/MenuStyles/StylesForMenu';
import { Colors } from '@/styles/Common/colors';
import { RenderSchedules } from '../Schedule/RenderSchedules';
import Drawer from '@mui/material/Drawer';
import ScheduleComponent from '../CreateSchedule/ScheduleComponent';
import { Schedule } from '@/types/Schedule';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
  window?: () => Window;
  handleActiveSchedule: (scheduleId: number) => void;
  schedulesData: Schedule[];
}
const MenuDrawer: React.FC<Props> = ({ window, handleActiveSchedule, schedulesData }) => {
  const container = window !== undefined ? () => window().document.body : undefined;
  const [open, setOpen] = React.useState(false);
  const [openSchedule, setOpenSchedule] = React.useState(false);
  const [display, SetDisplay] = React.useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const { isAdmin } = useUser();
  const [displayUserProfile, setDisplayUserProfile] = React.useState(false);
  const menuItems = isAdmin
    ? ['Skapa Schema', 'Tidigare KitsCons', 'Exportera Markdownfil']
    : ['Tidigare KitsCons'];
  // Remove 'Min Profil' for now. Works though.
  // ? ['Skapa Schema', 'Min profil', 'Tidigare KitsCons', 'Exportera Markdownfil']
  // ['Min profil', 'Tidigare KitsCons'];
  const isDesktop = useMediaQuery('(min-width:600px)');

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const toggleDrawerSchedules = (newOpen: boolean) => () => {
    setOpenSchedule(!newOpen);
  };

  const openUI = () => {
    setOpen(false);
    SetDisplay(true);
  };
  const openModal = () => {
    SetDisplay(false);
    setOpenScheduleModal(true);
  };
  const openUserProfile = () => {
    setDisplayUserProfile(true);
    setOpen(false);
  };
  const closeUserProfile = () => {
    setDisplayUserProfile(false);
  };
  const handleMenuItemClick = (label: string) => {
    switch (label) {
      case 'Skapa Schema':
        openModal();
        break;
      case 'Min profil':
        openUserProfile();
        break;
      case 'Tidigare KitsCons':
        setOpenSchedule(true);
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
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            overflow: 'visible',
            backgroundColor: `${Colors.primaryBackground}`,
            color: `${Colors.primaryText}`,
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
            <Box display={'flex'} flexDirection={'column'}>
              {menuItems.map((menuItem, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleMenuItemClick(menuItem)}
                  style={{
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    margin: '13px 0 13px 0',
                    cursor: 'pointer',
                    color: `${Colors.primaryText}`,
                  }}
                >
                  {menuItem}
                </MenuItem>
              ))}
            </Box>
            <Drawer
              PaperProps={{
                overflow: 'hidden',
                sx: {
                  width: isDesktop ? '50%' : '100%',
                },
              }}
              anchor='right'
              open={openSchedule}
              onClose={toggleDrawerSchedules(false)}
            >
              <RenderSchedules
                openSchedule={openSchedule}
                setOpenSchedule={toggleDrawerSchedules(openSchedule)}
                handleActiveSchedule={handleActiveSchedule}
                schedulesData={schedulesData}
              />
            </Drawer>
            <Link to='https://beerwithme.se' style={{ textDecoration: 'none', color: 'white' }}>
              <Box
                sx={{
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
              </Box>
            </Link>
          </Text>
        </MenuDiv>
        <LogoutChildPart>
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
      </SwipeableDrawer>
      {/** Export Modal */}
      {display && <ExportFileUI onClose={() => SetDisplay(false)} />}
      {/** User Profile Modal */}
      <UserProfile onOpen={openUserProfile} onClose={closeUserProfile} open={displayUserProfile} />
      {/** Schedule Modal */}
      <ScheduleComponent
        onClose={() => setOpenScheduleModal(false)}
        onOpen={openModal}
        openScheduleModal={openScheduleModal}
      />
    </>
  );
};
export default MenuDrawer;
