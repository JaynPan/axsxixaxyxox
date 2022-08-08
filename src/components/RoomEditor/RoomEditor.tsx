import React, { FC } from 'react';

import { CustomInputNumber } from '../CustomInputNumber';
import {
  Row,
  RowLabel,
  RowLabelDescription,
  RowLabelTitle,
  Container,
  Title,
} from './styles';
import { RoomEditorProps } from './types';

export const RoomEditor: FC<RoomEditorProps> = ({
  room,
  disabled,
  onChange,
}) => {
  return (
    <Container>
      <Title>{`房間：${Number(room.adult) + Number(room.child)} 人`}</Title>
      <Row>
        <RowLabel>
          <RowLabelTitle>大人</RowLabelTitle>
          <RowLabelDescription>年齡 20+</RowLabelDescription>
        </RowLabel>
        <CustomInputNumber
          min={1}
          max={4}
          step={1}
          value={room.adult}
          name={`room_${room.index}_adult_input`}
          disabled={disabled}
          onChange={(e) => {
            console.log('onChange', e.target.name, e.target.value);
            onChange({
              ...room,
              adult: e.target.value as number,
            });
          }}
          onBlur={(e) => {
            console.log('onBlur', e.target.name, e.target.value);
            onChange({
              ...room,
              adult: e.target.value as number,
            });
          }}
        />
      </Row>
      <Row>
        <p>小孩</p>
        <CustomInputNumber
          min={0}
          max={4}
          step={1}
          value={room.child}
          name={`room_${room.index}_child_input`}
          disabled={disabled}
          onChange={(e) => {
            console.log('onChange', e.target.name, e.target.value);
            onChange({
              ...room,
              child: e.target.value as number,
            });
          }}
          onBlur={(e) => {
            console.log('onBlur', e.target.name, e.target.value);
            onChange({
              ...room,
              child: e.target.value as number,
            });
          }}
        />
      </Row>
    </Container>
  );
};
