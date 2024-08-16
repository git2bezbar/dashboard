import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import GeneralSettingsForm from "./GeneralSettingsForm";
import { getGeneralSettings } from "@/services/api/general-settings";
import { UUID } from "@/services/types";
import { cookies } from "next/headers";

export interface GeneralSettingsProps {
  params: { websiteId: UUID };
}

export default async function GeneralSettings({ 
  params: { websiteId }
}: GeneralSettingsProps) {

  const cookiesList = cookies().getAll();
  
  const generalSettings = await getGeneralSettings(websiteId, cookiesList);
  
    return (
    <>
      <PageHeading>
        <Title>Paramètres généraux</Title>
        <Subtitle>
          Sur cette page vous pourrez renseigner des informations générales relatives à votre site établissement.
        </Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <GeneralSettingsForm
          settings={generalSettings}
          websiteId={websiteId}
          cookiesList={cookiesList}
        />
      </div>
    </> 
  )
}
