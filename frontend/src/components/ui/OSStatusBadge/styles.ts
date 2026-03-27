import styled from 'styled-components';
export const StyledOSBadge = styled.span<{ $bg: string; $color: string; $border: string }>`
  display:inline-flex;align-items:center;gap:5px;
  padding:3px 10px;border-radius:var(--radius-full);
  font-size:0.75rem;font-weight:600;white-space:nowrap;
  background:${p => p.$bg};color:${p => p.$color};border:1px solid ${p => p.$border};
  &::before{content:'';width:5px;height:5px;border-radius:50%;background:currentColor;flex-shrink:0;}
`;
