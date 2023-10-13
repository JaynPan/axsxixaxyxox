import styled from 'styled-components';

import { ECalloutVariant } from './enums';
import { CalloutProps } from './types';

const colorSwitcher = (variant: ECalloutVariant): string => {
  switch (variant) {
    case ECalloutVariant.INFO:
      return '#0e566c';
    case ECalloutVariant.ALERT:
      return '#9f3a38';
    case ECalloutVariant.SUCCESS:
      return '#2c662d';
  }
};

const bgColorSwitcher = (variant: ECalloutVariant): string => {
  switch (variant) {
    case ECalloutVariant.INFO:
      return '#f8ffff';
    case ECalloutVariant.ALERT:
      return '#fff6f6';
    case ECalloutVariant.SUCCESS:
      return '#fcfff5';
  }
};

const borderColorSwitcher = (type: ECalloutVariant): string => {
  switch (type) {
    case ECalloutVariant.INFO:
      return '#9ac5d3';
    case ECalloutVariant.ALERT:
      return '#eab2b1';
    case ECalloutVariant.SUCCESS:
      return '#cfdfa9';
  }
};

export const Callout = styled.div<CalloutProps>`
  background-color: ${({ variant }) => bgColorSwitcher(variant)};
  color: ${({ variant }) => colorSwitcher(variant)};
  border: 2px solid ${({ variant }) => borderColorSwitcher(variant)};
  border-radius: 10px;
  padding: 1em 1.5em;
`;

export const Container = styled.div`
  width: 450px;
  padding: 1em;
  border: 3px dashed #eee;
`;
