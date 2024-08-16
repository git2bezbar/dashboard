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
          C’est ici que vous avez une liste de toutes les pages qui sont sur votre site web. 
          En cliquant sur l’une des lignes du tableau vous pourrez gérer le contenu de la page en question. 
          Pour gérer la visibilité de cette page, rendez-vous sur la page Menu.
        </Subtitle>
      </PageHeading>
      <PageList pages={pages} websiteId={websiteId} />      
    </> 
  )
}
