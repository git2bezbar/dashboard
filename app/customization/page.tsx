import React, { FormEvent } from "react";
import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";

import { getCustomizationSettings, updateCustomizationSettings } from "@/services/api/customization";
import CustomizationSettingsForm from "./CustomizationSettingsForm";

export default async function Customization() {
  const customizationSettings = await getCustomizationSettings('1bcc2d88-43e2-47f9-a009-d7a2418604df');
  return (
    <>
      <PageHeading>
        <Title>Personnalisation</Title>
        <Subtitle>Cras elementum mi a libero sagittis sollicitudin. Quisque eleifend dapibus justo, sed euismod ipsum hendrerit non. Donec mollis semper elit.</Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <CustomizationSettingsForm
          settings={customizationSettings}
        />
      </div>
    </> 
  )
}
