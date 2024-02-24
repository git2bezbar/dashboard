'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@fork2e/umbrella";
import { PAGE_NAMES } from "@/services/commons";
import { Page } from "@/services/types";
import Link from "next/link";

export interface PageListProps {
  pages: Page[];
}

export default function PageList({ pages }: PageListProps) {
  return(
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page:Page) => (
            <TableRow
              key={page.type}
              className="cursor-pointer"
              onClick={() => { document.location.href = `/pages/${page.uuid}` }}
            >
              <TableCell className="font-medium">{ PAGE_NAMES[page.type] }</TableCell>
              <TableCell>{page.isActive ? "Activée" : "Désactivée"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}
