import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', sans-serif;
`;

export const Left = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.62);
  }

  @media (max-width: 860px) {
    display: none;
  }
`;

export const Right = styled.div`
  width: 590px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 40px;
  background: #ffffff;

  @media (max-width: 860px) {
    width: 100%;
  }
`;

export const Box = styled.div`
  width: 100%;
  max-width: 360px;
  animation: ${fadeUp} 0.55s ease both 0.1s;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 32px;
`;

export const LogoImg = styled.img`
  height: 72px;
  width: auto;
  object-fit: contain;
`;

export const LogoSubtitle = styled.span`
  font-size: 0.72rem;
  color: #999;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const Heading = styled.h1`
  font-size: 1.45rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 5px;
  text-align: center;
  letter-spacing: -0.01em;
`;

export const Sub = styled.p`
  font-size: 0.875rem;
  color: #999;
  margin-bottom: 28px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 4px;
`;

export const EyeBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  padding: 4px;
  display: flex;
  align-items: center;
`;

export const ForgotLink = styled.a`
  font-size: 0.8rem;
  color: #5400b5;
  text-align: right;
  display: block;
  margin-top: 4px;
  cursor: pointer;
  text-decoration: none;

  &:hover { text-decoration: underline; }
`;

export const Footer = styled.p`
  text-align: center;
  font-size: 0.8375rem;
  color: #888;
  margin-top: 18px;

  a {
    color: #5400b5;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;

    &:hover { text-decoration: underline; }
  }
`;