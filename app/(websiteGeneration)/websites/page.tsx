import { getWebsite, getWebsites } from "@/services/api/website";
import Title from "@/src/components/Title";
import { Button } from "@fork2e/umbrella";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Websites() {
  const cookiesList = cookies().getAll();
  const listOfWebsites = await getWebsites(cookiesList);
  
  return (
    <div className="flex flex-col items-center gap-16">
      <Title>Mes sites web</Title>
      <ul className="flex flex-col gap-4">
        {listOfWebsites.map((website) => (
          <li
            key={website.uuid}
            className="rounded-ui border border-black/10 px-8 py-4 hover:cursor-pointer hover:bg-black/5 duration-200"
          >
            <Link href={`/${website.uuid}`}>
              {website.websiteTitle}
            </Link>
          </li>
        ))}

        { !listOfWebsites.length && (
          <div className="flex flex-col items-center gap-4">
            <p>Vous n&apos;avez encore de site web.</p>
            <Link href="/generate">
              <Button>Créer mon site</Button>
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
}
