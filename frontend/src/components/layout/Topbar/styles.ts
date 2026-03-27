import styled from 'styled-components';

export const TopbarWrap = styled.header`
  height: var(--topbar-h);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  box-sizing: border-box;
`;

export const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

export const AvatarBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px 6px 6px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--neutral-200);   /* ← borda para delimitar sem fundo */
  background: transparent;
  cursor: pointer;
  transition: background var(--transition), border-color var(--transition);

  svg { color: var(--neutral-400); }

  &:hover {
    background: var(--neutral-50);
    border-color: var(--neutral-300);
  }
`;

export const AvatarCircle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: transparent;                  /* ← sem fundo laranja */
  border: 1.5px solid var(--neutral-300);
  color: var(--neutral-500);               /* ← iniciais cinza */
  font-size: 0.8125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  span:first-child {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--neutral-800);
    line-height: 1.2;
  }

  span:last-child {
    font-size: 0.75rem;
    color: var(--neutral-400);
    line-height: 1.2;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 100%;                              /* ← mesma largura do RightArea */
  background: #fff;
  border: 1px solid var(--neutral-100);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  min-width: unset;                         /* ← remove o min-width fixo */
  padding: 6px;
  z-index: 100;
`;

export const DropdownItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: var(--font-sans);
  font-weight: 500;
  color: ${p => p.$danger ? '#DC2626' : 'var(--neutral-700)'};
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;

  svg {
    color: ${p => p.$danger ? '#DC2626' : 'var(--neutral-400)'};
    flex-shrink: 0;
  }

  &:hover {
    background: ${p => p.$danger ? '#FEF2F2' : 'var(--neutral-50)'};
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: var(--neutral-100);
  margin: 4px 0;
`;