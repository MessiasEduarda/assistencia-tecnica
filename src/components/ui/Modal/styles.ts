import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const SIZE: Record<string, string> = { sm: '420px', md: '580px', lg: '760px', xl: '960px' };

export const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(13, 12, 11, 0.55);
  backdrop-filter: blur(3px);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 20px;
  animation: ${fadeIn} 180ms ease;
`;

export const ModalBox = styled.div<{ $size: string }>`
  background: var(--neutral-0);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  width: 100%; max-width: ${({ $size }) => SIZE[$size] ?? SIZE.md};
  max-height: 90vh; display: flex; flex-direction: column;
  animation: ${slideUp} 220ms ease; overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 24px 28px 0; gap: 12px;
`;

export const ModalTitle = styled.h2`
  font-size: 1.125rem; font-weight: 700; color: var(--neutral-900); line-height: 1.3;
`;

export const ModalSubtitle = styled.p`
  font-size: 0.875rem; color: var(--neutral-400); margin-top: 3px;
`;

export const CloseBtn = styled.button`
  background: none; border: none; cursor: pointer; color: var(--neutral-400);
  padding: 4px; border-radius: var(--radius-sm); display: flex; align-items: center; flex-shrink: 0;
  transition: color var(--transition), background var(--transition);
  &:hover { color: var(--neutral-800); background: var(--neutral-100); }
`;

export const ModalBody = styled.div`
  padding: 20px 28px 24px; overflow-y: auto; flex: 1;
`;

export const ModalFooter = styled.div`
  padding: 16px 28px; border-top: 1px solid var(--neutral-100);
  display: flex; align-items: center; justify-content: flex-end; gap: 10px;
  background: var(--neutral-50);
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
`;