// frontend/src/components/views/equipamentos/styles.ts

import styled from 'styled-components';

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
  margin-top: -50px;
`;

export const Toolbar = styled.div`
  margin-bottom: 20px;
`;

export const SearchWrap = styled.div`
  max-width: 380px;
`;

export const TypeBadge = styled.span`
  font-size: 0.775rem;
  font-weight: 600;
  color: #5B21B6;
  background: #EDE9FE;
  border: 1px solid #DDD6FE;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  white-space: nowrap;
`;

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
  color: var(--neutral-400);

  &:hover {
    color: ${({ $variant }) => $variant === 'delete' ? '#DC2626' : '#3d00a0'};
    background: ${({ $variant }) => $variant === 'delete' ? '#FEF2F2' : 'rgba(61, 0, 160, 0.08)'};
  }
`;