import { ECalloutVariant } from './enums';

export type OnChangeRoomAllocationResult = { adult: number; child: number };

export type RoomAllocationProps = {
  guest: number;
  room: number;
  onChange: (results: OnChangeRoomAllocationResult[]) => void;
};

export type Room = { index: number; adult: string; child: string };
export type CalloutProps = { variant: ECalloutVariant };
