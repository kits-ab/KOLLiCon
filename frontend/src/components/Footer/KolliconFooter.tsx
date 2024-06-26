import React from 'react';
import styled from '@emotion/styled';
import { Footer, types } from '@kokitotsos/react-components';
import { Colors } from '@/styles/Common/colors';

function KolliconFooter() {
  const BottomFooter = styled.div`
    bottom: 0;
    left: 0;
    width: 100%;
    div > address > p > span > a,
    div > address > h4 {
      color: ${Colors.primaryBackground} !important;
    }
    div > address > p > span {
      color: white;
    }

    .footer-image {
      fill: ${Colors.primaryBackground};
    }
  `;

  return (
    <BottomFooter>
      <Footer
        style={{ backgroundColor: `${Colors.primaryBackground2}` }}
        info={{
          city: 'Göteborg',
          email: new types.Email('info@kits.se'),
          name: 'KITS AB',
          phone: new types.PhoneNumber('0708 - 27 74 99'),
          postalCode: new types.PostalCode('411 36'),

          social: {
            facebook: new types.Username('kokitotsos', types.SocialType.Facebook),
            github: new types.Username('kits-ab', types.SocialType.GitHub),
            keybase: new types.Username('kits', types.SocialType.Keybase),
            twitter: new types.Username('kokitotsos', types.SocialType.Twitter),
            linkedin: new types.Username(
              'https://www.linkedin.com/company/kits-ab',
              types.SocialType.LinkedIn,
            ),
          },
          street: 'Kungsportsavenyen 33',
        }}
      />
    </BottomFooter>
  );
}

export default KolliconFooter;
