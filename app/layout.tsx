import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Forkee | Créons votre site web',
  description: 'Dashboard Forkee.',
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {  
  return children;
}
