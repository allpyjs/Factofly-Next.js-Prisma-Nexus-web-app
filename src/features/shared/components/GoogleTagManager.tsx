import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import clientConfig from '~/clientConfig';
import useUser from '~/contexts/User/useUser';

type GoogleTagManagerProps = {};

export default function GoogleTagManager({
  children
}: React.PropsWithChildren<GoogleTagManagerProps>): JSX.Element {
  const { id, displayName, email, phoneNumber, loading, referral } = useUser();

  useEffect(() => {
    TagManager.initialize({
      gtmId: clientConfig.googleTagManagerId
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      TagManager.dataLayer({
        dataLayer: {
          userId: id,
          userName: displayName,
          userEmail: email,
          userPhone: phoneNumber,
          referral
        }
      });
    }
  }, [loading, id, displayName, email, phoneNumber, referral]);

  return children as JSX.Element;
}
