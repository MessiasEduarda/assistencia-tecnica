'use client';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  TopbarWrap, SearchBox, RightArea,
  AvatarBtn, AvatarCircle, UserInfo,
} from './styles';

const ROLE: Record<string, string> = {
  ADMIN:      'Admin',
  ATTENDANT:  'Atendente',
  TECHNICIAN: 'Técnico',
};

export function Topbar() {
  const { user } = useAuth();
  const initials = user?.name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? 'AT';

  return (
    <TopbarWrap>
      <SearchBox>
        <span style={{ color: 'var(--neutral-400)' }}>🔍</span>
        <input placeholder="Buscar OS, clientes, equipamentos…" />
      </SearchBox>
      <RightArea>
        <AvatarBtn>
          <AvatarCircle>{initials}</AvatarCircle>
          <UserInfo>
            <span>{user?.name ?? 'Usuário'}</span>
            <span>{ROLE[user?.role ?? 'ATTENDANT']}</span>
          </UserInfo>
        </AvatarBtn>
      </RightArea>
    </TopbarWrap>
  );
}