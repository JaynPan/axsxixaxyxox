import React, { FC } from 'react';

import { CustomInputNumber } from '../CustomInputNumber';
import { RoomEditorProps } from './types';

export const RoomEditor: FC<RoomEditorProps> = ({
  room,
  disabled,
  onChange,
}) => {
  return (
    <div>
      <h3>{`房間：${Number(room.adult) + Number(room.child)} 人`}</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>大人</p>
        <CustomInputNumber
          min={1}
          max={4}
          step={1}
          value={room.adult}
          name={`room_${room.index}_adult`}
          disabled={disabled}
          onChange={(e) => {
            console.log('onchange', e.target.name, e.target.value);
            onChange({
              ...room,
              adult: e.target.value as number,
            });
          }}
          onBlur={(e) => {
            console.log('onblur', e.target.name, e.target.value);
            onChange({
              ...room,
              adult: e.target.value as number,
            });
          }}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <p>小孩</p>
        <CustomInputNumber
          min={0}
          max={4}
          step={1}
          value={room.child}
          name={`room_${room.index}_child`}
          disabled={disabled}
          onChange={(e) => {
            console.log('onchange', e.target.name, e.target.value);
            onChange({
              ...room,
              child: e.target.value as number,
            });
          }}
          onBlur={(e) => {
            console.log('onblur', e.target.name, e.target.value);
            onChange({
              ...room,
              child: e.target.value as number,
            });
          }}
        />
      </div>
    </div>
  );
};
