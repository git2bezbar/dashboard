import { Metadata } from "next";

import GenerateForm from "./GenerateForm";

export const metadata: Metadata = {
  title: "Forkee | Créons votre site web",
};

export default function Generate () {
  return <GenerateForm />;
}
