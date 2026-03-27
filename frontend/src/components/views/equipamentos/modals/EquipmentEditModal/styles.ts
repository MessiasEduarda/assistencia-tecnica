// frontend/src/components/views/equipamentos/modals/EquipmentEditModal/styles.ts

import styled from 'styled-components';

export const FormGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.$cols ?? 2}, 1fr);
  gap: 16px;
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

export const SectionTitle = styled.h4`
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--neutral-400);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 12px;
  &:first-child { margin-top: 0; }
`;

export const ErrorBanner = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.875rem;
  margin-bottom: 16px;
`;

export const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  color: var(--neutral-400);
  font-size: 0.875rem;
  gap: 10px;
`;

export const Spinner = styled.span`
  width: 18px; height: 18px;
  border: 2px solid var(--neutral-200);
  border-top-color: #3d00a0;
  border-radius: 50%;
  animation: _spin3 0.7s linear infinite;
  @keyframes _spin3 { to { transform: rotate(360deg); } }
`;