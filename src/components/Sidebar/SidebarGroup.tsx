import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

interface Item {
  text: string;
  link: string;
  isCurrentPage?: boolean;
}

export interface SidebarGroupProps extends ComponentPropsWithoutRef<"div"> {
  isCurrentPage?: boolean;
  link: string;
  items: Item[];
  groupTitle: string;
}

export default function SidebarGroup ({
  groupTitle,
  items,
  isCurrentPage,
  link,
}:SidebarGroupProps) {

  return (
    <li className={`flex flex-col gap-4 p-4 rounded-ui duration-300 ${ isCurrentPage ? "bg-white text-black font-bold" : "hover:bg-hoveredSidebarItems"}`}>
      <Link className="w-full" href={link}>
        { groupTitle }
      </Link>
      {
        isCurrentPage && (
          <ul className="flex flex-col gap-4">
            { items.map((item, i) => (
              <li key={i} className={`flex gap-4 p-4 rounded-ui duration-300 bg-white hover:bg-whiteDark text-black font-bold ${ item.isCurrentPage ? "!bg-whiteDark" : ""}`}>
                <Link className="w-full" href={item.link}>
                  { item.text }
                </Link>
              </li>
            )) }
          </ul>
        )
      }
    </li>
  );
}
