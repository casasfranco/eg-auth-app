export interface LoginCredentials {
  email: string;
  password: string;
}
export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface User {
  email: string;
  token: string;
  name: string;
}

export interface RegisterResponse {
  data?: User;
  error?: string;
}

export interface LoginResponse {
  data?: User;
  error?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id?: string;
  label?: string;
  error?: string;
  optional?: boolean;
  disabled?: boolean;
  success?: boolean;
  containerClassName?: string;
}

export interface DecodedToken {
  exp: number;
}
