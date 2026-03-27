'use client';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { StyledButton } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'login' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  children,
  loading,
  leftIcon,
  rightIcon,
  disabled,
  variant,
  size,
  fullWidth,
  ...rest
}: Props) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span style={{
          width: 16,
          height: 16,
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          display: 'inline-block',
          animation: 'spin 0.6s linear infinite',
        }} />
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </StyledButton>
  );
}