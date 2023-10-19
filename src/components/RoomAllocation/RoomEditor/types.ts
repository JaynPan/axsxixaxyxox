import { Room } from '../types';

export type RoomEditorProps = {
  room: Room;
  onChange: (args: RoomEditorOnChangeArgs) => void;
  disabledAllInputs?: boolean;
  disabledIncrementButton?: boolean;
};

export type RoomEditorOnChangeArgs = {
  index: number;
  adult: string; // * e.target.value will be number string in <input type="number" />
  child: string;
};
