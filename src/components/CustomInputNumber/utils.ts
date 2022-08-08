import { CustomInputNumberProps } from './types';

export const isValueBiggerThanMax = (
  max: CustomInputNumberProps['max'],
  value: number,
): boolean => typeof max === 'number' && value > max;

export const isValueLessThanMin = (
  min: CustomInputNumberProps['min'],
  value: number,
): boolean => typeof min === 'number' && value < min;
