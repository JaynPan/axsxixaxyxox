import { validateRoomsAdultChildValue } from './validateRoomsAdultChildValue';

describe('validateRoomsAdultChildValue function', () => {
  it('should return false if unallocatedCount is less than 0', () => {
    const rooms = [
      { adult: 2, child: 1 },
      { adult: 3, child: 2 },
    ];
    const unallocatedCount = -1;

    const result = validateRoomsAdultChildValue(rooms, unallocatedCount);

    expect(result).toBe(false);
  });

  it('should return true if all rooms have positive integer values', () => {
    const rooms = [
      { adult: 2, child: 1 },
      { adult: 3, child: 2 },
    ];
    const unallocatedCount = 2;

    const result = validateRoomsAdultChildValue(rooms, unallocatedCount);

    expect(result).toBe(true);
  });

  it('should return false if any room has non-positive integer values', () => {
    const rooms = [
      { adult: -1, child: 1 },
      { adult: 3, child: 2 },
    ];
    const unallocatedCount = 2;

    const result = validateRoomsAdultChildValue(rooms, unallocatedCount);

    expect(result).toBe(false);
  });

  it('should return false if room has string values', () => {
    const rooms = [
      { adult: 2, child: 'hello' },
      { adult: 3, child: 2 },
    ];
    const unallocatedCount = 2;

    const result = validateRoomsAdultChildValue(rooms, unallocatedCount);

    expect(result).toBe(false);
  });
});
