import type { Metadata } from 'next'
import Sidebar from "@/src/components/Sidebar";
import './globals.css'
import AccountMenu from '@/src/components/AccountMenu';
import '@fork2e/umbrella/dist/lib.min.css'

export const metadata: Metadata = {
  title: 'Forkee | Dashboard',
  description: 'Dashboard Forkee.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="grid grid-cols-dashboard font-raleway relative">
        <Sidebar />
        <main className="flex flex-col">
          <div className="flex items-center justify-end px-8 py-6 border-b border-b-black/10">
            <AccountMenu />
          </div>
          <div className="px-8 pt-12 pb-24 flex flex-col gap-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
