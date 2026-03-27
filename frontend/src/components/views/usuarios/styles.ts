import styled from 'styled-components';


export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

export const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-weight: 600;
  }
`;

export const Avatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--brand-400);
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmailTd = styled.td`
  color: var(--neutral-500);
`;
