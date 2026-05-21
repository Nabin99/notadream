'use client';

import { I18nProvider, ThemeProvider, setThemeConfig } from '@notadream/react';
import { useEffect, type ReactNode } from 'react';

import { ClientOnly } from './client-only';
import { TranslationsEntry } from './i18n';
import RootLayoutWrapper from './RootLayoutWrapper';
import { NextJsAdapter } from './routing-adapter';

import './config';
import '@notadream/react/dist/index.css';
import './assets/css/index.css';

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setThemeConfig({
        defaultThemeKey: 'notadream',
      }).initTheme();
    }
  }, []);

  return (
    <ClientOnly>
      <NextJsAdapter>
        <ThemeProvider>
          <I18nProvider translations={TranslationsEntry}>
            <RootLayoutWrapper>{children}</RootLayoutWrapper>
          </I18nProvider>
        </ThemeProvider>
      </NextJsAdapter>
    </ClientOnly>
  );
}
