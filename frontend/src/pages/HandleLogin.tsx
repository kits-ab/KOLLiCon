import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signinCallback } from '@/utils/Auth';
import Spinner from '@/components/Spinner/Spinner';

const HandleLogin = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;

    hasRun.current = true;

    signinCallback()
      .then(() => {
        // Temp path
        navigate('/token', { replace: true });
      })
      .catch(() => {
        // Temp path
        navigate('/error', { state: { error: 'Login failed' }, replace: true });
      });
  }, [navigate]);

  return <Spinner />;
};

export default HandleLogin;
