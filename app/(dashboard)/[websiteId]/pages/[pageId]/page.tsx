import { getPage } from "@/services/api/page";
import { UUID } from "@/services/types";
import SinglePageComp from "./SinglePageComp";
import { cookies, headers } from 'next/headers';
import PageHeading from "@/src/components/PageHeading";
import Title from "@/src/components/Title";
import { PAGE_NAMES } from "@/services/commons";

export interface PagesProps {
  params: {
    pageId: UUID;
    websiteId: UUID;
  }
}

export default async function Pages({ params: { pageId, websiteId }}: PagesProps) {
  
  const cookiesList = cookies().getAll();
  
  const page = await getPage(websiteId, pageId, cookiesList);
  
  page.widgets.sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeading>
        <Title>{ PAGE_NAMES[page.type] }</Title>
      </PageHeading>
      <SinglePageComp
        page={page}
        pageId={pageId}
        websiteId={websiteId}
        cookiesList={cookiesList}  
      />
    </> 
  )
}
