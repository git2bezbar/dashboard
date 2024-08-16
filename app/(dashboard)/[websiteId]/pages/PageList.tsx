"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@fork2e/umbrella";

import { PAGE_NAMES } from "@/services/commons";
import { Page, UUID } from "@/services/types";

export interface PageListProps {
  pages: Page[];
  websiteId: UUID;
}

export default function PageList ({ pages, websiteId }: PageListProps) {
  return (
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
            onClick={() => {
              document.location.href = `/${websiteId}/pages/${page.uuid}`;
            }}
          >
            <TableCell className="font-medium">
              { PAGE_NAMES[page.type] }
            </TableCell>
            <TableCell>{page.isActive ? "Activée" : "Désactivée"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
