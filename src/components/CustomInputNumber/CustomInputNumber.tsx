import React, { FC, useRef } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { NativeInputNumber, Button, Container } from './styles';
import { CustomInputNumberProps } from './types';

export const CustomInputNumber: FC<CustomInputNumberProps> = ({
  min,
  max,
  step = 1,
  defaultValue,
  name,
  disabled,
  onChange,
  onBlur,
}) => {
  const nativeInputNumberRef = useRef<HTMLInputElement>(null);

  const bubbleUpOnChangeEvent = () => {
    if (onChange) {
      const event = new Event('input', { bubbles: true });

      nativeInputNumberRef.current?.dispatchEvent(event);
    }
  };

  const handleDecrementButtonClick = () => {
    nativeInputNumberRef.current?.stepDown();
    bubbleUpOnChangeEvent();
  };

  const handleIncrementButtonClick = () => {
    nativeInputNumberRef.current?.stepUp();
    bubbleUpOnChangeEvent();
  };

  const handleOnBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const inputValue = nativeInputNumberRef.current?.value;
    const inValidInputValue = !inputValue;
    const valueOutOfRange =
      Number(inputValue) > max || Number(inputValue) < min;

    // change to default value when input is invalid
    if (
      nativeInputNumberRef.current &&
      (inValidInputValue || valueOutOfRange)
    ) {
      nativeInputNumberRef.current.value = String(defaultValue);
    }

    if (onBlur) onBlur(e);
    if (onChange) onChange(e);
  };

  return (
    <Container>
      <Button
        onClick={handleDecrementButtonClick}
        disabled={disabled}
        data-testid={`${name}:decrementButton`}
      >
        <AiOutlineMinus size={26} />
      </Button>

      <NativeInputNumber
        ref={nativeInputNumberRef}
        type="number"
        inputMode="numeric"
        defaultValue={defaultValue}
        step={step}
        min={min}
        max={max}
        name={name}
        onChange={onChange && onChange}
        onBlur={handleOnBlur}
        disabled={disabled}
        data-testid={`${name}:input`}
      />

      <Button
        onClick={handleIncrementButtonClick}
        disabled={disabled}
        data-testid={`${name}:incrementButton`}
      >
        <AiOutlinePlus size={26} />
      </Button>
    </Container>
  );
};
