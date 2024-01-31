import { signinRedirect } from '@/utils/Auth';
import Box from '@mui/material/Box';
// import { styled } from '@mui/material';
// import Button from '@mui/material/Button';

// const TestDiv = styled('div')(({ theme }) => ({
//   color: theme.palette.primary.main,
// }));

// const LoginButton = styled(Button)(({ width }: { width: string }) => ({
//   width: width,
//   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
// }));

const Wrapper = ({ children }: any) => (
  <Box
    sx={{
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // flexDirection: 'column',
      // justifyContent: 'flex-start',
      // alignItems: 'center',
      // backgroundColor: 'black',
    }}
  >
    {children}
  </Box>
);

const Login = () => {
  return (
    <Wrapper>
      <button onClick={() => signinRedirect()}>Sign In</button>
    </Wrapper>
  );
};

// const Login = () => {
//   return (
//     <Box sx={
//       .wrapper {
//         height: 100%;
//         width: 100%;
//         position: relative;
//         display: flex;
//         flex-direction: column;
//         justify-content: flex-start;
//         align-items: center;
//       }

//       .header {
//         width: 100%;
//         height: 3rem;
//         background-color: var(--primary-color);
//         color: #f2f2f2;
//         text-align: center;
//       }

//       .login {
//         width: 29rem;
//         height: 25rem;
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//         border-radius: 0.3125rem;
//         background: var(--darkmode-lighter-bg);
//         box-shadow: 0px 4px 16px 0px rgba(22, 22, 22, 0.25);
//         position: absolute;
//         top: 25%;
//         gap: 2rem;
//       }

//       .kits {
//         width: 13rem;
//         height: 9rem;
//       }

//     }>
//       <button onClick={() => signinRedirect()}>Sign In</button>
//       {/* <LoginButton width={'1000px'} onClick={() => signinRedirect()}>
//         Sign In
//       </LoginButton> */}
//     </Box>
//   );
// };

export default Login;
