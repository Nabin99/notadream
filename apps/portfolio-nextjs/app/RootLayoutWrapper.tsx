"use client";

import Image from "next/image";
import { ReactNode } from "react";

import {
  Header,
  Logo,
  PageLayout as PageLayoutSkeleton,
  useTranslation,
} from "@notadream/react";
import type { NavItemType } from "@notadream/react";

import logo from "./assets/images/logo.svg";
import { Footer } from "./layouts/components";
import { useRotateCSSColorValue } from "./utils";

export default function RootLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { t } = useTranslation("app.header");

  const navItems: NavItemType[] = [
    {
      name: t("navigationList.home"),
      path: "/",
    },
    {
      name: t("navigationList.portfolio"),
      path: "/portfolio",
    },
    {
      name: t("navigationList.about"),
      path: "/about",
    },
    {
      name: t("navigationList.contact"),
      path: "/contact",
    },
  ];

  useRotateCSSColorValue();

  return (
    <PageLayoutSkeleton
      layout="basic"
      header={
        <>
          <div className="header-wrapper">
            <Header
              navItems={navItems}
              logo={<Image src={logo} width="40" height="40" alt="logo" />}
            ></Header>
          </div>
        </>
      }
      footer={<Footer />}
      main={<div>{children}</div>}
    />
  );
}
