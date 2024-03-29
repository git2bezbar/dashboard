import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import GeneralSettingsForm from "./GeneralSettingsForm";
import { getGeneralSettings } from "@/services/api/general-settings";

export default async function GeneralSettings() {
  const generalSettings = await getGeneralSettings('1bcc2d88-43e2-47f9-a009-d7a2418604df');
  return (
    <>
      <PageHeading>
        <Title>Paramètres généraux</Title>
        <Subtitle>Cras elementum mi a libero sagittis sollicitudin. Quisque eleifend dapibus justo, sed euismod ipsum hendrerit non. Donec mollis semper elit.</Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <GeneralSettingsForm settings={generalSettings}/>
      </div>
    </> 
  )
}
