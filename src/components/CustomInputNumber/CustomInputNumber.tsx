import React, { FC, useEffect, useRef } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { NativeInputNumber, Button, Container } from './styles';
import { CustomInputNumberProps } from './types';

export const CustomInputNumber: FC<CustomInputNumberProps> = ({
  min,
  max,
  step = 1,
  defaultValue,
  name,
  disabledAllInputs,
  disabledIncrementButton,
  disabledDecrementButton,
  disabledInput,
  onChange,
  onBlur,
}) => {
  const nativeInputNumberRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<number | null>(null);

  const bubbleUpOnChangeEvent = () => {
    const event = new Event('input', { bubbles: true });

    nativeInputNumberRef.current?.dispatchEvent(event);
  };

  const handleDecrementButtonClick = () => {
    nativeInputNumberRef.current?.stepDown();
    bubbleUpOnChangeEvent();
  };

  const startDecrementing = () => {
    handleDecrementButtonClick();
    intervalRef.current = window.setInterval(handleDecrementButtonClick, 200);
  };

  const handleIncrementButtonClick = () => {
    nativeInputNumberRef.current?.stepUp();
    bubbleUpOnChangeEvent();
  };

  const startIncrementing = () => {
    handleIncrementButtonClick();
    intervalRef.current = window.setInterval(handleIncrementButtonClick, 200);
  };

  const stopChangingValue = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
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

  useEffect(() => {
    if (
      disabledAllInputs ||
      disabledIncrementButton ||
      disabledDecrementButton
    ) {
      stopChangingValue();
    }
  }, [disabledAllInputs, disabledIncrementButton, disabledDecrementButton]);

  return (
    <Container>
      <Button
        disabled={disabledAllInputs || disabledDecrementButton}
        data-testid={`${name}:decrementButton`}
        onMouseDown={startDecrementing}
        onMouseUp={stopChangingValue}
        onMouseLeave={stopChangingValue}
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
        disabled={disabledAllInputs || disabledInput}
        data-testid={`${name}:input`}
      />

      <Button
        disabled={disabledAllInputs || disabledIncrementButton}
        data-testid={`${name}:incrementButton`}
        onMouseDown={startIncrementing}
        onMouseUp={stopChangingValue}
        onMouseLeave={stopChangingValue}
      >
        <AiOutlinePlus size={26} />
      </Button>
    </Container>
  );
};
