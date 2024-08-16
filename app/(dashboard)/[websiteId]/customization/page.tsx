import { cookies } from "next/headers";

import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import { getCustomizationSettings } from "@/services/api/customization";
import { UUID } from "@/services/types";

import CustomizationSettingsForm from "./CustomizationSettingsForm";

export interface CustomizationSettingsProps {
  params: { websiteId: UUID };
}

export default async function Customization ({
  params: { websiteId },
}: CustomizationSettingsProps) {

  const cookiesList = cookies().getAll();

  const customizationSettings =
    await getCustomizationSettings(websiteId, cookiesList);

  return (
    <>
      <PageHeading>
        <Title>Personnalisation</Title>
        <Subtitle>
          La page “Personnalisation” vous permet de rendre votre site web unique grâce à différentes options. Créez le site web qui vous ressemble.
        </Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <CustomizationSettingsForm
          settings={customizationSettings}
          websiteId={websiteId}
          cookiesList={cookiesList}
        />
      </div>
    </>
  );
}
