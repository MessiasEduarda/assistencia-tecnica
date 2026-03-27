import styled, { keyframes } from 'styled-components';

const spin = keyframes`to { transform: rotate(360deg); }`;

const HEADER_H = 44;
const PAG_H    = 56;
const ROW_H    = 50;
const ROWS     = 10;
const BODY_H   = ROW_H * ROWS;

export const Container = styled.div`
  width: 100%;
  border-radius: var(--radius-lg);
  border: 1px solid var(--neutral-100);
  background: var(--neutral-0);
  display: flex;
  flex-direction: column;
  min-height: ${HEADER_H + BODY_H + PAG_H}px;
`;

export const TableWrap = styled.div`
  flex: 1;
  overflow: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

export const Th = styled.th`
  padding: 0 18px;
  height: ${HEADER_H}px;
  font-weight: 600;
  color: var(--neutral-500);
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--neutral-100);
  background: var(--neutral-50);
  white-space: nowrap;
  vertical-align: middle;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const TBody = styled.tbody<{ $clickable: boolean }>`
  tr {
    cursor: ${p => p.$clickable ? 'pointer' : 'default'};
    transition: background 120ms;
  }

  tr:hover td {
    background: ${p => p.$clickable ? 'var(--neutral-50)' : 'transparent'};
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

export const Td = styled.td`
  padding: 0 18px;
  height: ${ROW_H}px;
  font-size: 0.875rem;
  color: var(--neutral-700);
  border-bottom: 1px solid var(--neutral-100);
  vertical-align: middle;
  white-space: normal;
  word-break: break-word;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${BODY_H}px;
  color: var(--neutral-400);
  text-align: center;
  gap: 8px;

  .icon { font-size: 2.2rem; }

  strong {
    font-size: 0.95rem;
    color: var(--neutral-600);
  }

  p { font-size: 0.825rem; }
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${BODY_H}px;
`;

export const LoadingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--neutral-400);
`;

export const Spinner = styled.span`
  width: 18px;
  height: 18px;
  border: 2px solid var(--neutral-200);
  border-top-color: #3d00a0;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  flex-shrink: 0;
`;

// ─── paginação ────────────────────────────────────────────────────────────────

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 20px;
  height: ${PAG_H}px;
  border-top: 1px solid var(--neutral-100);
  flex-shrink: 0;
`;

export const PaginationInfo = styled.span`
  font-size: 0.8rem;
  color: var(--neutral-400);
  font-weight: 400;
  white-space: nowrap;
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $active }) => ($active ? '#3d00a0' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : 'var(--neutral-500)')};

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? '#3d00a0' : 'rgba(61, 0, 160, 0.08)')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#3d00a0')};
  }
`;

export const PageEllipsis = styled.span`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: var(--neutral-300);
  user-select: none;
`;

export const PaginationArrow = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #3d00a0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(61, 0, 160, 0.08);
  }

  &:disabled {
    color: var(--neutral-200);
    cursor: not-allowed;
  }
`;