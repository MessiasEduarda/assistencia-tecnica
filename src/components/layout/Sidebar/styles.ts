import styled from 'styled-components';

export const COLLAPSED_W = 72;
export const EXPANDED_W  = 200;

const ICON_W    = 20;
const ICON_LEFT = (COLLAPSED_W - ICON_W) / 2; // 26px

const FIXED_H = 510;

export const SidebarWrap = styled.aside<{ $collapsed: boolean }>`
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: ${FIXED_H}px;
  width: ${p => p.$collapsed ? `${COLLAPSED_W}px` : `${EXPANDED_W}px`};
  background: #ffffff;
  display: flex;
  flex-direction: column;
  z-index: 100;
  overflow: hidden;
  border-radius: 0 40px 40px 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.10);
  transition: width 280ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 8px 20px ${ICON_LEFT - 3}px;
  flex-shrink: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 1px;
    background: rgba(0, 0, 0, 0.07);
  }
`;

export const LogoImg = styled.img`
  width: ${ICON_W + 45}px;
  height: ${ICON_W + 45}px;
  margin-left: -19px;
  
  object-fit: contain;
  flex-shrink: 0;
`;

export const NavScroll = styled.nav`
  flex: 1;
  padding: 8px 0 8px 0;
  overflow: hidden;
`;

export const SectionLabel = styled.div<{ $collapsed: boolean }>`
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.35);
  white-space: nowrap;
  overflow: hidden;
  padding-left: ${ICON_LEFT + 4 + ICON_W + 10}px;

  opacity:       ${p => p.$collapsed ? 0 : 1};
  max-height:    ${p => p.$collapsed ? '0px' : '28px'};
  margin-top:    ${p => p.$collapsed ? '0px' : '4px'};
  margin-bottom: ${p => p.$collapsed ? '0px' : '2px'};

  transition:
    opacity       200ms ease,
    max-height    260ms cubic-bezier(0.4, 0, 0.2, 1),
    margin-top    260ms cubic-bezier(0.4, 0, 0.2, 1),
    margin-bottom 260ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export const NavLink = styled.a<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px 8px ${ICON_LEFT - 4}px;
  cursor: pointer;
  text-decoration: none;
  margin: 0 0 2px 0;
  width: fit-content;

  border-radius: 0 999px 999px 0;

  background: ${p => p.$active ? '#000482' : 'transparent'};
  border: none;
  color: ${p => p.$active ? '#ffffff' : '#525252'};

  transition: background 180ms ease, color 180ms ease;

  &:hover {
    background: ${p => p.$active ? '#000482' : 'rgba(0, 4, 130, 0.10)'};
    color: ${p => p.$active ? '#ffffff' : '#000482'};
  }
`;

export const NavIcon = styled.span`
  width: ${ICON_W}px;
  height: ${ICON_W}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const NavText = styled.span<{ $collapsed: boolean }>`
  font-size: 0.8rem;
  font-weight: 500;
  color: inherit;
  white-space: nowrap;
  overflow: hidden;

  opacity:   ${p => p.$collapsed ? 0 : 1};
  max-width: ${p => p.$collapsed ? '0px' : '140px'};

  transition:
    opacity   ${p => p.$collapsed ? '150ms' : '220ms'} ease,
    max-width ${p => p.$collapsed ? '180ms' : '260ms'} cubic-bezier(0.4, 0, 0.2, 1);
`;

export const SidebarFooter = styled.div`
  height: 8px;
  flex-shrink: 0;
`;