import { cookies } from "next/headers";

import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import { getMenu, updateMenu } from "@/services/api/menu";
import { MenuPage, UUID } from "@/services/types";

import MenuForm from "./MenuForm";

export interface MenuProps { params: { websiteId: UUID } }

export default async function Menu ({ params: { websiteId } }: MenuProps) {

  const cookiesList = cookies().getAll();

  const pages = await getMenu(websiteId, cookiesList);

  pages.sort((a, b) => a.order - b.order);

  const handleMenuUpdate = async (updatedMenu: MenuPage[]) => {
    "use server";
    await updateMenu(websiteId, updatedMenu, cookiesList);
  };

  return (
    <>
      <PageHeading>
        <Title>Menu</Title>
        <Subtitle>
        La page Menu vous permet de gérer les menus dans le header et le footer de votre site web.
        Vous pouvez modifier l’ordre en glissant les pages et rendre une page active ou inactive en appuyant sur le bouton en forme d’interrupteur.
        </Subtitle>
      </PageHeading>

      <div className="grid grid-cols-12 items-start">
        <MenuForm pages={pages} handleMenuUpdate={handleMenuUpdate} />
      </div>
    </>
  );
}
