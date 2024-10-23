import { useContext } from 'react';
import UserProvider from './UserContext';

export default function useUser() {
  return useContext(UserProvider);
}
