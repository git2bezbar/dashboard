import { getPages } from "@/services/api/page";
import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import PageList from "./PageList";
import { cookies } from "next/headers";
import { UUID } from "@/services/types";

export interface PagesProps { params: { websiteId: UUID } }

export default async function Pages({ params: { websiteId } }:PagesProps) {
  
  const cookiesList = cookies().getAll();
  
  const pages = 
    await getPages(websiteId, cookiesList);
  
  return (
    <>
      <PageHeading>
        <Title>Pages</Title>
        <Subtitle>
          Cras elementum mi a libero sagittis sollicitudin. Quisque eleifend 
          dapibus justo, sed euismod ipsum hendrerit non. Donec mollis semper 
          elit.
        </Subtitle>
      </PageHeading>
      <PageList pages={pages} websiteId={websiteId} />      
    </> 
  )
}
