import React from 'react';
import { StyledBadge } from './styles';
type V = 'default'|'success'|'warning'|'danger'|'info'|'purple'|'orange';
interface Props { children: React.ReactNode; variant?: V; dot?: boolean; }
export function Badge({ children, variant = 'default', dot = false }: Props) {
  return <StyledBadge $variant={variant} $dot={dot}>{children}</StyledBadge>;
}
