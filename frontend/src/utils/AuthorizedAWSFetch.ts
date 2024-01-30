import { type AuthorizedAWSFetch, RequestOptions } from './Types';
import { getUserAccessToken } from './Auth';

const authorizedAWSFetch: AuthorizedAWSFetch = async (path, method = 'get', data, options = {}) => {
  const accessToken = await getUserAccessToken();

  if (!accessToken) {
    throw new Error('Access token is required.');
  }

  try {
    const requestOptions: RequestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      ...(data ? { body: data as string } : {}),
      ...(options as Record<string, any>),
    };

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${path}`, requestOptions);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error(`Status: ${response.status}`);
    }

    try {
      return await response.json();
    } catch (e) {
      try {
        return await response.text();
      } catch (e) {
        return (e as Error).message;
      }
    }
  } catch (e) {
    throw new Error(`Fetch error: ${(e as Error).message}`);
  }
};

export default authorizedAWSFetch;
