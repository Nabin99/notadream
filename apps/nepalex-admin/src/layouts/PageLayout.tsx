import {
  Header,
  Logo,
  PageLayout as PageLayoutSkeleton,
  useTranslation,
} from "@notadream/react";
import { Outlet } from "react-router-dom";

import { Footer } from "./components";
import logo from "../assets/images/logo.svg";

import type { NavItemType } from "@notadream/react";

export const PageLayout = () => {
  const { t } = useTranslation("app.header");

  const navItems: NavItemType[] = [
    {
      name: t("navigationList.home"),
      path: "/",
    },
  ];

  return (
    <PageLayoutSkeleton
      layout="sidebarOverlay"
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
      main={<Outlet />}
    />
  );
};
