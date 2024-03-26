import React from 'react';
import userManager from '@/utils/Authorization/Auth';

function Testing() {
  const [adminstrator, setAdminstrator] = React.useState(false);

  const adminEmail = ['magnusolsson1994@hotmail.se', 'kalleanka@hotmail.se'];

  const callTesting = () => {
    userManager
      .getUser()
      .then((user) => {
        const currentEmail = user?.profile.email;
        if (currentEmail) {
          if (adminEmail.includes(currentEmail)) {
            setAdminstrator(true);
            console.log(currentEmail);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  };

  const checkStatus = () => {
    console.log(adminstrator);
  };

  return (
    <div>
      {adminstrator && (
        <>
          <p>hELLADA</p>
          <p>hELLADA</p>
          <p>hELLADA</p>
        </>
      )}
      <button onClick={callTesting}>Get mail</button>
      <button onClick={checkStatus}>Check admin status</button>
    </div>
  );
}

export default Testing;
