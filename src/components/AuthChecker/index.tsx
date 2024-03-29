'use client';

import { User } from '@/services/types';
import useStore from '@/store/userInfoStore';
import { useRouter } from 'next/navigation';

export interface AuthCheckerProps { 
  children: React.ReactNode
  isLogged: boolean
  userInfo?: User
  cookiesList: any
}
export interface AuthCheckerState {
  userInfo: User;
  setUserInfo: (userInfo: User) => void
}

export default function AuthChecker({ children, isLogged, userInfo, cookiesList }: AuthCheckerProps) {
  const router = useRouter();  
  if (!isLogged) router.push('/login');

  const setUserInfo = useStore(state => state.setUserInfo);
  setUserInfo(userInfo);

  
  return <>{ children }</>
}
