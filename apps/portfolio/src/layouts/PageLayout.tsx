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
  const { t } = useTranslation("header");

  const navItems: NavItemType[] = [
    {
      name: t("navigationList.home"),
      path: "/",
    },
    {
      name: t("navigationList.about"),
      path: "/about",
      children: [
        {
          name: "Team",
          path: "/about/team",
          children: [
            { name: "Consulting", path: "/about/consulting" },
            { name: "Support", path: "/about/support" },
          ],
        },
        { name: "Company", path: "/about/company" },
      ],
    },
    {
      name: t("navigationList.services"),
      path: "fdkfsd",
      children: [
        { name: "Consulting2", path: "/services/consulting" },
        { name: "Support2", path: "/services/support" },
      ],
    },
  ];

  return (
    <PageLayoutSkeleton
      layout="basic"
      header={
        <Header
          navItems={navItems}
          logo={<Logo src={"/vite.svg"} size="medium" />}
        ></Header>
      }
      footer={<Footer />}
      main={<Outlet />}
    />
  );
};
