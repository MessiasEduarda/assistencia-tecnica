import styled from 'styled-components';


export const Layout = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SideNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NavItem = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  background: ${p => p.$active ? 'var(--neutral-100)' : 'transparent'};
  color: ${p => p.$active ? 'var(--neutral-900)' : 'var(--neutral-500)'};
  transition: all 150ms;

  &:hover {
    background: var(--neutral-100);
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
`;

export const SectionCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Toggle = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--neutral-100);
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

export const ToggleInfo = styled.div``;

export const ToggleTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--neutral-800);
`;

export const ToggleDesc = styled.div`
  font-size: 0.8125rem;
  color: var(--neutral-400);
  margin-top: 2px;
`;

export const Switch = styled.div<{ $on: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: ${p => p.$on ? 'var(--brand-500)' : 'var(--neutral-200)'};
  position: relative;
  transition: background 200ms;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${p => p.$on ? '22px' : '2px'};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    transition: left 200ms;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }
`;
