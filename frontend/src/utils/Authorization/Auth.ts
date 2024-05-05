import { useEffect, useState } from 'react';
import { User, UserManager } from 'oidc-client-ts';
import axios from 'axios';

const backendIP = import.meta.env.VITE_API_URL;
const COGNITO_USER_POOL_ENDPOINT = import.meta.env.VITE_COGNITO_USER_POOL_ENDPOINT;
const COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;

const userManagerConfig = {
  authority:
    COGNITO_USER_POOL_ENDPOINT ?? 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_KNn5zQbLW',
  client_id: COGNITO_CLIENT_ID ?? '2vbat83e7ac8cubv23cbgq6ufe',
  redirect_uri: window.location.origin + '/handlelogin',
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
  // this state used for private routes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // Set loading to true while fetching user
      setLoading(true);
      try {
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
      // Set loading to false after fetching user
      setLoading(false);
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

  return { isAdmin, email, name, signOut, loading };
};

export const signinRedirect = () => userManager.signinRedirect();
export const signOut = () =>
  userManager.signoutRedirect({
    // Cognito-specific parameters, necessary because oidc-client-ts default signout params are not recognized by Cognito.
    // https://docs.aws.amazon.com/cognito/latest/developerguide/logout-endpoint.html#get-logout-request-sample
    extraQueryParams: {
      client_id: userManagerConfig.client_id,
      logout_uri: window.location.origin + '/login',
    },
  });
export const signinCallback = () => userManager.signinCallback();
export const getUserAccessToken = async () => (await userManager.getUser())?.id_token;
export default userManager;
