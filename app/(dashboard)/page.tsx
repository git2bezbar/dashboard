import { getPages } from "@/services/api/page";
import PageHeading from "@/src/components/PageHeading";
import Subtitle from "@/src/components/Subtitle";
import Title from "@/src/components/Title";
import { Button } from "@fork2e/umbrella";
import Link from "next/link";
import PageList from "./pages/PageList";
import { getCustomizationSettings } from "@/services/api/customization";

export default async function Home() {

  const pages = await getPages('1bcc2d88-43e2-47f9-a009-d7a2418604df');
  const customizationSettings = await getCustomizationSettings('1bcc2d88-43e2-47f9-a009-d7a2418604df');

  return (
    <>
      <PageHeading>
        <Title>Rendons votre site web incroyable ! ✨</Title>
        <Subtitle>Cras elementum mi a libero sagittis sollicitudin. Quisque eleifend dapibus justo, sed euismod ipsum hendrerit non. Donec mollis semper elit.</Subtitle>
      </PageHeading>
      <div className="grid grid-cols-12 items-start">
        <div className="flex flex-col items-start gap-16 col-span-5">
          <div className="flex flex-col gap-8 w-full">
            <Title tag="h2">Votre charte graphique actuelle 🎨</Title>
            <div className="p-8 border border-black/10 rounded-[20px] flex flex-col items-center gap-8">
              <h3 className="font-bold text-center">Titre de prévisualisation de niveau 1</h3>
              <div className="grid grid-cols-2 gap-8 items-center">
                <img
                  src="https://via.placeholder.com/256"
                  className="rounded-ui"
                  alt="Example image"
                />
                <div className="flex flex-col gap-4 items-start">
                  <h4 className="font-bold text-sm">Titre de niveau 2</h4>
                  <p className="text-sm">Ceci est un texte d&apos;exemple. Il est utilisé pour que vous puissiez avoir un rendu qui soit réaliste, <a href="#" className="font-bold" style={{color: customizationSettings.primaryColor}}>comme avec ce lien</a>, sans avoir à utiliser du texte en latin. La suite de ce paragraphe est également un exemple. Voici donc à quoi devrait ressembler votre site avec les paramètres que vous avez choisis.</p>
                  <div
                    className="px-8 py-4 border border-black/10 rounded-ui text-sm text-white font-bold"
                    style={{backgroundColor: customizationSettings.primaryColor}}
                  >
                    Bouton 1
                  </div>
                </div>
              </div>
            </div>
            <Link href={"/customization"}>
              <Button>Aller dans Personnalisation</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-8 w-full">
            <Title tag="h2">Les pages de votre site</Title>
            <PageList pages={pages} />      
            <Link href={"/pages"}>
              <Button>Aller dans Pages</Button>
            </Link>
          </div>
        </div>
      </div>
    </> 
  )
}
