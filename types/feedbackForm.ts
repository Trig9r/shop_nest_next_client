import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

export interface FeedbackInputsProps {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface FeedbackInputProps {
  register: UseFormRegister<FeedbackInputsProps>;
  errors: Partial<FieldErrorsImpl<FeedbackInputsProps>>;
  darkModeClass: string;
}
