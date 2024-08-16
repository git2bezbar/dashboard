"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { UUID } from "@/services/types";

import SidebarItem from "./SidebarItem";

export interface SidebarProps {
  websiteId: UUID;
}

export default function Sidebar ({ websiteId }: SidebarProps) {

  const pathname = usePathname();

  return (
    <header className="sticky top-0 bg-black text-white p-8 h-screen flex flex-col gap-16 items-start">
      <Link href={`/${websiteId}`}>
        <Image
          src="/logo-white.svg"
          alt="Logo"
          width={100}
          height={100}
        />
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
          <SidebarItem
            link={`/${websiteId}/settings/general`}
            isCurrentPage={pathname.includes("/settings/general")}
          >
            Paramètres généraux
          </SidebarItem>
          <SidebarItem
            link={`/${websiteId}/settings/contact`}
            isCurrentPage={pathname.includes("/settings/contact")}
          >
            Paramètres de contact
          </SidebarItem>
        </ul>
      </nav>
    </header>
  );
}
