import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '@/utils/Authorization/Auth';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { GlobalStyles, Text } from '@kokitotsos/react-components';
import Beer from '@/assets/BearWithMe.png';
import Box from '@mui/material/Box';
import ExportFileUI from '../ExportSchedule/ExportFileUI';

const drawerBleeding = 11;

interface Props {
  window?: () => Window;
}

const Root = styled('div')(() => ({
  marginLeft: '88%',
  height: '80px',
}));

const LogoutChildPart = styled('div')(() => ({
  backgroundColor: '#393939',
  height: '60%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  cursor: 'pointer',
}));

const MenuDiv = styled('div')(() => ({
  height: '40%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  flexDirection: 'column',
  marginTop: '20px',
}));

const menuItems = [
  { label: 'Schema' },
  { label: 'Min profil' },
  { label: 'Tidigare KitsCons' },
  { label: 'Exportera Markdownfil' },
];
const MenuItem = styled('p')(() => ({
  textAlign: 'center',
  fontSize: '1.1rem',
  cursor: 'pointer',
  '&:hover': {
    color: '#8CAB78',
  },
}));
const FixedMenuIcon = styled(MenuIcon)(() => ({
  position: 'fixed',
  color: 'gray',
  top: 0,
  right: 0,
  zIndex: 1000,
  height: 50,
  width: 50,
}));

function TheMenu(props: Props) {
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [display, SetDisplay] = React.useState(false);

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

  const handleMenuItemClick = (label: string) => {
    switch (label) {
      case 'Schema':
        break;
      case 'Min profil':
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
      <GlobalStyles />
      <Root>
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              overflow: 'visible',
              backgroundColor: '#262626',
              borderRadius: '20px 20px 0px 0px',
            },
          }}
        />
        <Box>
          <FixedMenuIcon fontSize='large' cursor='pointer' sx={{}} onClick={toggleDrawer(true)} />
        </Box>
        <SwipeableDrawer
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
                  <MenuItem style={{ fontSize: '1.1rem' }}>BeerWithMe</MenuItem>
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
      </Root>
    </>
  );
}

export default TheMenu;
