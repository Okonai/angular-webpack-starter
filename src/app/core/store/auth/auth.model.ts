import { Debug } from '@store/shared/apiresponse.model';

export interface User {
  id?: number;
  access_token?: string;
  last_name?: string;
  first_name?: string;
  email?: string;
  phone?: string;
  is_distributor_admin?: any;
}

export interface AuthForm {
  email: string;
  save?: boolean;
  code?: string;
  password?: string;
  password_again?: string;
  captcha?: string;
  loading?: true;
  error?: boolean;
  page?: string;
}
export interface ForgotForm {
  email?: string;
  code?: string;
  password?: string;
  passwordConfirm?: string;
}
export interface Login {
  form: AuthForm;
  save: boolean;
  attempt: number;
}
export interface Register {
  form: AuthForm;
  attempt: number;
}
export interface AuthResponse {
  status: boolean;
  access_token?: string;
  message?: string;
}
export interface ForgotResponse {
  status: boolean;
  access_token?: string;
  loading?: boolean;
}
export interface LoginResponse {
  status: boolean;
  access_token?: string;
  message?: string;
}
export interface RegisterResponse {
  status: boolean;
  access_token?: string;
  message?: string;
}
export interface AuthStep {
  step: number;
}
export interface UserResponse {
  user: User;
}
export interface IsUserResponse {
  status: boolean;
  picture?: string;
}
export interface LoadResponse {
  id: number;
  access_token: string;
  last_name: string;
  first_name: string;
  email: string;
  is_distributor_admin?: boolean;
}
export interface AuthRegisterDataForm {
  aszf: boolean;
  email: string;
  lastName: string;
  firstName: string;
  password: string;
  passwordConfirm: string;
  subscribe: boolean;

  /*
  * Distributor Name & Distributor Vat Number
  * (Not required)
  */
  phone?: string;
  distVat?: string;
  distName?: string;
}

export interface Popup {
  message: string;
  type: string;
  title: string;
}

export interface RootAuth {
  user?: User;
  login?: Login;
  register?: Register;
  auth_form?: AuthForm;
  auth_response?: AuthResponse;
  login_response?: LoginResponse;
  forgot_response?: ForgotResponse;
  register_response?: RegisterResponse;
  forgot_form?: ForgotForm;
  auth_step?: AuthStep;
  user_response?: UserResponse;
  is_user_response?: IsUserResponse;
  register_form?: AuthRegisterDataForm;
  load_response?: LoadResponse;
  debug?: Debug;
}
