import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '@/utils/Auth';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { GlobalStyles, Text, width } from '@kokitotsos/react-components';
import Beer from '../assets/BearWithMe.png';
import Box from '@mui/material/Box';
import axios from 'axios';
import { set } from 'react-hook-form';
import { Schedule } from '@mui/icons-material';


const drawerBleeding = 11;

interface Props {
  window?: () => Window;
}

interface Schedule {
  id: string,
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


const MenuItem = styled('p')(() => ({
  textAlign: 'center',
  fontSize: '1.1rem',
  cursor: 'pointer',
  '&:hover': {
    color: '#8cab78',
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

export default function SwipeableEdgeDrawer(props: Props) {

  const navigate = useNavigate();

  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [schedules, setSchedules] = React.useState<Schedule[]>([]);

  const fetchAllSchedules = async () => {
    const responseOfSchedules = await axios.get('http://localhost:8080/api/allschedule');
    const theSchedules = responseOfSchedules.data;
    setSchedules(theSchedules);
  }

  const printScheduleToMarkdownFile = async (value : string | number) => {
    console.log(value)
    await axios.post(`http://localhost:8080/api/generateMdFile/1`);
  }

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("yoyoy")
    const selectedId = event.target.value;
    const selectedSchedule = schedules.find((schedule) => schedule.id === selectedId);
    if (selectedSchedule) {
      printScheduleToMarkdownFile(selectedSchedule.id);
    } else {
      console.warn('No schedule selected.');
    }
  };

  const menuItems = [
    { label: 'Schema', link: '' },
    { label: 'Min profil', link: '' },
    { label: 'Tidigare KitsCons', link: '' },
    { label: 
      'Exportera Markdownfil',
       link: '',
       dropdownOptions: schedules.map((valueSchedule) => ({
        label: valueSchedule.id,
        value: valueSchedule.id,
       })),
       onClick: () => handleDropdownChange,
      },
  ];

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
                
                <div key={index}>
                <Link
                  key={index}
                  to={menuItem.link}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <MenuItem
                    style={{ textAlign: 'center', fontSize: '1.1rem', margin: '13px 0 13px 0' }}
                  >
                    {menuItem.label}
                  </MenuItem>
                </Link>

                 {menuItem.dropdownOptions && (
                  <select onClick={fetchAllSchedules}>
                    {menuItem.dropdownOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

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
            component="div" style={{padding: '20px 0 20px 0'}}
              cursor='pointer'
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
