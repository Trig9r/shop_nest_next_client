import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface InputProps {
  name: string;
  email: string;
  password: string;
}

export interface AuthPageInputProps {
  register: UseFormRegister<InputProps>;
  errors: FieldErrors<InputProps>;
}

export interface SignUpFxProps {
  url: string;
  username: string;
  email: string;
  password: string;
}

export interface SignInFxProps {
  url: string;
  username: string;
  password: string;
}

export interface UserProps {
  username: string;
  userId: number | string;
  email: string;
}
