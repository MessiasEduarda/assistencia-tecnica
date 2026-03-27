import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const ErrorText = styled.div<{ $visible: boolean }>`
  height: 16px;
  line-height: 16px;
  color: #ab031d;
  font-size: 0.78rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  animation: ${({ $visible }) => ($visible ? fadeIn : 'none')} 0.25s ease;

  svg { flex-shrink: 0; }
`;