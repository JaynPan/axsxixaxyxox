import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { clickMultipleTimes } from '../../utils/testUtils';
import { CustomInputNumber } from './CustomInputNumber';

describe('CustomInputNumber component', () => {
  test('renders with default values', () => {
    const { getByRole } = render(
      <CustomInputNumber defaultValue={3} min={3} max={100} />,
    );
    const input = getByRole('spinbutton');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(3);
  });

  it('should increments and decrements on button click', () => {
    const { getByRole, getByTestId } = render(
      <CustomInputNumber defaultValue={0} min={0} max={10} name="test" />,
    );
    const input = getByRole('spinbutton');
    const incrementButton = getByTestId('test:incrementButton');
    const decrementButton = getByTestId('test:decrementButton');

    fireEvent.click(incrementButton);
    expect(input).toHaveValue(1);

    fireEvent.click(incrementButton);
    expect(input).toHaveValue(2);

    fireEvent.click(decrementButton);
    expect(input).toHaveValue(1);

    fireEvent.click(decrementButton);
    expect(input).toHaveValue(0);
  });

  test('input value in the range of minimum and maximum', () => {
    const DEFAULT_VALUE = 1;
    const DEFAULT_MIN = 1;
    const DEFAULT_MAX = 4;

    const { getByRole, getByTestId } = render(
      <CustomInputNumber
        defaultValue={DEFAULT_VALUE}
        min={DEFAULT_MIN}
        max={DEFAULT_MAX}
        name="test"
      />,
    );
    const input = getByRole('spinbutton');
    const incrementButton = getByTestId('test:incrementButton');
    const decrementButton = getByTestId('test:decrementButton');

    clickMultipleTimes(decrementButton, 6);
    expect(input).toHaveValue(DEFAULT_MIN);

    clickMultipleTimes(incrementButton, 6);
    expect(input).toHaveValue(DEFAULT_MAX);

    fireEvent.change(input, { target: { value: -10 } });

    expect(input).toHaveValue(-10);

    fireEvent.blur(input);

    expect(input).toHaveValue(DEFAULT_VALUE);
  });

  it('should increment and decrement value by the specified step', () => {
    const { getByRole, getByTestId } = render(
      <CustomInputNumber
        defaultValue={7}
        min={1}
        max={100}
        step={4}
        name="test"
      />,
    );
    const input = getByRole('spinbutton');
    const incrementButton = getByTestId('test:incrementButton');
    const decrementButton = getByTestId('test:decrementButton');

    fireEvent.click(incrementButton);

    // * if (current value % step !== 0), it will increment to the closest value that is divisible by step + min
    // so in this case, current value is 7, min: 1 -> click increment button -> value become step(4 * 2) + min(1)
    expect(input).toHaveValue(9);

    fireEvent.click(incrementButton);
    expect(input).toHaveValue(13);

    fireEvent.click(decrementButton);
    expect(input).toHaveValue(9);
  });

  it('should not triggers any change when disabled', () => {
    const { getByRole, getByTestId } = render(
      <CustomInputNumber
        defaultValue={3}
        min={0}
        max={100}
        disabled
        name="test"
      />,
    );
    const input = getByRole('spinbutton');
    const incrementButton = getByTestId('test:incrementButton');
    const decrementButton = getByTestId('test:decrementButton');

    expect(decrementButton).toBeDisabled();
    expect(incrementButton).toBeDisabled();
    expect(input).toBeDisabled();
  });

  it('should triggers onChange and onBlur events', () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();
    const { getByRole } = render(
      <CustomInputNumber
        defaultValue={0}
        min={0}
        max={100}
        onChange={handleChange}
        onBlur={handleBlur}
      />,
    );
    const input = getByRole('spinbutton');

    fireEvent.change(input, { target: { value: 5 } });
    expect(input).toHaveValue(5);
    expect(handleChange).toBeCalledTimes(1);

    fireEvent.blur(input);
    expect(input).toHaveValue(5);
    expect(handleBlur).toHaveBeenCalledTimes(1);

    // * onBlur function would also trigger onChange once
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('should resets to default value on invalid input', () => {
    const DEFAULT_VALUE = 3;

    const { getByRole } = render(
      <CustomInputNumber defaultValue={DEFAULT_VALUE} min={0} max={10} />,
    );
    const input = getByRole('spinbutton');

    fireEvent.change(input, { target: { value: 15 } });
    fireEvent.blur(input);
    expect(input).toHaveValue(DEFAULT_VALUE);

    fireEvent.change(input, { target: { value: -1 } });
    fireEvent.blur(input);
    expect(input).toHaveValue(DEFAULT_VALUE);

    fireEvent.change(input, { target: { value: 'hello world' } });
    fireEvent.blur(input);
    expect(input).toHaveValue(DEFAULT_VALUE);
  });
});
