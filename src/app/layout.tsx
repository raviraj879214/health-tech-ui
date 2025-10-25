'use client';
import './globals.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  
  if (isAdmin) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }


  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );




}
