import { Metadata } from 'next'
import '../globals.css'
import { cookies } from 'next/headers';
import { checkAuthentication } from '@/services/api/auth';
import AuthChecker from '@/src/components/AuthChecker';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Forkee | Créons votre site web',
  description: 'Dashboard Forkee.',
}

export default async function WebsiteGenerationLayout({ children }: { children: React.ReactNode }) {
  
  const cookiesList = cookies().getAll();
  
  const isLogged = await checkAuthentication(cookiesList);
  
  return (
    <html>
      <body 
        className="flex flex-col justify-center items-center font-raleway 
          min-h-screen p-16 gap-16"
      >
      <AuthChecker isLogged={isLogged} cookiesList={cookiesList}>
        <Image
          src="/logo.svg"
          alt="Forkee logo"
          width={100}
          height={50}
        />
        <div className=" flex flex-col gap-8">{children}</div>
      </AuthChecker>
      </body>
    </html>
  )
}
