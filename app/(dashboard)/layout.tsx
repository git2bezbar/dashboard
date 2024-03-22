import Sidebar from "@/src/components/Sidebar";
import '../globals.css'
import AccountMenu from '@/src/components/AccountMenu';
import { Toaster } from "@/components/ui/toaster";
import '@fork2e/umbrella/dist/lib.min.css';
import AuthChecker from "./AuthChecker";
import { cookies } from "next/headers";
import { checkAuthentication } from "@/services/api/auth";
import { Metadata } from "next";
import { getAccountInfo } from "@/services/api/account";

export const metadata: Metadata = {
  title: 'Forkee | Dashboard',
  description: 'Dashboard Forkee.',
}

export interface RootLayoutProps { children: React.ReactNode }

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookiesList = cookies().getAll();
  const isLogged = await checkAuthentication(cookiesList);
  const userInfo = await getAccountInfo(cookiesList);

  const deleteCookies = async () => {
    "use server";
    cookies().getAll().forEach(cookie => {
      cookies().delete(cookie.name);
    });
  }

  return (
    <html lang="fr">
      <body className="grid grid-cols-dashboard font-raleway relative">
        <AuthChecker isLogged={isLogged} userInfo={userInfo}>
          <Sidebar />
          <main className="flex flex-col">
            <div className="flex items-center justify-end px-8 py-6 border-b border-b-black/10">
              <AccountMenu deleteCookies={deleteCookies} />
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
