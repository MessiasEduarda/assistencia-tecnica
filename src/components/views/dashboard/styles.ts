import styled from 'styled-components';


export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
`;

export const StatCard = styled.div<{ $accent: string }>`
  background: var(--neutral-0);
  border-radius: var(--radius-lg);
  border: 1px solid var(--neutral-100);
  box-shadow: var(--shadow-sm);
  padding: 20px;
  border-top: 3px solid ${p => p.$accent};
  transition: box-shadow var(--transition), transform var(--transition);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
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
  font-size: 2rem;
  font-weight: 700;
  color: var(--neutral-900);
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: var(--neutral-500);
  margin-top: 4px;
`;

export const DashGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const CardHeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0;
  width: 100%;
`;

export const OSTable = styled.table`
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
    color: var(--neutral-700);
  }

  tbody tr {
    cursor: pointer;
    transition: background 150ms;
  }

  tbody tr:hover td {
    background: var(--neutral-50);
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const OSNum = styled.span`
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--brand-600);
`;

export const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AlertBase = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius-md);

  .ico {
    font-size: 1rem;
    flex-shrink: 0;
  }

  strong {
    display: block;
    font-weight: 600;
    margin-bottom: 2px;
    font-size: 0.875rem;
  }

  p {
    font-size: 0.8125rem;
    margin: 0;
  }
`;

export const AlertDanger = styled(AlertBase)`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
`;

export const AlertWarning = styled(AlertBase)`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  color: #92400E;
`;

export const AlertInfo = styled(AlertBase)`
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  color: #1E40AF;
`;

// Necessário para o Next.js não tratar este arquivo como página inválida
export default null;