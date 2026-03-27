'use client';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Page, Left, Right, Box, Logo, LogoImg, LogoSubtitle,
  Heading, Sub, Form, FieldGroup, EyeBtn, ForgotLink, Footer,
} from './styles';

export default function LoginPage() {
  const [email, setEmail]           = useState('');
  const [pass, setPass]             = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError]   = useState('');
  const [loading, setLoading]       = useState(false);

  const { login, checkEmailExists } = useAuth();
  const router = useRouter();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPassError('');

    if (!email) {
      setEmailError('Informe seu e-mail.');
      return;
    }

    if (!pass) {
      setPassError('Informe sua senha.');
      return;
    }

    setLoading(true);

    try {
      const emailExists = await checkEmailExists(email);

      if (!emailExists) {
        setEmailError('E-mail não encontrado.');
        setLoading(false);
        return;
      }

      await login(email, pass);
      router.push('/dashboard');

    } catch (err: unknown) {
      setPassError(err instanceof Error ? err.message : 'Senha incorreta.');
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = showPass ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  return (
    <Page>
      <Left style={{ backgroundImage: "url('/fundo.jpg')" }} />
      <Right>
        <Box>
          <Logo>
            <LogoImg src="/TechPro.png" alt="TechPro" />
            <LogoSubtitle>Sistema de Gestão</LogoSubtitle>
          </Logo>

          <Heading>Acesse sua conta</Heading>
          <Sub>Entre com suas credenciais para continuar</Sub>

          <Form onSubmit={submit}>
            <FieldGroup>
              <Input
                label="E-mail"
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setEmailError(''); }}
                autoComplete="email"
                error={emailError}
              />
            </FieldGroup>

            <FieldGroup>
              <Input
                label="Senha"
                id="pass"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={pass}
                onChange={e => { setPass(e.target.value); setPassError(''); }}
                autoComplete="current-password"
                error={passError}
                iconRight={
                  <EyeBtn
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {EyeIcon}
                  </EyeBtn>
                }
              />
              <ForgotLink href="/esqueci-senha">Esqueci minha senha</ForgotLink>
            </FieldGroup>

            <Button
              type="submit"
              variant="login"
              size="lg"
              fullWidth
              loading={loading}
              style={{ marginTop: '8px' }}
            >
              {loading ? 'Entrando…' : 'Entrar'}
            </Button>
          </Form>

          <Footer>
            Não tem conta ainda?{' '}
            <a onClick={() => router.push('/cadastro')}>Cadastre-se grátis</a>
          </Footer>
        </Box>
      </Right>
    </Page>
  );
}