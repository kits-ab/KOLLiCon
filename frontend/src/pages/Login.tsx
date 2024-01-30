import { signinRedirect } from '@/utils/Auth';

const login = () => {
  return (
    <div>
      <button onClick={() => signinRedirect()}>Sign In</button>
    </div>
  );
};

export default login;
