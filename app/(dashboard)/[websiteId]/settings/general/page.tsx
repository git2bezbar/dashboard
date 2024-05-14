import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import GeneralSettingsForm from "./GeneralSettingsForm";
import { getGeneralSettings } from "@/services/api/general-settings";
import { UUID } from "@/services/types";

export interface GeneralSettingsProps {
  params: { websiteId: UUID };
}

export default async function GeneralSettings({ 
  params: { websiteId }
}: GeneralSettingsProps) {
  
  const generalSettings = await getGeneralSettings(websiteId);
  
    return (
    <>
      <PageHeading>
        <Title>Paramètres généraux</Title>
        <Subtitle>
          Cras elementum mi a libero sagittis sollicitudin. Quisque eleifend 
          dapibus justo, sed euismod ipsum hendrerit non. Donec mollis semper 
          elit.
        </Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <GeneralSettingsForm settings={generalSettings} websiteId={websiteId} />
      </div>
    </> 
  )
}
