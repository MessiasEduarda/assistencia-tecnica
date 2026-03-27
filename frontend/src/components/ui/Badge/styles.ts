import styled from 'styled-components';
type V = 'default'|'success'|'warning'|'danger'|'info'|'purple'|'orange';
const map: Record<V,string> = {
  default: 'background:#EFEDE8;color:#2F2D29;',
  success: 'background:#D1FAE5;color:#065F46;',
  warning: 'background:#FEF3C7;color:#92400E;',
  danger:  'background:#FEE2E2;color:#991B1B;',
  info:    'background:#DBEAFE;color:#1E40AF;',
  purple:  'background:#EDE9FE;color:#5B21B6;',
  orange:  'background:#FED7AA;color:#9A3412;',
};
export const StyledBadge = styled.span<{$variant:V;$dot?:boolean}>`
  display:inline-flex;align-items:center;gap:5px;
  padding:2px 10px;border-radius:var(--radius-full);
  font-size:0.75rem;font-weight:600;white-space:nowrap;
  ${p => map[p.$variant]}
  ${p => p.$dot ? `&::before{content:'';width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0;}` : ''}
`;
