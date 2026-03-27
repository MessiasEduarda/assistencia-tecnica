import styled from 'styled-components';
import { Card } from '@/components/ui/Card';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
`;

export const ReportCard = styled(Card)<{ $border: string }>`
  border-top: 3px solid ${({ $border }) => $border};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const IconBox = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

export const CardInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex: 1;
`;

export const CardTitle = styled.div`
  font-weight: 700;
  font-size: 0.9375rem;
  margin-bottom: 4px;
`;

export const CardDesc = styled.div`
  font-size: 0.8125rem;
  color: var(--neutral-500);
  line-height: 1.5;
`;

export const CardActions = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`;
