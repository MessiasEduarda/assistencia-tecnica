import styled, { keyframes } from 'styled-components';

const dropIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const SelectWrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: ${p => (p.$fullWidth ? '100%' : 'auto')};
  position: relative;
`;

export const Label = styled.label`
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--neutral-700);
`;

export const TriggerBtn = styled.button<{ $hasError: boolean; $open: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 14px 0 18px;
  border-radius: 1000px;
  border: 1.5px solid ${p => (p.$hasError ? '#EF4444' : '#e0e0e0')};
  background: white;
  font-size: 0.92rem;
  font-family: var(--font-sans);
  color: var(--neutral-800);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  transition: border-color 150ms, box-shadow 150ms;
  outline: none;
  text-align: left;
  box-sizing: border-box;

  svg {
    color: var(--neutral-400);
    flex-shrink: 0;
    transition: transform 150ms;
    transform: ${p => (p.$open ? 'rotate(180deg)' : 'rotate(0deg)')};
  }

  &:hover:not(:disabled) {
    border-color: #8b56a3;
  }

  &:focus {
    border-color: ${p => (p.$hasError ? '#EF4444' : '#8b56a3')};
    box-shadow: 0 0 0 3px
      ${p => (p.$hasError ? 'rgba(239,68,68,0.12)' : 'rgba(84,0,181,0.15)')};
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const Placeholder = styled.span`
  color: #bbb;
`;

export const OptionsList = styled.div`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid var(--neutral-100);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 6px;
  z-index: 200;
  max-height: 220px;
  overflow-y: auto;
  animation: ${dropIn} 0.18s ease;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }
`;

export const OptionItem = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: ${p => (p.$active ? 'var(--neutral-50)' : 'transparent')};
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: var(--font-sans);
  font-weight: ${p => (p.$active ? '600' : '500')};
  color: ${p => (p.$active ? '#3d00a0' : 'var(--neutral-700)')};
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
  box-sizing: border-box;

  &:hover {
    background: var(--neutral-50);
  }
`;

export const HintText = styled.span`
  font-size: 0.75rem;
  color: var(--neutral-400);
`;

export const ErrorText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-left: 3px solid #EF4444;
  border-radius: 4px;
  color: #EF4444;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 2px;
  animation: ${fadeInDown} 0.3s ease;

  svg { flex-shrink: 0; }
`;