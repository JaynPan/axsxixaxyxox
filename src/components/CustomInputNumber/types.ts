export type CustomInputNumberProps = {
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  defaultValue?: number;
  longPressUpdateFrequencyInMillionSecond?: number;
  disabled?: boolean;
  onChangeWithOnlyNumber?: (count: number) => void;
  onChange?: (count: number | string) => void;
};
