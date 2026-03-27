import styled from 'styled-components';

export const TopbarWrap = styled.header`
  height: var(--topbar-h);
  background: var(--neutral-0);
  border-bottom: 1px solid var(--neutral-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  gap: 16px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 38px;
  padding: 0 14px;
  background: var(--neutral-50);
  border: 1.5px solid var(--neutral-100);
  border-radius: var(--radius-full);
  width: 320px;
  transition: border-color var(--transition), box-shadow var(--transition);

  &:focus-within {
    border-color: var(--brand-400);
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.12);
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 0.875rem;
    font-family: var(--font-sans);
    color: var(--neutral-800);
    outline: none;

    &::placeholder {
      color: var(--neutral-300);
    }
  }
`;

export const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AvatarBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px 6px 6px;
  border-radius: var(--radius-full);
  transition: background var(--transition);

  &:hover {
    background: var(--neutral-100);
  }
`;

export const AvatarCircle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brand-400), var(--brand-600));
  color: #fff;
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