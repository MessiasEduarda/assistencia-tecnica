import styled from 'styled-components';

export const InputWrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #525252;
`;

export const StyledInput = styled.input<{
  $hasError: boolean;
  $hasIconLeft: boolean;
  $hasIconRight: boolean;
}>`
  width: 100%;
  height: 48px;
  padding: 0 ${({ $hasIconRight }) => ($hasIconRight ? '44px' : '18px')} 0
    ${({ $hasIconLeft }) => ($hasIconLeft ? '44px' : '18px')};
  border: 1.5px solid ${({ $hasError }) => ($hasError ? '#ab031d' : '#8b56a3')};
  border-radius: 1000px;
  font-size: 0.92rem;
  background: white;
  color: #2b2b2b;
  transition: all 0.25s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? '#ab031d' : '#8b56a3')};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? 'rgba(171,3,29,0.1)' : 'rgba(84,0,181,0.15)'};
  }

  &::placeholder {
    color: #bbb;
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #2b2b2b !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const HintText = styled.span`
  font-size: 0.78rem;
  color: #999;
  padding-left: 4px;
`;

export const IconLeft = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #5400b5;
  display: flex;
  pointer-events: none;
`;

export const IconRight = styled.div`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #5400b5;
  display: flex;
`;