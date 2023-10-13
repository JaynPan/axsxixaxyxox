import { FormEvent } from 'react';

export type CustomInputNumberProps = {
  min: number;
  max: number;
  name: string;

  step?: number;
  defaultValue: number;
  disabled?: boolean;
  onBlur?: (event: FormEvent<HTMLInputElement>) => void;
  onChange?: (event: FormEvent<HTMLInputElement>) => void;
};
