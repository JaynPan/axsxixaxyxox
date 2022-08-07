import React, { FC, ChangeEvent, useEffect, useRef } from 'react';
import { filter, fromEvent, switchMap, takeUntil, timer } from 'rxjs';

import { CustomInputNumberProps, CustomEvent } from './types';

export const CustomInputNumber: FC<CustomInputNumberProps> = ({
  max,
  min,
  value,
  name,
  step = 1,
  disabled,
  longPressUpdateFrequencyInMillionSecond = 150,
  onChange,
  onBlur,
}) => {
  const decrementalButtonRef = useRef<HTMLButtonElement>(null);
  const incrementalButtonRef = useRef<HTMLButtonElement>(null);
  const inputNumberRef = useRef<HTMLInputElement>(null);
  const currentValueRef = useRef(value);

  const handleInputOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const event: CustomEvent = { ...e };
    const currentVal = Number(e.target.value);

    // before executing onBlur callback function, will validate the input value
    if (isNaN(currentVal)) {
      event.target.value = min || 0;
    } else if (typeof max === 'number' && currentVal > max) {
      event.target.value = max;
    } else if (typeof min === 'number' && currentVal < min) {
      event.target.value = min;
    }

    onBlur(event);
  };

  // TODO: modify step behavioral
  const updateCount = (type: 'increment' | 'decrement') => {
    const currentVal = Number(currentValueRef.current);

    if (isNaN(currentVal)) return;

    const nextValue =
      type === 'increment' ? currentVal + step : currentVal - step;

    if (
      (typeof min === 'number' && nextValue < min) ||
      (typeof max === 'number' && nextValue > max)
    )
      return;

    const Event: CustomEvent = {
      target: {
        name: `${type}_btn`,
        value: nextValue,
      },
    };

    onChange(Event);
  };

  useEffect(() => {
    currentValueRef.current = value;
  }, [value]);

  // Handle increment/decrement button event
  useEffect(() => {
    if (!decrementalButtonRef.current || !incrementalButtonRef.current) {
      throw new Error('button element not found');
    }

    const toggleButtonSubscription = (
      buttonRef: HTMLButtonElement,
      type: 'increment' | 'decrement',
    ) => {
      return fromEvent(buttonRef, 'mousedown')
        .pipe(
          switchMap(() =>
            timer(0, longPressUpdateFrequencyInMillionSecond).pipe(
              takeUntil(fromEvent(buttonRef, 'mouseup')),
            ),
          ),
        )
        .subscribe({
          next: () => updateCount(type),
        });
    };

    toggleButtonSubscription(decrementalButtonRef.current, 'decrement');
    toggleButtonSubscription(incrementalButtonRef.current, 'increment');
  }, []);

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
          switchMap(() =>
            timer(0, longPressUpdateFrequencyInMillionSecond).pipe(
              takeUntil(
                fromEvent<KeyboardEvent>(inputNumberRef.current!, 'keyup').pipe(
                  filter((e) => e.key === keyType),
                ),
              ),
            ),
          ),
        )
        .subscribe({
          next: () =>
            updateCount(keyType === 'ArrowUp' ? 'increment' : 'decrement'),
        });
    };

    keySubscription('ArrowDown');
    keySubscription('ArrowUp');
  }, []);

  return (
    <div>
      <button
        name="decrement-button"
        ref={decrementalButtonRef}
        disabled={disabled}
      >
        -
      </button>
      <input
        ref={inputNumberRef}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={handleInputOnBlur}
        disabled={disabled}
      />
      <button ref={incrementalButtonRef} disabled={disabled}>
        +
      </button>
    </div>
  );
};