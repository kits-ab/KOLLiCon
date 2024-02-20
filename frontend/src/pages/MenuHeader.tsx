import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '@/utils/Auth';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { GlobalStyles, Text } from '@kokitotsos/react-components';
import Beer from '../assets/BearWithMe.png';

const drawerBleeding = 11;

interface Props {
  window?: () => Window;
}

const Root = styled('div')(() => ({
  marginLeft: '88%',
  height: '80px',
}));

const StyledBox = styled('div')(() => ({
  backgroundColor: 'rgba(38,38,38,0.97)',
  height: '100%',
  borderRadius: '20px 20px 0px 0px',
}));

const LogoutChildPart = styled('div')(() => ({
  backgroundColor: '#343434',
  height: '60%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const BeerWithMe = styled('div')(() => ({
  backgroundColor: 'rgba(38,38,38,0.97)',
  height: '40%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  flexDirection: 'column',
}));

export default function SwipeableEdgeDrawer(props: Props) {
  const navigate = useNavigate();

  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const logoutPage = () => {
    navigate('/login');
  };

  return (
    <>
      <GlobalStyles />
      <Root>
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(30% - ${drawerBleeding}px)`,
              overflow: 'visible',
              backgroundColor: 'black',
              borderRadius: '20px 20px 0px 0px',
            },
          }}
        />
        <MenuIcon
          sx={{ height: 50, width: 50, zIndex: 1000 }}
          style={{ color: 'white', position: 'fixed' }}
          onClick={toggleDrawer(true)}
        />
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
          }}
        >
          <StyledBox />

          <BeerWithMe>
            <Text>
              <p style={{ textAlign: 'center', marginBottom: '15px', fontSize: '20px' }}>Schema</p>
              <p
                style={{
                  textAlign: 'center',
                  marginBottom: '15px',
                  marginTop: '20px',
                  fontSize: '20px',
                }}
              >
                Min profil
              </p>
              <p
                style={{
                  textAlign: 'center',
                  marginBottom: '15px',
                  marginTop: '20px',
                  fontSize: '20px',
                }}
              >
                Tidigare KitsCons
              </p>
              <Link to='https://beerwithme.se' style={{ textDecoration: 'none', color: 'white' }}>
                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '70%',
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
                  <p style={{ fontSize: '20px' }}>BeerWithMe</p>
                </p>
              </Link>
            </Text>
          </BeerWithMe>

          <LogoutChildPart>
            <ExitToAppIcon
              onClick={() => {
                signOut();
                logoutPage();
              }}
            />
            <Typography
              onClick={() => {
                signOut();
                logoutPage();
              }}
            >
              <p>Logout</p>
            </Typography>
          </LogoutChildPart>
        </SwipeableDrawer>
      </Root>
    </>
  );
}
