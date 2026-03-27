import { CSSProperties, ReactNode } from 'react';
import * as S from './styles';

interface CardProps {
  children: ReactNode;
  $noPad?: boolean;
}

interface CardSectionProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export const Card = ({ children, $noPad }: CardProps) => {
  return <S.CardWrapper $noPad={$noPad}>{children}</S.CardWrapper>;
};

export const CardHeader = ({ children, style, className }: CardSectionProps) => {
  return <S.CardHeader style={style} className={className}>{children}</S.CardHeader>;
};

export const CardBody = ({ children, style, className }: CardSectionProps) => {
  return <S.CardBody style={style} className={className}>{children}</S.CardBody>;
};

export const CardFooter = ({ children, style, className }: CardSectionProps) => {
  return <S.CardFooter style={style} className={className}>{children}</S.CardFooter>;
};