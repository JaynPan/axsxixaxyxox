import React, { FC, useEffect, useMemo, useState } from 'react';

import { RoomEditor } from '../RoomEditor';
import { RoomEditorOnChangeArgs } from '../RoomEditor/types';
import { Callout, Container } from './styles';
import { RoomAllocationProps, Room, CalloutTypeEnum } from './types';

export const RoomAllocation: FC<RoomAllocationProps> = ({
  guest,
  room,
  onChange,
}) => {
  const [rooms, setRooms] = useState<Room[]>(
    Array(room)
      .fill(0)
      .map((_, i) => ({ index: i, adult: 1, child: 0 })),
  );

  const handleOnChange = (roomResult: RoomEditorOnChangeArgs) => {
    setRooms((prev) => {
      const { index, child, adult } = roomResult;
      const newState = [...prev];

      newState[index].child = child;
      newState[index].adult = adult;
      return newState;
    });
  };

  // it's allowed to appear NaN or negative number at unallocatedCount
  // cause user is not restricted to type only number in the input
  // however, the input value will be adjusted after onBlur event
  const unallocatedCount = useMemo(() => {
    return rooms.reduce(
      (acc, { adult, child }) => acc - Number(adult) - Number(child),
      guest,
    );
  }, [rooms]);

  const calloutType = useMemo(() => {
    if (unallocatedCount < 0 || unallocatedCount > guest)
      return CalloutTypeEnum.alert;
    if (unallocatedCount === 0) return CalloutTypeEnum.success;
    return CalloutTypeEnum.info;
  }, [unallocatedCount]);

  // handle onChange callback function to parent component
  useEffect(() => {
    if (unallocatedCount < 0) return;

    const positiveIntReg = /^[0-9]+$/;
    const result = [];

    // prevent negative number sending to the callback function
    for (const room of rooms) {
      if (
        !String(room.adult).match(positiveIntReg) ||
        !String(room.child).match(positiveIntReg)
      ) {
        return;
      }

      // since e.target.value always return string type
      // we need to coercion to make sure sending number type
      result.push({ adult: Number(room.adult), child: Number(room.child) });
    }

    onChange(result);
  }, [rooms, unallocatedCount]);

  // check if given a valid props
  useEffect(() => {
    // each room can contain maximum 4 people
    const isGuestOverRoomCapacity = room * 4 < guest;
    const isRoomCountOverGuest = room > guest;
    if (isGuestOverRoomCapacity || isRoomCountOverGuest) {
      throw new Error(
        'guest 人數必定在所有 room 總和可容納人數內且最少等於 room 數量。',
      );
    }
  }, [room, guest]);

  return (
    <Container>
      <h3>{`住客人數: ${guest}人 / ${room}房`}</h3>
      <Callout
        type={calloutType}
      >{`尚未分配人數：${unallocatedCount} 人`}</Callout>
      {rooms.map((data) => {
        return (
          <RoomEditor
            key={data.index}
            room={data}
            disabled={guest === room}
            onChange={handleOnChange}
          />
        );
      })}
    </Container>
  );
};
