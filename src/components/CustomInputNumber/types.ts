import { FormEvent } from 'react';

export type CustomInputNumberProps = {
  min: number;
  max: number;
  name: string;

  step?: number;
  defaultValue: number;
  disabledAllInputs?: boolean;
  disabledIncrementButton?: boolean;
  disabledDecrementButton?: boolean;
  disabledInput?: boolean;
  onBlur?: (event: FormEvent<HTMLInputElement>) => void;
  onChange?: (event: FormEvent<HTMLInputElement>) => void;
};
