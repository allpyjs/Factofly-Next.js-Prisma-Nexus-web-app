import { User } from '~/server/utils/prismaClient';

const isAdmin = (user: User | null): boolean => user?.role === 'ADMIN';
const isSystem = (machine: { role: string } | null): boolean => machine?.role === 'SYSTEM';
const notSystem = (user: User | null, machine: { role: string } | null): boolean =>
  !!(!machine?.role && user?.role);
const isEmployee = (user: User | null): boolean => user?.role === 'EMPLOYEE' || isAdmin(user);
const isUser = (user: User | null): boolean => user?.role === 'USER' || isEmployee(user);

export default {
  isEmployee,
  isAdmin,
  isUser,
  isSystem,
  notSystem
};
