import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

export interface SidebarGroupProps extends ComponentPropsWithoutRef<"div"> {
  isCurrentPage?: boolean;
  link: string;
}

export default function SidebarGroup({
  children,
  isCurrentPage,
  link
}:SidebarGroupProps) {
  return(
    <li className={`flex gap-4 p-4 rounded-ui duration-300 ${ isCurrentPage ? "bg-white hover:bg-whiteDark text-black font-bold" : "hover:bg-hoveredSidebarItems"}`}>
      <Link className="w-full" href={link}>
        <span className={`w-[24px] h-[24px] ${ isCurrentPage ? "bg-primary" : "bg-white"}`}></span>
        { children }
      </Link>
    </li>
  )
}
