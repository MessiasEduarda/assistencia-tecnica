'use client';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

const COLLAPSED_W = 72; // mesma constante do styles.ts

const Wrap = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  /* Margem fixa = largura da sidebar colapsada.
     Nunca muda — a sidebar abre por cima do conteúdo. */
  margin-left: ${COLLAPSED_W}px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding: 28px;
`;

export function AppLayout({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Wrap>
      <Sidebar expanded={expanded} onExpandedChange={setExpanded} />
      <Main>
        <Topbar />
        <Content>{children}</Content>
      </Main>
    </Wrap>
  );
}