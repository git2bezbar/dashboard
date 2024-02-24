import { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Forkee | Connexion',
  description: 'Dashboard Forkee.',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="grid grid-cols-dashboard font-raleway relative">
      <aside className="sticky top-0 bg-black text-white p-12 h-screen flex flex-col justify-between items-end">
        <img src="/logo-icon-white.svg"/>
        <img src="/logo-icon-white.svg"/>
      </aside>
        <main className="flex flex-col justify-center p-16 gap-16">
          <img src="/logo.svg" width={100}/>
          <div className=" flex flex-col gap-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
