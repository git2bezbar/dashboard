'use client';

import { User } from '@/services/types';
import useStore from '@/store/userInfoStore';
import { useRouter } from 'next/navigation';

export interface AuthCheckerProps { 
  children: React.ReactNode
  isLogged: boolean
  userInfo: User
}
export interface AuthCheckerState {
  userInfo: User;
  setUserInfo: (userInfo: User) => void
}

export default function AuthChecker({ children, isLogged, userInfo }: AuthCheckerProps) {
  const router = useRouter();  
  const setUserInfo = useStore((state) => state.setUserInfo);
  
  setUserInfo(userInfo);

  if (!isLogged) router.push('/login');
  
  return <>{ children }</>
}
