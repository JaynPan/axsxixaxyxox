import styled from 'styled-components';
import { CalloutProps, CalloutTypeEnum } from './types';

const colorSwitcher = (type: CalloutProps['type']): string => {
  switch (type) {
    case CalloutTypeEnum.info:
      return '#0e566c';
    case CalloutTypeEnum.alert:
      return '#9f3a38';
    case CalloutTypeEnum.success:
      return '#2c662d';
  }
};

const bgColorSwitcher = (type: CalloutProps['type']): string => {
  switch (type) {
    case CalloutTypeEnum.info:
      return '#f8ffff';
    case CalloutTypeEnum.alert:
      return '#fff6f6';
    case CalloutTypeEnum.success:
      return '#fcfff5';
  }
};

const borderColorSwitcher = (type: CalloutProps['type']): string => {
  switch (type) {
    case CalloutTypeEnum.info:
      return '#9ac5d3';
    case CalloutTypeEnum.alert:
      return '#eab2b1';
    case CalloutTypeEnum.success:
      return '#cfdfa9';
  }
};

export const Callout = styled.div<CalloutProps>`
  background-color: ${({ type }) => bgColorSwitcher(type)};
  color: ${({ type }) => colorSwitcher(type)};
  border: 2px solid ${({ type }) => borderColorSwitcher(type)};
  border-radius: 10px;
  padding: 1em 1.5em;
`;

export const Container = styled.div`
  width: 450px;
  padding: 1em;
  border: 3px dashed #eee;
`;
