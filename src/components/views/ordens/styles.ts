import styled, { keyframes } from 'styled-components';

const spin = keyframes`to { transform: rotate(360deg); }`;

// ─── layout ───────────────────────────────────────────────────────────────────

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
`;

export const Toolbar = styled.div`
  margin-bottom: 20px;
`;

export const SearchWrap = styled.div`
  max-width: 380px;
`;

// ─── tabela ───────────────────────────────────────────────────────────────────

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: 13px 18px;
    font-size: 0.875rem;
  }

  th {
    font-weight: 600;
    color: var(--neutral-500);
    font-size: 0.8rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    border-bottom: 1px solid var(--neutral-100);
    background: var(--neutral-50);
    white-space: nowrap;
  }

  td {
    border-bottom: 1px solid var(--neutral-100);
    color: var(--neutral-700);
  }

  tbody tr { transition: background 120ms; }
  tbody tr:hover td { background: #FFFBF0; }
  tbody tr:last-child td { border-bottom: none; }
`;

export const OSNum = styled.span`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--brand-600);
  background: #FEF3C7;
  border: 1px solid #FDE68A;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  white-space: nowrap;
`;

// ─── estados vazios / loading ─────────────────────────────────────────────────

export const EmptyState = styled.div`
  text-align: center;
  padding: 72px 20px;
  color: var(--neutral-400);

  strong {
    display: block;
    font-size: 1rem;
    color: var(--neutral-600);
    margin-bottom: 6px;
  }

  p { font-size: 0.875rem; margin-top: 4px; }
`;

export const LoadingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 0.9rem;
  color: var(--neutral-400);
`;

export const Spinner = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid var(--neutral-200);
  border-top-color: var(--brand-500);
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  flex-shrink: 0;
`;

// ─── paginação ────────────────────────────────────────────────────────────────

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-top: 1px solid var(--neutral-100);
  font-size: 0.875rem;
  color: var(--neutral-500);
`;

export const PagButtons = styled.div`
  display: flex;
  gap: 8px;
`;

// ─── formulário no modal ──────────────────────────────────────────────────────

export const FormSection = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--neutral-600);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const FormGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols ?? 2}, 1fr);
  gap: 16px;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

// ─── legado (mantidos para não quebrar outros imports) ────────────────────────

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 860px;
`;

export const BackLink = styled.button`
  background: none; border: none; cursor: pointer;
  font-size: 0.875rem; color: var(--neutral-500);
  padding: 0; margin-bottom: 8px;
  font-family: var(--font-sans);
  display: inline-flex; align-items: center; gap: 4px;
  transition: color var(--transition);
  &:hover { color: var(--neutral-800); }
`;