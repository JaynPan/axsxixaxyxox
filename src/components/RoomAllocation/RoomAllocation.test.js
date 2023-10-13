import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { RoomAllocation } from './RoomAllocation';
import { clickMultipleTimes } from '../../utils/testUtils';

describe('RoomAllocation component', () => {
  let mockOnChange;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  afterEach(() => {
    mockOnChange.mockClear();
  });

  it('should displays correct guest, room information on screen', () => {
    const mockProps = {
      guest: 5,
      room: 2,
      onChange: mockOnChange,
    };

    const { getByText, getAllByRole } = render(
      <RoomAllocation {...mockProps} />,
    );

    expect(
      getByText(`住客人數: ${mockProps.guest} 人 / ${mockProps.room} 房`),
    ).toBeInTheDocument();

    // * each room default with one adult allocate
    const unallocatedCount = mockProps.guest - mockProps.room;

    expect(
      getByText(`尚未分配人數：${unallocatedCount} 人`),
    ).toBeInTheDocument();

    const buttons = getAllByRole('button');
    const inputs = getAllByRole('spinbutton');

    expect(buttons.length).toBe(8);
    expect(inputs.length).toBe(4);
  });

  test('the number of guests must be within the total capacity of all rooms', () => {
    const mockProps = {
      guest: 13,
      room: 3,
      onChange: mockOnChange,
    };
    const { getByText, queryByRole } = render(
      <RoomAllocation {...mockProps} />,
    );

    expect(
      getByText('客人數超過所有房間可容納，請增加房間數'),
    ).toBeInTheDocument();

    expect(queryByRole('button')).not.toBeInTheDocument();
    expect(queryByRole('input')).not.toBeInTheDocument();
  });

  test('the number of guests is at least equal to the number of rooms.', () => {
    const mockProps = {
      guest: 3,
      room: 10,
      onChange: mockOnChange,
    };
    const { getByText, queryByRole } = render(
      <RoomAllocation {...mockProps} />,
    );

    expect(getByText('房間數多於客人數，請減少房間數')).toBeInTheDocument();

    expect(queryByRole('button')).not.toBeInTheDocument();
    expect(queryByRole('input')).not.toBeInTheDocument();
  });

  it('should disable all input fields when the number of guests is equal to the number of rooms', () => {
    const mockProps = {
      guest: 3,
      room: 3,
      onChange: mockOnChange,
    };
    const { getAllByRole } = render(<RoomAllocation {...mockProps} />);
    const buttons = getAllByRole('button');
    const inputs = getAllByRole('spinbutton');

    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });

    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it('should sends initialize onChange event', () => {
    const mockProps = {
      guest: 10,
      room: 3,
      onChange: mockOnChange,
    };
    render(<RoomAllocation {...mockProps} />);

    const expectedRoomState = [
      { adult: 1, child: 0 },
      { adult: 1, child: 0 },
      { adult: 1, child: 0 },
    ];

    expect(mockOnChange).toHaveBeenNthCalledWith(1, expectedRoomState);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should sends the expected onChange event', () => {
    const mockProps = {
      guest: 10,
      room: 3,
      onChange: mockOnChange,
    };

    const { getByTestId } = render(<RoomAllocation {...mockProps} />);

    // click first room adult increment button
    let roomIdx = 0;
    const firstRoomAdultIncrementButton = getByTestId(
      `room_${roomIdx}_adult:incrementButton`,
    );

    fireEvent.click(firstRoomAdultIncrementButton);

    const expectedRoomState1 = [
      { adult: 2, child: 0 },
      { adult: 1, child: 0 },
      { adult: 1, child: 0 },
    ];

    expect(mockOnChange).toHaveBeenNthCalledWith(
      2, // initialize will also trigger onChange, thus start from 2
      expectedRoomState1,
    );
    expect(mockOnChange).toHaveBeenCalledTimes(2);

    // click third room child increment button
    roomIdx = 2;
    const thirdRoomChildIncrementButton = getByTestId(
      `room_${roomIdx}_child:incrementButton`,
    );

    fireEvent.click(thirdRoomChildIncrementButton);

    const expectedRoomState2 = [
      { adult: 2, child: 0 },
      { adult: 1, child: 0 },
      { adult: 1, child: 1 },
    ];

    expect(mockOnChange).toHaveBeenNthCalledWith(3, expectedRoomState2);
    expect(mockOnChange).toHaveBeenCalledTimes(3);

    // onchange second room adult input value to 4
    roomIdx = 1;
    const secondRoomAdultInput = getByTestId(`room_${roomIdx}_adult:input`);

    fireEvent.change(secondRoomAdultInput, { target: { value: 4 } });

    const expectedRoomState3 = [
      { adult: 2, child: 0 },
      { adult: 4, child: 0 },
      { adult: 1, child: 1 },
    ];

    expect(mockOnChange).toHaveBeenNthCalledWith(4, expectedRoomState3);
    expect(mockOnChange).toHaveBeenCalledTimes(4);
  });

  it('should display correct unallocated count', () => {
    const mockProps = {
      guest: 10,
      room: 3,
      onChange: mockOnChange,
    };

    const { getByTestId, getByText } = render(
      <RoomAllocation {...mockProps} />,
    );
    const initialAllocatedCount = mockProps.guest - mockProps.room;
    const firstRoomAdultIncrementButton = getByTestId(
      'room_0_adult:incrementButton',
    );
    clickMultipleTimes(firstRoomAdultIncrementButton, 3);

    const expectedUnAllocatedCount = initialAllocatedCount - 3;
    const callout = getByText(/尚未分配人數/);
    expect(callout).toHaveTextContent(
      `尚未分配人數：${expectedUnAllocatedCount} 人`,
    );
  });

  it('should not receives onChange event when allocated people exceeds the number of guest', () => {
    const mockProps = {
      guest: 5,
      room: 3,
      onChange: mockOnChange,
    };

    const { getByTestId } = render(<RoomAllocation {...mockProps} />);
    const firstRoomAdultIncrementButton = getByTestId(
      'room_0_adult:incrementButton',
    );
    clickMultipleTimes(firstRoomAdultIncrementButton, 2);

    // Perform the additional click
    fireEvent.click(firstRoomAdultIncrementButton);

    // Ensure that the onChange event has not been triggered for the third click
    // onChange will also trigger in initialize stage, thus 2 + 1
    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });

  it('should not triggers onChange event when typing none number value and should back to default when onBlur', () => {
    const mockProps = {
      guest: 10,
      room: 3,
      onChange: mockOnChange,
    };

    const { getByTestId } = render(<RoomAllocation {...mockProps} />);

    let roomIdx = 0;

    roomIdx = 1;
    const secondRoomAdultInput = getByTestId(`room_${roomIdx}_adult:input`);
    fireEvent.change(secondRoomAdultInput, {
      target: { value: 'hello world' },
    });
    expect(mockOnChange).toHaveBeenCalledTimes(1);

    // onBlur will change invalid value back to default
    fireEvent.blur(secondRoomAdultInput);
    expect(mockOnChange).toHaveBeenCalledTimes(2);

    const expectedRoomState = [
      { adult: 1, child: 0 },
      { adult: 1, child: 0 },
      { adult: 1, child: 0 },
    ];

    expect(mockOnChange).toHaveBeenNthCalledWith(2, expectedRoomState);
  });
});
