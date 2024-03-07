import { useCallback } from 'react';

export function useProfilePictureExists() {
    //Checks if the profile picture exists in the response

  const profilePictureExists = useCallback(async (url: string) => {
    try {
        //Checks if the profile picture exists in the response
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        //Checks if the content type is an image
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.startsWith('image')) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error checking profile picture existence:', error);
      return false;
    }
  }, []);

  return profilePictureExists;
}