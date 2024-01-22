import { UserManager } from 'oidc-client-ts';

const userManagerConfig = {
    authority: 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_KNn5zQbLW',
    client_id: '2vbat83e7ac8cubv23cbgq6ufe',
    redirect_uri: 'http://localhost:5173/handlelogin',
    response_type: 'code',
    scope: 'openid email profile', 
    loadUserInfo: true,
    automaticSilentRenew: true,
    extraQueryParams: { identity_provider: 'AzureServerlessTest' }
};

const userManager = new UserManager(userManagerConfig);

export const signIn = () => userManager.signinRedirect();
export const signOut = () => userManager.signoutRedirect();
export const getUser = () => userManager.getUser();
export default userManager;