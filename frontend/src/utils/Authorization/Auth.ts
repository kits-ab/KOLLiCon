import { useEffect, useState } from 'react';
import { User, UserManager } from 'oidc-client-ts';

const userManagerConfig = {
  authority: 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_KNn5zQbLW',
  client_id: '2vbat83e7ac8cubv23cbgq6ufe',
  redirect_uri: 'http://localhost:5173/handlelogin',
  response_type: 'code',
  scope: 'openid email profile',
  loadUserInfo: true,
  automaticSilentRenew: true,
  extraQueryParams: { identity_provider: 'AzureServerlessTest' },
};

const userManager = new UserManager(userManagerConfig);

export const useUser = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const adminEmails = [
        'patrik.nilsson@kits.se',
        'gustav.hjelm@kits.se',
        // 'alireza.h.khan@hotmail.com',
        '',
      ];

      try {
        const user: User | null = await userManager.getUser();
        if (user) {
          const email = user.profile.email ?? '';
          const name = user.profile.name ?? '';
          setEmail(email);
          setName(name);
          if (adminEmails.includes(email)) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);
  return { isAdmin, email, name };
};

export const signinRedirect = () => userManager.signinRedirect();
export const signinCallback = () => userManager.signinCallback();
export const signOut = () => userManager.signoutRedirect();
export const getUserAccessToken = async () => (await userManager.getUser())?.access_token;
export default userManager;
