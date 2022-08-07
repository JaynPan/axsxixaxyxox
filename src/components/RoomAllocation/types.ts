export type OnChangeRoomAllocationResult = { adult: number; child: number };

export type RoomAllocationProps = {
  guest: number;
  room: number;
  onChange: (results: OnChangeRoomAllocationResult[]) => void;
};

export type Room = { index: number; adult: number; child: number };
export enum CalloutTypeEnum {
  alert,
  info,
  success,
}
export type CalloutProps = { type: CalloutTypeEnum };
