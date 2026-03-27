// src/views/os/OSDetailsModal/styles.ts

import styled from 'styled-components';

// ─── Header ──────────────────────────────────────────────────────────────────

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--neutral-100);
  flex-wrap: wrap;
`;

export const OSNumBadge = styled.span`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--brand-600);
  background: #FEF3C7;
  border: 1px solid #FDE68A;
  padding: 4px 12px;
  border-radius: 999px;
`;

// ─── Grid de seções ───────────────────────────────────────────────────────────

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SectionTitle = styled.h4`
  font-size: 0.72rem;
  font-weight: 700;
  color: #000482;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 4px;
  padding-bottom: 6px;
  border-bottom: 2px solid #eef0ff;
`;

// ─── Campos ──────────────────────────────────────────────────────────────────

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FieldLabel = styled.span`
  font-size: 0.72rem;
  color: var(--neutral-400);
  font-weight: 500;
`;

export const FieldValue = styled.span`
  font-size: 0.875rem;
  color: var(--neutral-800);
  font-weight: 500;
  line-height: 1.5;
`;

// ─── Divider ─────────────────────────────────────────────────────────────────

export const Divider = styled.div`
  height: 1px;
  background: var(--neutral-100);
  margin: 18px 0;
`;

// ─── Orçamento ───────────────────────────────────────────────────────────────

export const BudgetBox = styled.div`
  border: 1px solid var(--neutral-100);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const BudgetRow = styled.div<{ $total?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${p => (p.$total ? '0.9375rem' : '0.875rem')};
  font-weight: ${p => (p.$total ? '700' : '400')};
  color: ${p => (p.$total ? '#1f1f1f' : 'var(--neutral-600)')};
  padding: ${p => (p.$total ? '12px 18px' : '10px 18px')};
  background: ${p => (p.$total ? '#d7d2ff' : 'var(--neutral-50)')}; /* Mudança aqui */
  border-top: ${p => (p.$total ? 'none' : '0.5px solid var(--neutral-100)')};

  &:first-child {
    border-top: none;
  }
`;

// ─── Observações / notas inline ───────────────────────────────────────────────

export const ObsBox = styled.div`
  background: var(--neutral-50);
  border-radius: 10px;
  padding: 12px 16px;
  border: 0.5px solid var(--neutral-100);
  border-left: 3px solid #5400b5;
  font-size: 0.85rem;
  color: var(--neutral-600);
  line-height: 1.6;
  white-space: pre-wrap;
`;

// ─── Timeline de status ───────────────────────────────────────────────────────

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 22px;

  &::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 14px;
    bottom: 14px;
    width: 2px;
    background: linear-gradient(to bottom, #000482, #5400b5);
    border-radius: 2px;
  }
`;

export const TimelineItem = styled.div`
  display: flex;
  gap: 14px;
  position: relative;
  padding-bottom: 16px;

  &:last-child {
    padding-bottom: 0;
  }
`;

export const TimelineDot = styled.div`
  position: absolute;
  left: -22px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #5400b5;
  flex-shrink: 0;
  z-index: 1;
`;

export const TimelineContent = styled.div`
  flex: 1;
  background: var(--neutral-50);
  border-radius: 10px;
  padding: 10px 14px;
  border: 0.5px solid var(--neutral-100);
  border-left: 2px solid #5400b5;
`;

export const TimelineLabel = styled.div`
  font-size: 0.8125rem;
  font-weight: 600;
  color: #000482;
  margin-bottom: 2px;
`;

export const TimelineMeta = styled.div`
  font-size: 0.75rem;
  color: var(--neutral-400);
`;

// ─── Loading ─────────────────────────────────────────────────────────────────

export const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--neutral-400);
  font-size: 0.875rem;
  gap: 10px;
`;

export const Spinner = styled.span`
  width: 18px;
  height: 18px;
  border: 2px solid var(--neutral-200);
  border-top-color: var(--brand-600, #3d00a0);
  border-radius: 50%;
  animation: _spin 0.7s linear infinite;

  @keyframes _spin {
    to { transform: rotate(360deg); }
  }
`;