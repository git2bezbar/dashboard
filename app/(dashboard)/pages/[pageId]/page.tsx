import { getPage } from "@/services/api/page";
import { UUID } from "@/services/types";
import SinglePageComp from "./SinglePageComp";
import { headers } from 'next/headers';
import PageHeading from "@/src/components/PageHeading";
import Title from "@/src/components/Title";
import { PAGE_NAMES } from "@/services/commons";

export interface PagesProps {
  params: {
    pageId: UUID;
  }
}

export default async function Pages({ params: { pageId }}: PagesProps) {

  const page = await getPage('1bcc2d88-43e2-47f9-a009-d7a2418604df', pageId);
  page.widgets.sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeading>
        <Title>{ PAGE_NAMES[page.type] }</Title>
      </PageHeading>
      <SinglePageComp page={page} pageId={pageId} />
    </> 
  )
}
