import { enumType } from 'nexus';

export type RoleType = 'ADMIN' | 'EMPLOYEE' | 'USER';

export const roles: Record<RoleType, RoleType> = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE',
  USER: 'USER'
};

export const RoleEnum = enumType({
  name: 'RoleEnum',
  members: Object.values(roles),
  description: 'Users assigned role'
});
