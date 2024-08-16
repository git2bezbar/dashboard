import { cookies } from "next/headers";

import { UUID } from "@/services/types";
import { getPage, getPages } from "@/services/api/page";
import PageHeading from "@/src/components/PageHeading";
import Title from "@/src/components/Title";
import { PAGE_NAMES } from "@/services/commons";

import SinglePageComp from "./SinglePageComp";
import DashboardNotFound from "../../not-found";

export interface PagesProps {
  params: {
    pageId: UUID;
    websiteId: UUID;
  }
}

export default async function Pages ({ params: { pageId, websiteId } }: PagesProps) {

  const cookiesList = cookies().getAll();
  const page = await getPage(websiteId, pageId, cookiesList);
  let activeMenuPages = await getPages(websiteId, cookiesList);
  activeMenuPages = activeMenuPages.filter(activePage => activePage.isActive && activePage.type !== page.type);

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
        menuPages={activeMenuPages}
      />
    </>
  );
}
