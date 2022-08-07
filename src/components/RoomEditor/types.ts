import { Room } from '../RoomAllocation/types';

export type RoomEditorProps = {
  room: Room;
  onChange: (args: RoomEditorOnChangeArgs) => void;
  disabled?: boolean;
};

export type RoomEditorOnChangeArgs = {
  index: number;
  adult: number;
  child: number;
};
