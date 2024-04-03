import React, { useEffect } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useFetchFiles } from '@/utils/Hooks/RegisterActivity/useFetchEmployeesFiles';
import { Logotype, Contact, Avatar, types, Image } from '@kokitotsos/react-components';

import { useUser } from '@/utils/Authorization/Auth';

import { useProfilePictureUrl } from '@/utils/Helpers/RegisterActivity/GetProfilePicture';

function UserProfile(props: any) {
  const { setDisplayUserProfile } = props;
  const [open, setOpen] = React.useState(false);
  const { EmployeesFiles } = useFetchFiles(); // Calling useFetchFiles function to get EmployeesFiles
  const { email, name, signOut } = useUser();
  const randomName = 'philip.lu@kits.se';
  const [profileName, setProfileName] = React.useState<string>('Default name');
  const [profilePhoneNumber, setProfilePhoneNumber] = React.useState<string>('1111111111');
  const [profileEmail, setProfileEmail] = React.useState<string>('Default');
  const [profilePicture, setProfilePicture] = React.useState<string>('img.jpg');

  const { replaceSpecialCharacters, getProfilePictureUrl } = useProfilePictureUrl();

  const closeUserProfile = () => {
    setDisplayUserProfile(false);
  };

  const show = () => {
    console.log('Login data');
    console.log(email, name);

    console.log('Fetched data from EmployeesFiles');
    console.log(profileName);
    console.log(profileEmail);
    console.log(profilePhoneNumber);
    console.log(profilePicture);
  };

  React.useEffect(() => {
    setOpen(true);
    for (let i = 0; i < EmployeesFiles.length; i++) {
      if (EmployeesFiles[i].email === randomName) {
        setProfileName(EmployeesFiles[i].title);
        setProfilePhoneNumber(EmployeesFiles[i].phone.replace(/[-\u2013\u2212]/g, ''));
        setProfileEmail(EmployeesFiles[i].email);
        setProfilePicture(getProfilePictureUrl(replaceSpecialCharacters(profileName)));
      }
    }
  }, [EmployeesFiles]);

  return (
    <>
      <SwipeableDrawer
        PaperProps={{
          sx: {
            width: '100%',
            height: '100%',
            padding: '20px',
          },
        }}
        anchor={'right'}
        open={open}
        onClose={closeUserProfile}
        onOpen={closeUserProfile}
        variant='temporary'
        sx={{ width: '100%' }}
      >
        <button onClick={closeUserProfile}>close</button>
        <div
          style={{
            backgroundColor: 'green',
            width: '100%',
            height: '170px',
            position: 'absolute',
            top: 60,
            left: -1,
          }}
        ></div>
        <Image
          href='#'
          src={profilePicture}
          style={{ marginTop: '50px', marginLeft: '20px', height: '200px', width: '150px' }}
        />
        <div style={{ marginTop: '30px' }}>
          <div style={{ marginLeft: '20px', color: '#E3E3E3', fontSize: '30px' }}>
            {profileName}
          </div>
          <div style={{ marginLeft: '20px', color: '#6F6F70', fontSize: '20px' }}>
            {profileEmail}
          </div>
          <Contact
            style={{ marginLeft: '20px', color: '#6F6F70' }}
            info={{
              phone: new types.PhoneNumber(profilePhoneNumber),
            }}
            type={0}
          />
        </div>
        <button
          onClick={() => {
            signOut();
          }}
        >
          Ut me mig
        </button>
        <button onClick={() => show()}>what the fuck</button>
      </SwipeableDrawer>
    </>
  );
}

export default UserProfile;
