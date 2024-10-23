import apiConfig from '~/apiConfig';
import stringify from '~/utils/stringify';
import { User } from './prismaClient';

export default async function sendNewUserNotification(user: User) {
  if (apiConfig.features.zapNotifications) {
    await fetch(`https://hooks.zapier.com/hooks/catch/6631159/b4ct6er/`, {
      method: 'POST',
      body: stringify({
        event: 'new_user',
        id: user.id,
        email: user.email,
        referral: user.referral,
        displayName: user.firstName ? `${user.firstName} ${user.lastName}` : user.email.split('@')[0],
        link: `${apiConfig.baseUrl}/admin/users/${user.id}`
      })
    });
  }
}
