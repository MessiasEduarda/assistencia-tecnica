// frontend/src/components/views/equipamentos/modals/EquipmentDetailsModal/styles.ts

import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 24px;
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

export const Section = styled.div`
  margin-bottom: 4px;
`;

export const SectionTitle = styled.h4`
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--neutral-400);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 12px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FieldLabel = styled.span`
  font-size: 0.72rem;
  color: var(--neutral-400);
`;

export const FieldValue = styled.span`
  font-size: 0.875rem;
  color: var(--neutral-800);
  font-weight: 500;
`;

export const Divider = styled.div`
  height: 1px;
  background: var(--neutral-100);
  margin: 16px 0;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Tag = styled.span`
  background: var(--neutral-100);
  color: var(--neutral-600);
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-full);
  padding: 3px 10px;
  font-size: 0.8125rem;
  font-weight: 500;
`;

export const OSMini = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--neutral-100);
  &:last-child { border-bottom: none; }
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
  animation: _spin 0.7s linear infinite;
  @keyframes _spin { to { transform: rotate(360deg); } }
`;