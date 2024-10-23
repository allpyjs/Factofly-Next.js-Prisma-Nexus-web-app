import React from 'react';
import { RoleEnum } from '../../.generated/globalTypes';

export interface IUserContext {
  firstName?: string | null;
  /**
   * User last name
   */
  lastName?: string | null;
  /**
   * Users displayable name, using first name, last name or email to create this
   */
  displayName?: string;
  /**
   * User email
   */
  email?: string;
  phoneNumber?: string;
  role?: RoleEnum;
  language?: string;
  referral?: string;
  locale?: string;
  referralLinkCode?: string;
  /**
   * Unique identifier for this type
   */
  id?: any;
  features?: any;
  availableCredits?: number;
  accountSetupComplete?: boolean;
  isUser?: boolean;
  isAdmin?: boolean;
  emailVerified?: boolean;
  isImpersonating?: boolean;
  originalUser?: { id: number; isAdmin: boolean };
  loading: boolean;
  impersonateUser?: (userId: number) => void;
  clearImpersonatedUser?: () => void;
}

export default React.createContext<IUserContext>({ loading: false });
