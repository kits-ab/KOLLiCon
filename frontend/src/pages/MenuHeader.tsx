import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useNavigate } from "react-router-dom";
import { signOut } from '@/utils/Auth';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { GlobalStyles } from '@kokitotsos/react-components';

const drawerBleeding = 11;

interface Props {
    window?: () => Window;
}

const Root = styled('div')(() => ({
    marginLeft: "88%",
    height: "80px"
}));

const StyledBox = styled('div')(() => ({
  backgroundColor: '#777777',
  height: '100%',
  borderRadius: '20px 20px 0px 0px',
}));

const LogoutChildPart = styled('div')(() => ({
  backgroundColor: '#333333',
  height: '60%',
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center',
  borderTop: '2px solid white',
  color: 'white',
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
    navigate('/login')
  }
  
  return ( 
    <>
    <GlobalStyles/>
    <Root>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(30% - ${drawerBleeding}px)`,
            overflow: 'visible',
            backgroundColor: "black",
            borderRadius: '20px 20px 0px 0px',
          },
        }}
      />
        <MenuIcon sx={{height: 50, width: 50, zIndex: 1000}} style={{color: "white", position: "fixed"}} onClick={toggleDrawer(true)}/>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox/>
        
        <LogoutChildPart >
        <ExitToAppIcon onClick={() => { signOut(); logoutPage(); }} />
        <Typography onClick={() => { signOut(); logoutPage(); }}>Logout</Typography>
        </LogoutChildPart>
      </SwipeableDrawer>  
    </Root>
    </>
  );
}