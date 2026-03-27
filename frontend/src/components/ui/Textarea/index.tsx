'use client';
import React from 'react';
import { TextareaWrapper, Label, StyledTextarea, HintText } from './styles';
import { FormError } from '@/components/ui/FormError';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export function Textarea({
  label,
  error,
  hint,
  fullWidth = true,
  id,
  ...rest
}: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');

  return (
    <TextareaWrapper $fullWidth={fullWidth}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <StyledTextarea
        id={inputId}
        $hasError={!!error}
        {...rest}
      />
      <FormError message={error} />
      {hint && !error && <HintText>{hint}</HintText>}
    </TextareaWrapper>
  );
}