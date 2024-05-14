import { getContactSettings } from "@/services/api/contact-settings";
import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import ContactSettingsForm from "./ContactSettingsForm";
import { UUID } from "@/services/types";

export interface ContactSettingsProps {
  params: { websiteId: UUID };
}

export default async function ContactSettings({ 
  params: { websiteId }
}: ContactSettingsProps) {
  
  const contactSettings = await getContactSettings(websiteId);

  return (
    <>
      <PageHeading>
        <Title>Paramètres de contact</Title>
        <Subtitle>
          Cras elementum mi a libero sagittis sollicitudin. Quisque eleifend 
          dapibus justo, sed euismod ipsum hendrerit non. Donec mollis semper 
          elit.
        </Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <ContactSettingsForm settings={contactSettings} websiteId={websiteId} />
      </div>
    </> 
  )
}
