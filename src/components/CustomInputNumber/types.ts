export type CustomEvent = {
  target: {
    value: string | number;
    name: string;
  };
};

export type CustomInputNumberProps = {
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  // !此部分與測驗內容要求型別不相同，主要原因是使用者可以任意在 input 任意輸入，在 onChange callback 時無法保證回傳值必定為 number
  value: number | string;
  longPressUpdateFrequencyInMillionSecond?: number;
  disabled?: boolean;
  onChange: (event: CustomEvent) => void;
  onBlur: (event: CustomEvent) => void;
};
