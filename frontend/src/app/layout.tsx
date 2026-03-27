import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'AssistTec',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <AuthProvider>
            {children}
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
