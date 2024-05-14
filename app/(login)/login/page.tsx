import { cookies } from 'next/headers';
import LoginForm from './LoginForm';
import { checkAuthentication } from '@/services/api/auth';
import { getWebsite } from '@/services/api/website';

export default async function Login() {
  
  const cookiesList = cookies().getAll();
  
  const isLogged = await checkAuthentication(cookiesList);
  
  let websiteId;
  
  if (isLogged) { websiteId = (await getWebsite(cookiesList)).uuid }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Accéder à votre compte</h1>
      <LoginForm isLogged={isLogged} websiteId={websiteId} />
    </div>
  )
}
