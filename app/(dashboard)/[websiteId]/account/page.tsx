import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import AccountForm from "./AccountForm";
import { cookies } from "next/headers";
import { getAccountInfo } from "@/services/api/account";

export default async function Account() {
    
  const cookiesList = cookies().getAll();
  
  const customizationSettings = 
    await getAccountInfo(cookiesList);

  return (
    <>
      <PageHeading>
        <Title>Mon compte</Title>
        <Subtitle>
          Sur cette page vous pourrez renseigner les informations relatives à votre compte personnel.
        </Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <AccountForm
          settings={customizationSettings}
          cookiesList={cookiesList}
        />
      </div>
    </> 
  )
}
