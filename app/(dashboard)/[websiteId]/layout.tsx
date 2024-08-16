import Sidebar from "@/src/components/Sidebar";
import AccountMenu from '@/src/components/AccountMenu';
import { Toaster } from "@/src/ui/toaster";
import '@fork2e/umbrella/dist/lib.min.css';

import { cookies } from "next/headers";
import { checkAuthentication } from "@/services/api/auth";
import { Metadata } from "next";
import { getAccountInfo } from "@/services/api/account";
import AuthChecker from "@/src/components/AuthChecker";
import { UUID } from "@/services/types";

export const metadata: Metadata = {
  title: 'Forkee | Dashboard',
  description: 'Dashboard Forkee.',
}

export interface RootLayoutProps { 
  children: React.ReactNode
  params: { websiteId: UUID }
}

export default async function RootLayout({
  children,
  params: { websiteId }
}: RootLayoutProps) {

  const cookiesList = cookies().getAll();

  const isLogged = await checkAuthentication(cookiesList);

  const userInfo = isLogged ? await getAccountInfo(cookiesList) : undefined;

  const deleteCookies = async () => {
    "use server";
    cookies().getAll().forEach(cookie => {
      cookies().delete(cookie.name);
    });
  }

  return (
    <html lang="fr">
      <body className="grid grid-cols-dashboard font-raleway">
        <AuthChecker
          isLogged={isLogged}
          userInfo={userInfo}
          cookiesList={cookiesList}
        >
          <Sidebar websiteId={websiteId} />
          <main className="flex flex-col">
            <div
              className="flex items-center justify-end px-8 py-6 border-b 
              border-b-black/10"
            >
              <AccountMenu
                deleteCookies={deleteCookies}
                websiteId={websiteId}
              />
            </div>
            <div className="px-8 pt-12 pb-24 flex flex-col gap-8">
              {children}
            </div>
          </main>
          <Toaster />
        </AuthChecker>
      </body>
    </html>
  )
}
