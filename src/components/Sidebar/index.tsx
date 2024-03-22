"use client";

import Link from "next/link";
import SidebarItem from "./SidebarItem";
import SidebarGroup from "./SidebarGroup";

export default function Sidebar() {
  const { pathname } = window.location;
  return (
    <header className="sticky top-0 bg-black text-white p-8 h-screen flex flex-col gap-16 items-start">
      <Link href="/">
        <img src="/logo-white.svg"/>
      </Link>
      <nav className="w-full">
        <ul className="flex flex-col gap-4">
          <SidebarItem
            link="/"
            isCurrentPage={pathname === "/"}
          >
            Tableau de bord
          </SidebarItem>
          <SidebarItem
            link="/pages"
            isCurrentPage={pathname.startsWith("/pages")}
          >
            Pages
          </SidebarItem>
          <SidebarItem
            link="/menu"
            isCurrentPage={pathname === "/menu"}
          >
            Menu
          </SidebarItem>
          <SidebarItem
            link="/customization"
            isCurrentPage={pathname === "/customization"}
          >
            Personnalisation
          </SidebarItem>
          <SidebarGroup
            groupTitle="Paramètres"
            link="/settings/general"
            isCurrentPage={pathname.startsWith("/settings")}
            items={
              [
                { text: "Généraux", link: "/settings/general", isCurrentPage: pathname === "/settings/general" },
                { text: "Contact", link: "/settings/contact", isCurrentPage: pathname === "/settings/contact" }
              ]
            }
          />
        </ul>
      </nav>
    </header>
  )
}