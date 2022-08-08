import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: 1px solid #eee;
  padding: 1em 0;

  &:last-child {
    border-bottom: none;
  }
`;

export const Title = styled.h3`
  margin: 0;
  margin-bottom: 0.5em;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RowLabel = styled.div`
  p {
    margin: 0;
  }
`;

export const RowLabelTitle = styled.p`
  font-weight: bold;
`;

export const RowLabelDescription = styled.p`
  color: rgb(140, 140, 140);
  font-size: 14px;
  font-weight: normal;
`;
