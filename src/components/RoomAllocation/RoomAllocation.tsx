import React, { FC, useEffect, useMemo, useState } from 'react';
import { produce } from 'immer';

import { RoomEditor } from './RoomEditor';
import { RoomEditorOnChangeArgs } from './RoomEditor/types';
import { Callout, Container } from './styles';
import { RoomAllocationProps, Room } from './types';
import { ECalloutVariant } from './enums';
import { DEFAULT_ROOM_CAPACITY } from './constants';
import { validateRoomsAdultChildValue } from './validateRoomsAdultChildValue';
import { initializeRooms } from './utils';

export const RoomAllocation: FC<RoomAllocationProps> = ({
  guest,
  room,
  onChange,
}) => {
  const [rooms, setRooms] = useState<Room[]>(initializeRooms(room));

  const unallocatedCount = useMemo(() => {
    return rooms.reduce(
      (acc, { adult, child }) => acc - Number(adult) - Number(child),
      guest,
    );
  }, [rooms]);

  const calloutVariant = useMemo(() => {
    if (unallocatedCount < 0 || unallocatedCount > guest) {
      return ECalloutVariant.ALERT;
    }

    if (unallocatedCount === 0) {
      return ECalloutVariant.SUCCESS;
    }

    return ECalloutVariant.INFO;
  }, [unallocatedCount]);

  const invalidPropsString = useMemo(() => {
    const isGuestOverRoomCapacity = room * DEFAULT_ROOM_CAPACITY < guest;
    const isRoomCountOverGuest = room > guest;

    if (isGuestOverRoomCapacity) {
      return '客人數超過所有房間可容納，請增加房間數';
    }

    if (isRoomCountOverGuest) {
      return '房間數多於客人數，請減少房間數';
    }

    return '';
  }, [room, guest]);

  const handleOnChange = (roomResult: RoomEditorOnChangeArgs) => {
    setRooms((prev) =>
      produce(prev, (draft) => {
        const { index, child, adult } = roomResult;

        draft[index].child = child;
        draft[index].adult = adult;
      }),
    );
  };

  // send filtered onChange event function to parent component
  useEffect(() => {
    if (!validateRoomsAdultChildValue(rooms, unallocatedCount)) return;

    onChange(
      rooms.map(({ adult, child }) => ({
        adult: Number(adult),
        child: Number(child),
      })),
    );
  }, [rooms, unallocatedCount]);

  return (
    <Container>
      {invalidPropsString.length > 0 ? (
        <h3>{invalidPropsString}</h3>
      ) : (
        <>
          <h3>{`住客人數: ${guest} 人 / ${room} 房`}</h3>

          <Callout variant={calloutVariant}>
            {`尚未分配人數：${unallocatedCount} 人`}
          </Callout>

          {rooms.map((data) => {
            return (
              <RoomEditor
                key={data.index}
                room={data}
                disabledAllInputs={guest === room}
                disabledIncrementButton={
                  Number(data.adult) + Number(data.child) >= 4
                }
                onChange={handleOnChange}
              />
            );
          })}
        </>
      )}
    </Container>
  );
};
