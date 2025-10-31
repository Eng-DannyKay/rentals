import { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";

const selectAuthentication = ({ authentication }: RootState) => authentication;

export const selectToken = createSelector(
  selectAuthentication,
  ({ token }) => token
);
export const selectExpiresAt = createSelector(
  selectAuthentication,
  ({ otpExpiresAt }) => otpExpiresAt
);

export const selectOtpPrefix = createSelector(
  selectAuthentication,
  ({ otpPrefix }) => otpPrefix
);

export const selectUserName = createSelector(
  selectAuthentication,
  ({ user }) => user?.updatedBy
);

export const selectLogoutLoading = createSelector(
  selectAuthentication,
  ({ logoutLoading }) => logoutLoading
);  