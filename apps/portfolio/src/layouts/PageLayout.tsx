import {
  Header,
  Logo,
  PageLayout as PageLayoutSkeleton,
  useTranslation,
} from "@notadream/react";
import { Outlet } from "react-router-dom";

import { Footer } from "./components";

import type { NavItemType } from "@notadream/react";

export const PageLayout = () => {
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
    // {
    //   name: t("navigationList.blogs"),
    //   path: "/blogs",
    // },
    {
      name: t("navigationList.about"),
      path: "/about",
    },
    {
      name: t("navigationList.contact"),
      path: "/contact",
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
              logo={<Logo src={"/vite.svg"} size="medium" />}
            ></Header>
          </div>
        </>
      }
      footer={<Footer />}
      main={<Outlet />}
    />
  );
};
