import { getContactSettings } from "@/services/api/contact-settings";
import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import ContactSettingsForm from "./ContactSettingsForm";

export default async function ContactSettings() {
  
  const contactSettings = await getContactSettings('1bcc2d88-43e2-47f9-a009-d7a2418604df');

  return (
    <>
      <PageHeading>
        <Title>Paramètres de contact</Title>
        <Subtitle>Cras elementum mi a libero sagittis sollicitudin. Quisque eleifend dapibus justo, sed euismod ipsum hendrerit non. Donec mollis semper elit.</Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <ContactSettingsForm settings={contactSettings} />
      </div>
    </> 
  )
}
