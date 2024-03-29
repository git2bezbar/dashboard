'use client';

import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import { Button, Input, Label } from "@fork2e/umbrella";

export default function Account() {
  return (
    <>
      <PageHeading>
        <Title>Mon compte</Title>
        <Subtitle>Cras elementum mi a libero sagittis sollicitudin. Quisque eleifend dapibus justo, sed euismod ipsum hendrerit non. Donec mollis semper elit.</Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <form className="col-span-5 flex flex-col gap-4">
          <div className="flex flex-col justify-start items-start gap-4">
            <Label className="font-bold" htmlFor="lastname">Nom</Label>
            <Input id="lastname" />
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <Label className="font-bold" htmlFor="firstname">Prénom</Label>
            <Input id="firstname" />
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <Label className="font-bold" htmlFor="profilePicture">Photo du compte</Label>
            <Input id="profilePicture" type="file" />
          </div>
          <Button className="self-start">Sauvegarder les changements</Button>
        </form>
        <div className="col-span-3" />
        <div className="col-span-4 flex flex-col gap-4 p-8 bg-primary text-white rounded-2xl">
          <h2 className="text-2xl font-bold">Besoin de changer d’autres informations ?</h2>
          <p>Pour des raisons de sécurité, certaines informations ne sont pas modifiables sur cette page. N’hésitez pas à contacter l’équipe de support si vous souhaitez changer votre adresse mail ou votre mot de passe.</p>
          <p>Ces modifications sont limitées et seront facturées une fois un seuil dépassé.</p>
        </div>
      </div>
    </> 
  )
}
