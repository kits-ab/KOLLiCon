import { useState, useEffect } from 'react';
import { useFetchFiles } from '@/utils/Hooks/RegisterActivity/useFetchEmployeesFiles';
import { useUser } from '@/utils/Authorization/Auth';
import noImage from '@/assets/no-image.jpg';

export function useUserProfile() {
  const { EmployeesFiles } = useFetchFiles();
  const { email } = useUser();
  // const email = 'patrik.nilsson@kits.se';

  const [profileData, setProfileData] = useState({
    name: 'Okänd användare',
    phoneNumber: '123-456 78 90',
    email: 'example@example.se',
    picture: noImage,
  });

    // Initialize isLoading state to true by default
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isDataFound = false;

    for (let i = 0; i < EmployeesFiles.length; i++) {
      isDataFound = true;
      if (EmployeesFiles[i].email === email) {
        const formattedTitle = EmployeesFiles[i].title.toLowerCase().replace(/\s/g, '');
        setProfileData({
          name: EmployeesFiles[i].title,
          phoneNumber: EmployeesFiles[i].phone.replace(/[-\u2013\u2212]/g, ''),
          email: EmployeesFiles[i].email,
          picture: `https://raw.githubusercontent.com/kits-ab/kits/master/static/assets/medarbetare_${formattedTitle}-avatar.jpg`,
        });
        break;
      }
    }
    setIsLoading(!isDataFound);
  }, [EmployeesFiles]);

  return { profileData, isLoading };
}
