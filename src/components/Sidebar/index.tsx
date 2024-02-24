import Link from "next/link";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <header className="sticky top-0 bg-black text-white p-8 h-screen flex flex-col gap-16 items-start">
      <Link href="/">
        <img src="/logo-white.svg"/>
      </Link>
      <nav className="w-full">
        <ul className="flex flex-col gap-4">
          <SidebarItem
            link="/"
            isCurrentPage={true}
          >
            Tableau de bord
          </SidebarItem>
          <SidebarItem link="/pages">Pages</SidebarItem>
          <SidebarItem link="/menu">Menu</SidebarItem>
          <SidebarItem link="/customization">Personnalisation</SidebarItem>
          <SidebarItem link="/settings/general">Paramètres</SidebarItem>
        </ul>
      </nav>
    </header>
  )
}