import { useState, useEffect } from 'react';
import { useFetchFiles } from '@/utils/Hooks/RegisterActivity/useFetchEmployeesFiles';
import { useUser } from '@/utils/Authorization/Auth';

export function useUserProfile() {
  const { EmployeesFiles } = useFetchFiles();
  const { email } = useUser();
  // const email = 'patrik.nilsson@kits.se';

  const [profileData, setProfileData] = useState({
    name: 'Default name',
    phoneNumber: '1111111111',
    email: 'Default',
    picture: 'img.jpg',
  });

  useEffect(() => {
    for (let i = 0; i < EmployeesFiles.length; i++) {
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
  }, [EmployeesFiles]);

  return profileData;
}
