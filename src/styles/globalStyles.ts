import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --brand-400: #F59E0B;
    --brand-500: #D97706;
    --brand-600: #B45309;
    --neutral-0:   #FFFFFF;
    --neutral-50:  #F8F7F4;
    --neutral-100: #EFEDE8;
    --neutral-200: #D6D3CC;
    --neutral-300: #B8B4AC;
    --neutral-400: #908C84;
    --neutral-500: #6B6760;
    --neutral-600: #4A4742;
    --neutral-700: #2F2D29;
    --neutral-800: #1A1917;
    --neutral-900: #0D0C0B;
    --sidebar-w: 260px;
    --topbar-h: 64px;
    --font-sans: 'DM Sans', 'Segoe UI', sans-serif;
    --font-display: 'Syne', 'DM Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 14px;
    --radius-xl: 20px;
    --radius-full: 9999px;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05);
    --shadow-lg: 0 10px 30px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06);
    --transition: 250ms ease;
  }

  html, body { height: 100%; }

  body {
    font-family: var(--font-sans);
    font-size: 15px;
    line-height: 1.6;
    color: var(--neutral-800);
    background: var(--neutral-50);
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-weight: 700;
    line-height: 1.25;
    color: var(--neutral-900);
  }

  a { color: inherit; text-decoration: none; }
  button { cursor: pointer; border: none; background: none; font-family: inherit; }
  input, select, textarea { font-family: inherit; }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--neutral-100); }
  ::-webkit-scrollbar-thumb { background: var(--neutral-300); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--neutral-400); }
  ::selection { background: #FDE68A; color: var(--neutral-900); }
`;
