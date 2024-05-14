import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";

import { getCustomizationSettings } from "@/services/api/customization";
import CustomizationSettingsForm from "./CustomizationSettingsForm";
import { cookies } from "next/headers";
import { UUID } from "@/services/types";

export interface CustomizationSettingsProps {
  params: { websiteId: UUID };
}

export default async function Customization({ 
  params: { websiteId }
}: CustomizationSettingsProps) {
  
  const cookiesList = cookies().getAll();
  
  const customizationSettings = 
    await getCustomizationSettings(websiteId, cookiesList);

  return (
    <>
      <PageHeading>
        <Title>Personnalisation</Title>
        <Subtitle>
          Cras elementum mi a libero sagittis sollicitudin. Quisque eleifend 
          dapibus justo, sed euismod ipsum hendrerit non. Donec mollis semper 
          elit.
        </Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <CustomizationSettingsForm
          settings={customizationSettings}
          websiteId={websiteId}
        />
      </div>
    </> 
  )
}
