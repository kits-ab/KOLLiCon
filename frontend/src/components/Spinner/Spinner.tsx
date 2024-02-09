import Box from '@mui/material/Box';

const PositionWrapper = ({ children }: any) => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
};

const SpinnerCore = () => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        position: 'relative',
        width: '80px',
        height: '80px',
        '& div': {
          animation: 'spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
          transformOrigin: '40px 40px',
          '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#fff',
            margin: '-4px 0 0 -4px',
          },
        },
        '& div:nth-child(1)': {
          animationDelay: '-0.036s',
          '&:after': { top: '63px', left: '63px' },
        },
        '& div:nth-child(2)': {
          animationDelay: '-0.072s',
          '&:after': { top: '68px', left: '56px' },
        },
        '& div:nth-child(3)': {
          animationDelay: '-0.108s',
          '&:after': { top: '71px', left: '48px' },
        },
        '& div:nth-child(4)': {
          animationDelay: '-0.144s',
          '&:after': { top: '72px', left: '40px' },
        },
        '& div:nth-child(5)': {
          animationDelay: '-0.18s',
          '&:after': { top: '71px', left: '32px' },
        },
        '& div:nth-child(6)': {
          animationDelay: '-0.216s',
          '&:after': { top: '68px', left: '24px' },
        },
        '& div:nth-child(7)': {
          animationDelay: '-0.252s',
          '&:after': { top: '63px', left: '17px' },
        },
        '& div:nth-child(8)': {
          animationDelay: '-0.288s',
          '&:after': { top: '56px', left: '12px' },
        },
        '@keyframes spinner': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
    >
      {[...Array(8)].map((_, index) => (
        <Box key={index} />
      ))}
    </Box>
  );
};

const Spinner = () => {
  return (
    <PositionWrapper>
      <SpinnerCore />
    </PositionWrapper>
  );
};

export default Spinner;
