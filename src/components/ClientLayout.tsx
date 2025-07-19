"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { NotificationManager } from '../features/notifications';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  let active = '';
  if (pathname === '/') active = 'home';
  else if (pathname.startsWith('/chat')) active = 'chat';
  else if (pathname.startsWith('/games')) active = 'games';
  else if (pathname.startsWith('/comunity')) active = 'comunity';
  else if (pathname.startsWith('/profile')) active = 'profile';
  
  return (
    <>
      <Navbar active={active} />
      <main className="pt-24">{children}</main>
      <NotificationManager />
    </>
  );
} 