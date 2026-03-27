import styled from 'styled-components';

export const CardWrapper = styled.div<{$noPad?: boolean}>`
  background: var(--neutral-0);
  border-radius: var(--radius-lg);
  border: 1px solid var(--neutral-100);
  box-shadow: var(--shadow-sm);
  padding: ${p => (p.$noPad ? '0' : '24px')};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h2, h3 {
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    font-size: 0.8125rem;
    color: var(--neutral-400);
    margin-top: 2px;
  }
`;

export const CardBody = styled.div``;

export const CardFooter = styled.div`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--neutral-100);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;