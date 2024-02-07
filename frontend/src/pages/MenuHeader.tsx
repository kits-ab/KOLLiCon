import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useNavigate } from "react-router-dom";
import { signOut } from '@/utils/Auth';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerBleeding = 11;

interface Props {
    window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
    marginLeft: "80%",
    height: "100%"
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#777777',
  height: '100%',
  borderRadius: '20px 20px 0px 0px',
}));

const LogoutChildPart = styled('div')(({ theme }) => ({
  backgroundColor: '#333333',
  height: '60%',
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center',
  borderTop: '2px solid white',
  color: 'white',
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: 'red',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
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
      <Box sx={{ textAlign: 'center', pt: 1}}>
        <MenuIcon sx={{height: 50, width: 50}} style={{color: "white"}}onClick={toggleDrawer(true)}/>
      </Box>
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
    
  );
}