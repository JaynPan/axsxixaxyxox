import { fireEvent } from '@testing-library/react';

export const clickMultipleTimes = (element, times) => {
  for (let i = 0; i < times; i++) {
    fireEvent.mouseDown(element);
    fireEvent.mouseUp(element);
  }
};
