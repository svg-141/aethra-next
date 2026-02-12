import React, { ReactNode } from 'react';
import AdminLayout from './AdminLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
