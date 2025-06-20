import {
  DashboardLayout,
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

  // const navItems: NavItemType[] = [
  //   {
  //     name: t("navigationList.home"),
  //     path: "/",
  //   },
  // ];

  return <DashboardLayout>{<Outlet />}</DashboardLayout>;
};
