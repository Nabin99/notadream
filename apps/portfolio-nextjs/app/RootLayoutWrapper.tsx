'use client';

import { Header, Logo, PageLayout as PageLayoutSkeleton, useTranslation } from '@notadream/react';
import { ReactNode } from 'react';

import logo from './assets/images/logo.svg';
import { Footer } from './layouts/components';

import type { NavItemType } from '@notadream/react';

export default function RootLayoutWrapper({ children }: { children: ReactNode }) {
  const { t } = useTranslation('app.header');

  const navItems: NavItemType[] = [
    {
      name: t('navigationList.home'),
      path: '/',
    },
    {
      name: t('navigationList.portfolio'),
      path: '/portfolio',
    },
    {
      name: t('navigationList.about'),
      path: '/about',
    },
    {
      name: t('navigationList.contact'),
      path: '/contact',
    },
  ];

  return (
    <PageLayoutSkeleton
      layout="basic"
      header={
        <>
          <div className="header-wrapper">
            <Header
              navItems={navItems}
              logo={<Logo src={logo} size="medium" />}
            ></Header>
          </div>
        </>
      }
      footer={<Footer />}
      main={<div>{children}</div>}
    />
  );
}
