import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
`;

export const TechCard = styled.div`
  background: var(--neutral-0);
  border: 1px solid var(--neutral-100);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 20px;
  transition: box-shadow var(--transition);

  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

export const TechHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
`;

export const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brand-400), var(--brand-600));
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const TechInfo = styled.div`
  flex: 1;
`;

export const TechName = styled.div`
  font-weight: 700;
  font-size: 1rem;
`;

export const TechRole = styled.div`
  font-size: 0.8125rem;
  color: var(--neutral-500);
  margin-top: 2px;
`;

export const ActiveBanner = styled.div`
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: var(--radius-md);
  padding: 8px 12px;
  font-size: 0.8125rem;
  color: #92400e;
  margin-bottom: 4px;
`;

export const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--neutral-100);
`;

export const Stat = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--neutral-900);
`;

export const StatLabel = styled.div`
  font-size: 0.75rem;
  color: var(--neutral-400);
  margin-top: 2px;
`;

export const CardActions = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 8px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
