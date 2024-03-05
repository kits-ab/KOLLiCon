import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const drawerBleeding = 11;

const LogoutChildPart = styled('div')(() => ({
  backgroundColor: '#393939',
  height: '60%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  cursor: 'pointer',
}));

const Root = styled('div')(() => ({
  marginLeft: '88%',
  height: '80px',
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

const stylesForGlobal = styled('div')(() => ({
  '.MuiDrawer-root > .MuiPaper-root': {
    overflow: 'visible',
    backgroundColor: '#262626',
    borderRadius: '20px 20px 0px 0px',
  },
}));

export {
  LogoutChildPart,
  Root,
  MenuDiv,
  menuItems,
  MenuItem,
  FixedMenuIcon,
  drawerBleeding,
  stylesForGlobal,
};
