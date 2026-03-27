'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  SelectWrapper, Label, TriggerBtn, OptionsList, OptionItem, HintText, Placeholder,
} from './styles';
import { FormError } from '@/components/ui/FormError';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  id?: string;
}

export function Select({
  label,
  error,
  hint,
  fullWidth = true,
  placeholder,
  options,
  id,
  value,
  onChange,
  disabled,
}: SelectProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(val: string) {
    onChange?.(val);
    setOpen(false);
  }

  return (
    <SelectWrapper $fullWidth={fullWidth} ref={ref}>
      {label && <Label htmlFor={inputId}>{label}</Label>}

      <TriggerBtn
        type="button"
        id={inputId}
        $hasError={!!error}
        $open={open}
        disabled={disabled}
        onClick={() => !disabled && setOpen(v => !v)}
      >
        {selected
          ? <span>{selected.label}</span>
          : <Placeholder>{placeholder ?? 'Selecione...'}</Placeholder>
        }
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </TriggerBtn>

      {open && (
        <OptionsList>
          {options.map(opt => (
            <OptionItem
              key={opt.value}
              $active={opt.value === value}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}

      <FormError message={error} />
      {hint && !error && <HintText>{hint}</HintText>}
    </SelectWrapper>
  );
}