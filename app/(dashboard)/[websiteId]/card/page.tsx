import { UUID } from "@/services/types";
import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";

import MenuCardForm from "./MenuCardForm";
import { getCategories } from "@/services/api/category";
import { getProducts } from "@/services/api/product";
import { cookies } from "next/headers";

export interface MenuCardProps { params: { websiteId: UUID } }

export default async function MenuCard ({
  params: { websiteId },
}: MenuCardProps) {

  const cookiesList = cookies().getAll();
  const categories = await getCategories();
  const products = await getProducts(websiteId, cookiesList);

  return (
    <>
      <PageHeading>
        <Title>Carte des menus</Title>
        <Subtitle>
          Ici, vous pouvez gérer le menu de votre site web. <strong>Les prix doivent être indiqués en centimes</strong>
        </Subtitle>
        <MenuCardForm
          websiteId={websiteId}
          categories={categories}
          settings={products}
          cookiesList={cookiesList}
        />
      </PageHeading>
    </>
  );
}
