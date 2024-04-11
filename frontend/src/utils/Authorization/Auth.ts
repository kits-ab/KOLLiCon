import { useEffect, useState } from 'react';
import { User, UserManager } from 'oidc-client-ts';
import axios from 'axios';
const backendIP = import.meta.env.VITE_API_URL;

const userManagerConfig = {
  authority: 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_KNn5zQbLW',
  client_id: '2vbat83e7ac8cubv23cbgq6ufe',
  redirect_uri: 'http://localhost:5173/handlelogin',
  response_type: 'code',
  scope: 'openid email profile', // Unnecessary?
  loadUserInfo: true, // Unnecessary?
  automaticSilentRenew: true,
  extraQueryParams: { identity_provider: 'AzureServerlessTest' },

  /*
   * Necessary for correct revoke response:
   * https://github.com/authts/oidc-client-ts/issues/262
   * https://docs.aws.amazon.com/cognito/latest/developerguide/revocation-endpoint.html#revocation-request-parameters-body
   * oidc-client-ts includes a "token_type_hint" in the request parameters when revoking, Cognito returns HTTP 400 if
   * revokeTokenTypes is not set to "refresh_token". Cognito expects the refresh_token at the revoke endpoint, which it
   * will invalidate along with any access tokens derived from it.
   */
  revokeTokensOnSignout: true,
  revokeTokenTypes: ['refresh_token'] as ('refresh_token' | 'access_token')[],
};

const userManager = new UserManager(userManagerConfig);
export const useUser = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    // Fetch the user and check if the user is an admin
    const fetchUser = async () => {
      try {
        // Get the user from the user manager
        const user: User | null = await userManager.getUser();
        if (user) {
          const email = user.profile.email ?? '';
          const name = user.profile.name ?? '';
          setEmail(email);
          setName(name);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    // Check if the user is an admin
    if (email !== '') {
      (async (email: string) => {
        try {
          const response = await axios.get(`${backendIP}/api/admin/email/${email}`);
          setIsAdmin(response.data);
        } catch (error) {
          console.error('Error checking admin email:', error);
          setIsAdmin(false);
        }
      })(email);
    } else {
      setIsAdmin(false);
    }
  }, [email]);

  return { isAdmin, email, name, signOut };
};

export const signinRedirect = () => userManager.signinRedirect();
export const signOut = () =>
  userManager.signoutRedirect({
    // Cognito-specific parameters, necessary because oidc-client-ts default signout params are not recognized by Cognito.
    // https://docs.aws.amazon.com/cognito/latest/developerguide/logout-endpoint.html#get-logout-request-sample
    extraQueryParams: {
      client_id: userManagerConfig.client_id,
      logout_uri: 'http://localhost:5173/login',
    },
  });
export const signinCallback = () => userManager.signinCallback();
export const getUserAccessToken = async () => (await userManager.getUser())?.access_token;
export default userManager;
