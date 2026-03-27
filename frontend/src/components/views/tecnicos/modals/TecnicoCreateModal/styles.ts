import styled from 'styled-components';

// ─── Grid de formulário ───────────────────────────────────────────────────────

export const FormGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.$cols ?? 2}, 1fr);
  gap: 16px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const FormSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

// ─── Títulos de seção ─────────────────────────────────────────────────────────

export const SectionTitle = styled.h4`
  font-size: 0.72rem;
  font-weight: 700;
  color: #000482;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 14px;
  padding-bottom: 6px;
  border-bottom: 2px solid #eef0ff;
  display: flex;
  align-items: center;
  gap: 6px;
`;

// ─── Banner de erro ───────────────────────────────────────────────────────────

export const ErrorBanner = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.875rem;
  margin-bottom: 20px;
  line-height: 1.5;
`;

// ─── Resumo do técnico no topo do edit ───────────────────────────────────────

export const TechInfo = styled.div`
  background: #eef0ff;
  border: 1px solid #c7caff;
  border-left: 3px solid #000482;
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 0.8125rem;
  color: var(--neutral-600);
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  line-height: 1.5;

  strong {
    color: #000482;
    font-weight: 600;
  }
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