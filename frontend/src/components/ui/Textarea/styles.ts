import styled from 'styled-components';

export const TextareaWrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: ${p => (p.$fullWidth ? '100%' : 'auto')};
`;

export const Label = styled.label`
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--neutral-700);
`;

export const StyledTextarea = styled.textarea<{ $hasError: boolean }>`
  width: 100%;
  min-height: 90px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  border: 1.5px solid ${p => (p.$hasError ? '#EF4444' : 'var(--neutral-200)')};
  background: var(--neutral-0);
  font-size: 0.875rem;
  font-family: var(--font-sans);
  color: var(--neutral-800);
  resize: vertical;
  transition: border-color 150ms, box-shadow 150ms;
  outline: none;
  line-height: 1.5;

  &::placeholder {
    color: var(--neutral-300);
  }

  &:focus {
    border-color: #3d00a0;
    box-shadow: 0 0 0 3px rgba(61, 0, 160, 0.1);
  }

  &:disabled {
    background: var(--neutral-50);
    color: var(--neutral-400);
    cursor: not-allowed;
  }
`;

export const HintText = styled.span`
  font-size: 0.75rem;
  color: var(--neutral-400);
`;