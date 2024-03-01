import { UserManager } from 'oidc-client-ts';

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

export const signinRedirect = () => userManager.signinRedirect();
export const signinCallback = () => userManager.signinCallback();
export const signOut = () => userManager.signoutRedirect();
export const getUserAccessToken = async () => (await userManager.getUser())?.access_token;
export default userManager;
