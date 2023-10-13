import { DEFAULT_ADULT_COUNT, DEFAULT_CHILDREN_COUNT } from './constants';
import { Room } from './types';

export const initializeRooms = (room: number): Room[] => {
  return Array(room)
    .fill(0)
    .map((_, index) => ({
      index,
      adult: String(DEFAULT_ADULT_COUNT),
      child: String(DEFAULT_CHILDREN_COUNT),
    }));
};
