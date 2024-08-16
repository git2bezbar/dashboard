import { getContactSettings } from "@/services/api/contact-settings";
import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import ContactSettingsForm from "./ContactSettingsForm";
import { UUID } from "@/services/types";
import { cookies } from "next/headers";

export interface ContactSettingsProps {
  params: { websiteId: UUID };
}

export default async function ContactSettings({ 
  params: { websiteId }
}: ContactSettingsProps) {

  const cookiesList = cookies().getAll();
  
  const contactSettings = await getContactSettings(websiteId, cookiesList);

  return (
    <>
      <PageHeading>
        <Title>Paramètres de contact</Title>
        <Subtitle>
          Sur cette page vous pourrez renseigner vos coordonnées.
        </Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <ContactSettingsForm
          settings={contactSettings}
          websiteId={websiteId}
          cookiesList={cookiesList}
        />
      </div>
    </> 
  )
}
