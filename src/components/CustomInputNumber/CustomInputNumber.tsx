import React, {
  FC,
  ChangeEvent,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { filter, fromEvent, map, switchMap, takeUntil, timer } from 'rxjs';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { CustomInputNumberProps } from './types';
import { isValueBiggerThanMax, isValueLessThanMin } from './utils';
import { Button, Input, Container } from './styles';

export const CustomInputNumber: FC<CustomInputNumberProps> = ({
  max,
  min,
  defaultValue = 0,
  name,
  step = 1,
  disabled,
  longPressUpdateFrequencyInMillionSecond = 150,
  onChange,
  onChangeWithOnlyNumber,
}) => {
  const decrementalButtonRef = useRef<HTMLButtonElement>(null);
  const incrementalButtonRef = useRef<HTMLButtonElement>(null);
  const inputNumberRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState<string | number>(defaultValue);
  const currentValueRef = useRef(count);

  const btnDisabledState = useMemo(() => {
    return {
      incrementBtn: (typeof max === 'number' && count >= max) || !!disabled,
      decrementBtn: (typeof min === 'number' && count <= min) || !!disabled,
    };
  }, [max, min, count]);

  const handleInputOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    let currentVal = Number(e.target.value);

    // before executing onBlur callback function, will modify to a valid input value
    if (isNaN(currentVal)) {
      currentVal = min || 0;
    } else if (isValueBiggerThanMax(max, currentVal)) {
      currentVal = max as number;
    } else if (isValueLessThanMin(min, currentVal)) {
      currentVal = min as number;
    }

    setCount(currentVal);
  };

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value);
  };

  const updateCount = (
    _: MouseEvent | KeyboardEvent,
    type: 'increment' | 'decrement',
  ) => {
    const currentVal = Number(currentValueRef.current);

    if (isNaN(currentVal)) return;

    let nextValue =
      type === 'increment' ? currentVal + step : currentVal - step;

    if (isValueLessThanMin(min, currentVal)) {
      nextValue = min as number;
    } else if (isValueBiggerThanMax(max, currentVal)) {
      nextValue = max as number;
    }

    setCount(nextValue);
  };

  useEffect(() => {
    const anyInt = /^[-]?[0-9]+$/;
    if (String(count).match(anyInt) && onChangeWithOnlyNumber) {
      onChangeWithOnlyNumber(count as number);
    }

    if (onChange) onChange(String(count).match(anyInt) ? Number(count) : count);
  }, [count]);

  useEffect(() => {
    currentValueRef.current = count;
  }, [count]);

  const toggleButtonSubscription = useCallback(
    (buttonRef: HTMLButtonElement, type: 'increment' | 'decrement') => {
      return fromEvent<MouseEvent>(buttonRef, 'mousedown')
        .pipe(
          switchMap((e) =>
            timer(0, longPressUpdateFrequencyInMillionSecond).pipe(
              map(() => e),
              takeUntil(fromEvent(buttonRef, 'mouseup')),
            ),
          ),
        )
        .subscribe({
          next: (e) => {
            updateCount(e, type);
          },
        });
    },
    [],
  );

  // Handle increment button event
  useEffect(() => {
    if (!incrementalButtonRef.current) {
      throw new Error('increment button element not found');
    }

    const subscription = toggleButtonSubscription(
      incrementalButtonRef.current,
      'increment',
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [btnDisabledState.incrementBtn]);

  // Handle decrement button event
  useEffect(() => {
    if (!decrementalButtonRef.current) {
      throw new Error('decrement button element not found');
    }

    const subscription = toggleButtonSubscription(
      decrementalButtonRef.current,
      'decrement',
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [btnDisabledState.decrementBtn]);

  // handle input ArrowUp/ArrowDown key event
  useEffect(() => {
    const keySubscription = (keyType: 'ArrowUp' | 'ArrowDown') => {
      if (!inputNumberRef.current) {
        throw new Error('input not found');
      }

      fromEvent<KeyboardEvent>(inputNumberRef.current, 'keydown')
        .pipe(
          filter((e) => {
            return e.key === keyType;
          }),
          switchMap((e) =>
            timer(0, longPressUpdateFrequencyInMillionSecond).pipe(
              map(() => e),
              takeUntil(
                fromEvent<KeyboardEvent>(inputNumberRef.current!, 'keyup').pipe(
                  filter((e) => e.key === keyType),
                ),
              ),
            ),
          ),
        )
        .subscribe({
          next: (e) => {
            updateCount(e, keyType === 'ArrowUp' ? 'increment' : 'decrement');
          },
        });
    };

    keySubscription('ArrowDown');
    keySubscription('ArrowUp');
  }, []);

  return (
    <Container>
      <Button
        name={`${name}_decrement_button`}
        ref={decrementalButtonRef}
        disabled={btnDisabledState.decrementBtn}
      >
        <AiOutlineMinus size={26} />
      </Button>
      <Input
        ref={inputNumberRef}
        value={count}
        name={name}
        onChange={handleInputOnChange}
        onBlur={handleInputOnBlur}
        disabled={disabled}
      />
      <Button
        name={`${name}_increment_button`}
        ref={incrementalButtonRef}
        disabled={btnDisabledState.incrementBtn}
      >
        <AiOutlinePlus size={26} />
      </Button>
    </Container>
  );
};
