import { useCallback } from 'react';

export function useProfilePictureUrl() {
    //Replaces special characters and spaces in the name with a dash and returns the url
  const replaceSpecialCharacters = useCallback((url: string) => {
    let normalized = url.normalize('NFD');
    let withoutDiacritics = normalized.replace(/[\u0300-\u036f]/g, '');
    return withoutDiacritics.replace(/[\s-]/g, '').toLowerCase();
  }, []);
//Function to get the employees's profile picture via url
  const getProfilePictureUrl = useCallback((name: string) => {
    return `https://raw.githubusercontent.com/kits-ab/kits/master/static/assets/medarbetare_${replaceSpecialCharacters(name)}-avatar.jpg`;
  }, [replaceSpecialCharacters]);

  return getProfilePictureUrl;
}