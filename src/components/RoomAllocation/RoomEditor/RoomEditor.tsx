import React, { FC } from 'react';

import {
  CustomInputNumber,
  CustomInputNumberProps,
} from '../../CustomInputNumber';
import { EAgeCategory } from '../enums';
import { DEFAULT_ROOM_CAPACITY } from '../constants';

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
  disabledAllInputs,
  disabledIncrementButton,
  onChange,
}) => {
  const handleOnChangeHandler =
    (category: EAgeCategory) => (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;

      onChange({ ...room, [category]: target.value });
    };

  const handleRoomOnBlur: CustomInputNumberProps['onBlur'] = (e) => {
    const target = e.target as HTMLInputElement;

    console.log('RoomEditor:onBlur', target.value, target.name);
  };

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
          max={DEFAULT_ROOM_CAPACITY}
          name={`room_${room.index}_adult`}
          defaultValue={1}
          disabledAllInputs={disabledAllInputs}
          disabledIncrementButton={disabledIncrementButton}
          onChange={handleOnChangeHandler(EAgeCategory.ADULT)}
          onBlur={handleRoomOnBlur}
        />
      </Row>

      <Row>
        <RowLabel>
          <RowLabelTitle>小孩</RowLabelTitle>
        </RowLabel>

        <CustomInputNumber
          min={0}
          max={DEFAULT_ROOM_CAPACITY}
          name={`room_${room.index}_child`}
          defaultValue={0}
          disabledAllInputs={disabledAllInputs}
          disabledIncrementButton={disabledIncrementButton}
          onChange={handleOnChangeHandler(EAgeCategory.CHILD)}
          onBlur={handleRoomOnBlur}
        />
      </Row>
    </Container>
  );
};
