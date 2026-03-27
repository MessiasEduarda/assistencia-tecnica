import styled from 'styled-components';

// ─── layout ───────────────────────────────────────────────────────────────────

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  margin-top: -20px;
`;

export const Toolbar = styled.div`
  margin-bottom: 20px;
`;

export const SearchWrap = styled.div`
  max-width: 380px;
`;

// ─── badge número OS ──────────────────────────────────────────────────────────

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

// ─── coluna de ações ──────────────────────────────────────────────────────────

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const ActionBtn = styled.button<{ $variant: 'details' | 'edit' | 'delete' }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 120ms, color 120ms;

  color: ${({ $variant }) =>
    $variant === 'delete'  ? 'var(--neutral-400)' :
    $variant === 'edit'    ? 'var(--neutral-400)' :
                             'var(--neutral-400)'};

  &:hover {
    color: ${({ $variant }) =>
      $variant === 'delete'  ? '#DC2626' :
      $variant === 'edit'    ? '#3d00a0' :
                               '#3d00a0'};

    background: ${({ $variant }) =>
      $variant === 'delete'  ? '#FEF2F2' :
      $variant === 'edit'    ? 'rgba(61, 0, 160, 0.08)' :
                               'rgba(61, 0, 160, 0.08)'};
  }
`;

// ─── legado ───────────────────────────────────────────────────────────────────

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