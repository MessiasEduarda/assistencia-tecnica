'use client';
import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useApi } from '@/hooks/useApi';
import { FormGrid, SectionTitle, FormSection, ErrorBanner } from './styles';

const IconPerson = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconPhone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.55a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMap = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconLock = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

interface FormState {
  name: string; cpf: string; birthDate: string;
  email: string; phone: string; whatsapp: string;
  zip: string; street: string; number: string;
  complement: string; neighborhood: string; city: string; state: string;
  password: string;
}

const EMPTY: FormState = {
  name: '', cpf: '', birthDate: '',
  email: '', phone: '', whatsapp: '',
  zip: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '',
  password: '',
};

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

function maskCpf(v: string) {
  return v.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}
function maskZip(v: string) {
  return v.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
}

export function TecnicoCreateModal({ open, onClose, onCreated }: Props) {
  const api = useApi();
  const [form, setForm]             = useState<FormState>(EMPTY);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [loadingCep, setLoadingCep] = useState(false);

  function setField(f: keyof FormState, mask?: (v: string) => string) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(p => ({ ...p, [f]: mask ? mask(e.target.value) : e.target.value }));
  }

  function handleClose() {
    if (saving) return;
    setForm(EMPTY);
    setError(null);
    onClose();
  }

  async function fetchCep(zip: string) {
    const digits = zip.replace(/\D/g, '');
    if (digits.length !== 8) return;
    setLoadingCep(true);
    try {
      const r = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const d = await r.json();
      if (!d.erro) {
        setForm(p => ({
          ...p,
          street:       d.logradouro || p.street,
          neighborhood: d.bairro     || p.neighborhood,
          city:         d.localidade || p.city,
          state:        d.uf         || p.state,
        }));
      }
    } catch { /* silencioso */ }
    finally { setLoadingCep(false); }
  }

  async function handleSubmit() {
    setError(null);
    if (!form.name.trim())     return setError('O nome é obrigatório.');
    if (!form.email.trim())    return setError('O e-mail é obrigatório.');
    if (!form.password.trim()) return setError('A senha é obrigatória.');
    setSaving(true);
    try {
      await api.post('/users', {
        name:         form.name.trim(),
        email:        form.email.trim(),
        password:     form.password.trim(),
        role:         'TECHNICIAN',
        active:       true,
        cpf:          form.cpf          || undefined,
        phone:        form.phone        || undefined,
        whatsapp:     form.whatsapp     || undefined,
        birthDate:    form.birthDate    || undefined,
        zip:          form.zip          || undefined,
        street:       form.street       || undefined,
        number:       form.number       || undefined,
        complement:   form.complement   || undefined,
        neighborhood: form.neighborhood || undefined,
        city:         form.city         || undefined,
        state:        form.state        || undefined,
      });

      // ── ORDEM CORRETA: fecha o modal primeiro, depois avisa o pai ──────────
      setForm(EMPTY);
      setError(null);
      onClose();       // 1. fecha modal → createOpen = false
      onCreated();     // 2. pai chama loadTechnicians → fetch com dados atualizados
    } catch (err: any) {
      setError(err?.message ?? 'Erro ao cadastrar. Verifique os dados e tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Novo Técnico"
      subtitle="Preencha os dados para cadastrar um novo técnico"
      size="lg"
      footer={
        <>
          <Button variant="neutral" onClick={handleClose} disabled={saving}>Cancelar</Button>
          <Button variant="login" onClick={handleSubmit} loading={saving}>
            {saving ? 'Salvando...' : 'Cadastrar técnico'}
          </Button>
        </>
      }
    >
      {error && <ErrorBanner>⚠️ {error}</ErrorBanner>}

      <FormSection>
        <SectionTitle><IconPerson /> Dados pessoais</SectionTitle>
        <FormGrid $cols={2}>
          <Input label="Nome completo *" value={form.name} onChange={setField('name')} placeholder="Nome do técnico" style={{ gridColumn: '1 / -1' }} />
          <Input label="CPF" value={form.cpf} onChange={setField('cpf', maskCpf)} placeholder="000.000.000-00" />
          <Input label="Data de nascimento" value={form.birthDate} onChange={setField('birthDate')} type="date" />
        </FormGrid>
      </FormSection>

      <FormSection>
        <SectionTitle><IconPhone /> Contato</SectionTitle>
        <FormGrid $cols={2}>
          <Input label="E-mail *" value={form.email} onChange={setField('email')} type="email" placeholder="tecnico@empresa.com" style={{ gridColumn: '1 / -1' }} />
          <Input label="Telefone" value={form.phone} onChange={setField('phone', maskPhone)} placeholder="(00) 00000-0000" />
          <Input label="WhatsApp" value={form.whatsapp} onChange={setField('whatsapp', maskPhone)} placeholder="(00) 00000-0000" />
        </FormGrid>
      </FormSection>

      <FormSection>
        <SectionTitle><IconMap /> Endereço</SectionTitle>
        <FormGrid $cols={2}>
          <Input
            label={loadingCep ? 'CEP (buscando...)' : 'CEP'}
            value={form.zip} onChange={setField('zip', maskZip)}
            onBlur={e => fetchCep(e.target.value)} placeholder="00000-000"
          />
          <Input label="Estado (UF)" value={form.state} onChange={setField('state')} placeholder="SP" maxLength={2} />
          <Input label="Cidade" value={form.city} onChange={setField('city')} placeholder="São Paulo" />
          <Input label="Bairro" value={form.neighborhood} onChange={setField('neighborhood')} placeholder="Centro" />
          <Input label="Rua / Logradouro" value={form.street} onChange={setField('street')} placeholder="Rua das Flores" />
          <Input label="Número" value={form.number} onChange={setField('number')} placeholder="123" />
          <Input label="Complemento" value={form.complement} onChange={setField('complement')} placeholder="Apto 4B" style={{ gridColumn: '1 / -1' }} />
        </FormGrid>
      </FormSection>

      <FormSection>
        <SectionTitle><IconLock /> Acesso ao sistema</SectionTitle>
        <FormGrid $cols={1}>
          <Input label="Senha *" value={form.password} onChange={setField('password')} type="password" placeholder="Senha de acesso" />
        </FormGrid>
      </FormSection>
    </Modal>
  );
}