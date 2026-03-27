import styled from 'styled-components';


export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

export const StatCard = styled.div<{ $accent: string }>`
  background: var(--neutral-0);
  border-radius: var(--radius-lg);
  border: 1px solid var(--neutral-100);
  box-shadow: var(--shadow-sm);
  padding: 20px;
  border-top: 3px solid ${p => p.$accent};
`;

export const StatIcon = styled.div<{ $bg: string }>`
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  background: ${p => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 14px;
`;

export const StatValue = styled.div`
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--neutral-900);
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: var(--neutral-500);
  margin-top: 4px;
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CardHeaderInner = styled.div`
  padding: 20px 20px 0;
  width: 100%;
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

export const AmountPositive = styled.td`
  font-weight: 700;
  color: #059669;
`;

export const AmountNegative = styled.td`
  font-weight: 700;
  color: #DC2626;
`;

export const MutedTd = styled.td`
  color: var(--neutral-500);
  font-size: 0.8125rem;
`;
