'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  SidebarWrap, LogoWrap, LogoImg, NavScroll,
  NavLink, NavIcon, NavText, SidebarFooter,
} from './styles';

const IconDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="1" width="7" height="7" rx="1.5"/>
    <rect x="12" y="1" width="7" height="7" rx="1.5"/>
    <rect x="1" y="12" width="7" height="7" rx="1.5"/>
    <rect x="12" y="12" width="7" height="7" rx="1.5"/>
  </svg>
);
const IconOrdens = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="1" width="16" height="18" rx="2"/>
    <line x1="6" y1="7"  x2="14" y2="7"/>
    <line x1="6" y1="11" x2="14" y2="11"/>
    <line x1="6" y1="15" x2="10" y2="15"/>
  </svg>
);
const IconClientes = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="6" r="4"/>
    <path d="M2 19 C2 13 18 13 18 19"/>
  </svg>
);
const IconEquipamentos = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="18" height="12" rx="1.5"/>
    <line x1="10" y1="15" x2="10" y2="19"/>
    <line x1="6"  y1="19" x2="14" y2="19"/>
    <circle cx="10" cy="9" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);
const IconTecnicos = () => (
  <svg width="18" height="18" viewBox="0 0 22 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="6" r="4"/>
    <path d="M1 19 C1 13 17 13 17 19"/>
    <line x1="16" y1="2"  x2="20" y2="0"/>
    <line x1="18" y1="5"  x2="22" y2="5"/>
    <line x1="16" y1="9"  x2="20" y2="11"/>
  </svg>
);
const IconEstoque = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="7" width="18" height="12" rx="1.5"/>
    <path d="M5 7 L5 3 L15 3 L15 7"/>
    <line x1="7" y1="12" x2="13" y2="12"/>
  </svg>
);
const IconFinanceiro = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="8"/>
    <line x1="10" y1="5"  x2="10" y2="7"/>
    <line x1="10" y1="13" x2="10" y2="15"/>
    <path d="M7.5 7.5 Q7.5 6 10 6 Q12.5 6 12.5 8 Q12.5 10 10 10 Q12.5 10 12.5 12 Q12.5 14 10 14 Q7.5 14 7.5 12.5"/>
  </svg>
);
const IconRelatorios = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="1" width="16" height="18" rx="2"/>
    <line x1="6" y1="6"  x2="14" y2="6"/>
    <line x1="6" y1="10" x2="14" y2="10"/>
    <polyline points="6,17 9,13 12,15 16,10"/>
  </svg>
);
const IconUsuarios = () => (
  <svg width="18" height="18" viewBox="0 0 22 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7"  cy="6" r="3.5"/>
    <circle cx="15" cy="6" r="3.5"/>
    <path d="M1  19 C1  14 13 14 13 19"/>
    <path d="M10 19 C10 14 21 14 21 19"/>
  </svg>
);
const IconConfiguracoes = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="3"/>
    <path d="M10 2L10 5 M10 15L10 18 M2 10L5 10 M15 10L18 10 M4.2 4.2L6.4 6.4 M13.6 13.6L15.8 15.8 M15.8 4.2L13.6 6.4 M6.4 13.6L4.2 15.8"/>
  </svg>
);

const NAV = [
  { href: '/dashboard',     icon: <IconDashboard />,    label: 'Dashboard'         },
  { href: '/ordens',        icon: <IconOrdens />,       label: 'Ordens de Servico' },
  { href: '/clientes',      icon: <IconClientes />,     label: 'Clientes'          },
  { href: '/equipamentos',  icon: <IconEquipamentos />, label: 'Equipamentos'      },
  { href: '/tecnicos',      icon: <IconTecnicos />,     label: 'Tecnicos'          },
  { href: '/estoque',       icon: <IconEstoque />,      label: 'Estoque'           },
  { href: '/financeiro',    icon: <IconFinanceiro />,   label: 'Financeiro'        },
  { href: '/relatorios',    icon: <IconRelatorios />,   label: 'Relatorios'        },
  { href: '/usuarios',      icon: <IconUsuarios />,     label: 'Usuarios'          },
  { href: '/configuracoes', icon: <IconConfiguracoes />,label: 'Configuracoes'     },
];

interface SidebarProps {
  expanded: boolean;
  onExpandedChange: (v: boolean) => void;
}

export function Sidebar({ expanded, onExpandedChange }: SidebarProps) {
  const pathname = usePathname();
  const { tenant } = useAuth();

  return (
    <SidebarWrap
      $collapsed={!expanded}
      onMouseEnter={() => onExpandedChange(true)}
      onMouseLeave={() => onExpandedChange(false)}
    >
      <LogoWrap>
        <LogoImg src="/TechPro.png" alt="TechPro" />
      </LogoWrap>

      <NavScroll>
        {NAV.map(item => (
          <NavLink
            key={item.href}
            as={Link}
            href={item.href}
            $active={pathname.startsWith(item.href)}
            title={!expanded ? item.label : undefined}
          >
            <NavIcon>{item.icon}</NavIcon>
            <NavText $collapsed={!expanded}>{item.label}</NavText>
          </NavLink>
        ))}
      </NavScroll>

      <SidebarFooter />
    </SidebarWrap>
  );
}
