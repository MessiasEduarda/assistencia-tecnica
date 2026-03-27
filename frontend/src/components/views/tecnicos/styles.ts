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

export const AvatarSmall = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffffff;
  border: 1.5px solid #d1d5db;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0.04em;
`;

export const StatusDot = styled.span<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.$active ? '#10b981' : 'var(--neutral-300)'};
  flex-shrink: 0;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const ActionBtn = styled.button<{ $variant: 'edit' | 'delete' | 'toggle' }>`
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
    color: ${({ $variant }) =>
      $variant === 'delete' ? '#DC2626' :
      $variant === 'toggle' ? '#059669' :
      '#3d00a0'};

    background: ${({ $variant }) =>
      $variant === 'delete' ? '#FEF2F2' :
      $variant === 'toggle' ? '#ECFDF5' :
      'rgba(61, 0, 160, 0.08)'};
  }
`;