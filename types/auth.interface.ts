import { Status } from "./shared.enum";

export interface ISignIn {
  phoneNumber: string;
}

export interface ISignUp {
  phoneNumber: string;
  name: string;
  email: string | null;
  nationalId: string | null;
}

export interface User {
  phoneNumber: string;
  id: string;
  role: Role;
  email: string | null;
  createdBy: string;
  updatedBy: string;
  nationalId: null;
  status: Status;
  authenticated: boolean;
}


export type Otp = {
  prefix: string;
  code: string;
};

export interface TokenValidity {
  token: string;
  otpPrefix: string;
  otpExpiresAt: string;
}


export interface ISignUpResponse  extends TokenValidity{
    phoneNumber: string;
}

export enum Role {
 User ='User'
}




export interface IVerifyResponse  {
    user: User,
    token: string
}