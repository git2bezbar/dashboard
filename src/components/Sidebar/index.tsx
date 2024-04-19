"use client";

import Link from "next/link";
import SidebarItem from "./SidebarItem";
import SidebarGroup from "./SidebarGroup";
import { UUID } from "@/services/types";

export interface SidebarProps {
  websiteId: UUID;
}

export default function Sidebar({ websiteId }: SidebarProps) {
  
  let pathname = "";

  if (typeof window !== "undefined")
    pathname = window.location.pathname;
  return (
    <header className="sticky top-0 bg-black text-white p-8 h-screen flex flex-col gap-16 items-start">
      <Link href={`/${websiteId}`}>
        <img src="/logo-white.svg"/>
      </Link>
      <nav className="w-full">
        <ul className="flex flex-col gap-4">
          <SidebarItem
            link={`/${websiteId}`}
            isCurrentPage={pathname === `/${websiteId}`}
          >
            Tableau de bord
          </SidebarItem>
          <SidebarItem
            link={`/${websiteId}/pages`}
            isCurrentPage={pathname.includes("/pages")}
          >
            Pages
          </SidebarItem>
          <SidebarItem
            link={`/${websiteId}/menu`}
            isCurrentPage={pathname.includes("/menu")}
          >
            Menu
          </SidebarItem>
          <SidebarItem
            link={`/${websiteId}/customization`}
            isCurrentPage={pathname.includes("/customization")}
          >
            Personnalisation
          </SidebarItem>
          <SidebarGroup
            groupTitle="Paramètres"
            link={`/${websiteId}/settings/general`}
            isCurrentPage={pathname.includes("/settings")}
            items={
              [
                { text: "Généraux", link: `/${websiteId}/settings/general`, isCurrentPage: pathname.includes("/settings/general") },
                { text: "Contact", link: `/${websiteId}/settings/contact`, isCurrentPage: pathname.includes("/settings/contact") }
              ]
            }
          />
        </ul>
      </nav>
    </header>
  )
}