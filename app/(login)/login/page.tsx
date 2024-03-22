import { cookies } from 'next/headers';
import LoginForm from './LoginForm';
import { checkAuthentication } from '@/services/api/auth';

export default async function Login() {
  const cookiesList = cookies().getAll();
  const isLogged = await checkAuthentication(cookiesList);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Accéder à votre compte</h1>
      <LoginForm isLogged={isLogged} />
    </div>
  )
}
