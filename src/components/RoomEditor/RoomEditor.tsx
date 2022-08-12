import React, { FC, useState } from 'react';

import { CustomInputNumber } from '../CustomInputNumber';
import { Callout } from '../RoomAllocation/styles';
import { CalloutTypeEnum } from '../RoomAllocation/types';
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
  const [hasInvalidInput, setHasInvalidInput] = useState(false);

  const handleOnChangeWithOnlyNumber =
    (type: 'adult' | 'child') => (count: number) => {
      onChange({ ...room, [type]: count });
    };

  const handleOnChange = (count: string | number) => {
    setHasInvalidInput(typeof count === 'string');
  };

  return (
    <Container>
      <Title>{`房間：${Number(room.adult) + Number(room.child)} 人`}</Title>
      {hasInvalidInput && (
        <Callout type={CalloutTypeEnum.alert}>欄位必須為數字</Callout>
      )}
      <Row>
        <RowLabel>
          <RowLabelTitle>大人</RowLabelTitle>
          <RowLabelDescription>年齡 20+</RowLabelDescription>
        </RowLabel>
        <CustomInputNumber
          min={1}
          max={4}
          step={1}
          defaultValue={room.adult}
          name={`room_${room.index}_adult_input`}
          disabled={disabled}
          onChange={handleOnChange}
          onChangeWithOnlyNumber={handleOnChangeWithOnlyNumber('adult')}
        />
      </Row>
      <Row>
        <p>小孩</p>
        <CustomInputNumber
          min={0}
          max={4}
          step={1}
          defaultValue={room.child}
          name={`room_${room.index}_child_input`}
          disabled={disabled}
          onChange={handleOnChange}
          onChangeWithOnlyNumber={handleOnChangeWithOnlyNumber('child')}
        />
      </Row>
    </Container>
  );
};
