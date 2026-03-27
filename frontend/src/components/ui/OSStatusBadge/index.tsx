import React from 'react';
import { OSStatus, OS_STATUS_LABEL, OS_STATUS_COLOR } from '@/types';
import { StyledOSBadge } from './styles';
export function OSStatusBadge({ status }: { status: OSStatus }) {
  const c = OS_STATUS_COLOR[status];
  return (
    <StyledOSBadge $bg={c.bg} $color={c.text} $border={c.border}>
      {OS_STATUS_LABEL[status]}
    </StyledOSBadge>
  );
}
