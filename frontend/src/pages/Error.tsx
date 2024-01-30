import { useLocation } from 'react-router-dom';

const Error = () => {
  const location = useLocation();
  const error = location?.state?.error;

  return <div>{error ?? 'Error'}</div>;
};

export default Error;
