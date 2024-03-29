import { getPages } from "@/services/api/page";
import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import PageList from "./PageList";
import { cookies } from "next/headers";


export default async function Pages() {
  const cookiesList = cookies().getAll();
  const pages = await getPages('1bcc2d88-43e2-47f9-a009-d7a2418604df', cookiesList);
  return (
    <>
      <PageHeading>
        <Title>Pages</Title>
        <Subtitle>Cras elementum mi a libero sagittis sollicitudin. Quisque eleifend dapibus justo, sed euismod ipsum hendrerit non. Donec mollis semper elit.</Subtitle>
      </PageHeading>
      <PageList pages={pages} />      
    </> 
  )
}
