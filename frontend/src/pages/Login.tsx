import { signinRedirect } from '@/utils/Authorization/Auth';
import Box from '@mui/material/Box';
import { Logotype } from '@kokitotsos/react-components';
import Button from '@/styles/Common/Button/Button';
import { Colors } from '@/styles/Common/colors';

const Wrapper = ({ children }: any) => (
  <Box
    sx={{
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {children}
  </Box>
);

const Header = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '3rem',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1px solid #878686',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '1rem',
          top: '0.3rem',
          margin: '0.5rem',
          backgroundColor: `${Colors.primaryBackground}`,
          width: '6rem',
        }}
      >
        <Logotype color='white' height={50} />
      </Box>
    </Box>
  );
};

const LoginWrapper = ({ children }: any) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: { xs: '19.5rem', sm: '29rem' },
      height: { xs: '18.5rem', sm: '25rem' },
      position: 'absolute',
      top: { xs: '28%', sm: '25%' },
      gap: '2rem',
      backgroundColor: '#343434',
      borderRadius: '0.3125rem',
      boxShadow: '0px 4px 16px 0px rgba(22, 22, 22, 0.25)',
    }}
  >
    {children}
  </Box>
);

const LoginButton = () => (
  <Button
    sx={{ width: '13rem', height: '3rem' }}
    variant='contained'
    onClick={() => signinRedirect()}
  >
    Logga in med Office 365
  </Button>
);

const Login = () => {
  return (
    <Wrapper>
      <Header />
      <LoginWrapper>
        <Logotype color='white' />
        <LoginButton />
      </LoginWrapper>
    </Wrapper>
  );
};

export default Login;
