import { useEffect, useState } from 'react';
import { getUserAccessToken } from '@/utils/Authorization/Auth';

// Temp. Delete later.
const Token = () => {
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    getUserAccessToken().then((token) => setToken(token));
  }, []);

  return <div style={{ wordWrap: 'break-word' }}>{token}</div>;
};

export default Token;
