'use client';
import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import {
  Overlay, ModalBox, ModalHeader, ModalTitle,
  ModalSubtitle, CloseBtn, ModalBody, ModalFooter,
} from './styles';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hideClose?: boolean;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, subtitle, size = 'md', hideClose = false, footer, children }: ModalProps) {
  const handleKey = useCallback((e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); }, [onClose]);

  useEffect(() => {
    if (open) { document.addEventListener('keydown', handleKey); document.body.style.overflow = 'hidden'; }
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [open, handleKey]);

  if (!open || typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose} role="dialog" aria-modal="true">
      <ModalBox $size={size} onClick={e => e.stopPropagation()}>
        {(title || !hideClose) && (
          <ModalHeader>
            <div>
              {title && <ModalTitle>{title}</ModalTitle>}
              {subtitle && <ModalSubtitle>{subtitle}</ModalSubtitle>}
            </div>
            {!hideClose && (
              <CloseBtn onClick={onClose} aria-label="Fechar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </CloseBtn>
            )}
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalBox>
    </Overlay>,
    document.body
  );
}