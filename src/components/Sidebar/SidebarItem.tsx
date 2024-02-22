import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

export interface SidebarItemProps extends ComponentPropsWithoutRef<"div"> {
  isCurrentPage?: boolean;
  link: string;
}

export default function SidebarItem({
  children,
  isCurrentPage,
  link
}:SidebarItemProps) {
  return(
    <li className={`flex gap-4 rounded-ui duration-300 ${ isCurrentPage ? "bg-white hover:bg-whiteDark text-black font-bold" : "hover:bg-hoveredSidebarItems"}`}>
      <Link className="w-full p-4" href={link}>
        <span className={`w-[24px] h-[24px] ${ isCurrentPage ? "bg-primary" : "bg-white"}`}></span>
        { children }
      </Link>
    </li>
  )
}
