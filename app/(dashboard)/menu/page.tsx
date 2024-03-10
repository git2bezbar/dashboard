import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import MenuForm from "./MenuForm";
import { getMenu, updateMenu } from "@/services/api/menu";
import { MenuPage } from "@/services/types";

export default async function Menu() {

  const pages = await getMenu('1bcc2d88-43e2-47f9-a009-d7a2418604df');
  pages.sort((a, b) => a.order - b.order);
  const handleMenuUpdate = async (updatedMenu: MenuPage[]) => {
    "use server"
    const updatedPages = await updateMenu('1bcc2d88-43e2-47f9-a009-d7a2418604df', updatedMenu);
  }
  return (
    <>
      <PageHeading>
        <Title>Menu</Title>
        <Subtitle>Cras elementum mi a libero sagittis sollicitudin. Quisque eleifend dapibus justo, sed euismod ipsum hendrerit non. Donec mollis semper elit.</Subtitle>
      </PageHeading>

      <div className="grid grid-cols-12 items-start">
        <MenuForm pages={pages} handleMenuUpdate={handleMenuUpdate} />
      </div>
    </> 
  )
}
