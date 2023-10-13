import { Room } from './types';

export const validateRoomsAdultChildValue = (
  rooms: Room[],
  unallocatedCount: number,
): boolean => {
  if (unallocatedCount < 0) return false;

  const positiveIntReg = /^[0-9]+$/;

  return rooms.every((room) => {
    return (
      String(room.adult).match(positiveIntReg) &&
      String(room.child).match(positiveIntReg)
    );
  });
};
