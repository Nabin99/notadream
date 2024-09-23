import {
  Header,
  Logo,
  PageLayout as PageLayoutSkeleton,
} from "@notadream/react";
import { Outlet } from "react-router-dom";

import { Footer } from "./components";

import type { NavItemType } from "@notadream/react";

const navItems: NavItemType[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
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
    name: "Services",
    path: "fdkfsd",
    children: [
      { name: "Consulting2", path: "/services/consulting" },
      { name: "Support2", path: "/services/support" },
    ],
  },
];

export const PageLayout = () => {
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
