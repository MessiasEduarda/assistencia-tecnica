import styled from 'styled-components';


export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: 12px 16px;
    font-size: 0.875rem;
  }

  th {
    font-weight: 600;
    color: var(--neutral-500);
    font-size: 0.8125rem;
    border-bottom: 1px solid var(--neutral-100);
    background: var(--neutral-50);
  }

  td {
    border-bottom: 1px solid var(--neutral-100);
  }

  tbody tr:hover td {
    background: var(--neutral-50);
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const SkuText = styled.span`
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--neutral-500);
`;

export const MinText = styled.span`
  color: var(--neutral-400);
  font-size: 0.8125rem;
`;

export const StockBar = styled.div<{ $p: number; $low: boolean }>`
  width: 80px;
  height: 6px;
  background: var(--neutral-100);
  border-radius: 3px;
  display: inline-block;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${p => p.$p}%;
    background: ${p => p.$low ? '#EF4444' : '#10B981'};
    border-radius: 3px;
  }
`;
