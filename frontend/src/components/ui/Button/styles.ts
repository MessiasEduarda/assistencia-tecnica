import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'login' | 'neutral';
type Size = 'sm' | 'md' | 'lg';

interface StyledProps {
  $variant?: Variant;
  $size?: Size;
  $fullWidth?: boolean;
}

const variants = {
  primary:   css`background:var(--brand-500);color:#fff;border:1.5px solid var(--brand-500);&:hover:not(:disabled){background:var(--brand-600);}`,
  secondary: css`background:var(--neutral-100);color:var(--neutral-800);border:1.5px solid var(--neutral-200);&:hover:not(:disabled){background:var(--neutral-200);}`,
  ghost:     css`background:transparent;color:var(--neutral-700);border:1.5px solid transparent;&:hover:not(:disabled){background:var(--neutral-100);}`,
  danger:    css`background:#DC2626;color:#fff;border:1.5px solid #DC2626;&:hover:not(:disabled){background:#B91C1C;}`,
  outline:   css`background:transparent;color:var(--brand-600);border:1.5px solid var(--brand-400);&:hover:not(:disabled){background:#FEF3C7;}`,
  neutral:   css`
    background: #fff;
    color: var(--neutral-500);
    border: 1.5px solid var(--neutral-300);
    &:hover:not(:disabled) {
      background: var(--neutral-50);
      color: var(--neutral-700);
      border-color: var(--neutral-400);
    }
  `,
  login:     css`
    background: #3d00a0;
    color: #fff;
    border: none;
    border-radius: 1000px;
    &:hover:not(:disabled) {
      background: #3a009a;
      box-shadow: 0 4px 14px rgba(61, 0, 160, 0.18);
    }
  `,
};

const sizes = {
  sm: css`height:32px;padding:0 12px;font-size:0.8125rem;gap:6px;`,
  md: css`height:40px;padding:0 18px;font-size:0.875rem;gap:8px;`,
  lg: css`height:48px;padding:0 24px;font-size:0.9375rem;gap:10px;`,
};

export const StyledButton = styled.button<StyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-weight: 600;
  border-radius: 1000px;
  transition: all 0.18s ease;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
  width: ${p => p.$fullWidth ? '100%' : 'auto'};
  ${p => variants[p.$variant ?? 'primary']}
  ${p => sizes[p.$size ?? 'md']}
  &:disabled { opacity: 0.45; cursor: not-allowed; }
  &:focus-visible { box-shadow: 0 0 0 3px rgba(61, 0, 160, 0.25); }
  svg { flex-shrink: 0; }
`;