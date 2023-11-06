import { ClientProviders } from 'apps/fe/modules/providers/ClientProviders';
import './global.css';
import { Navbar } from '@fe/components/Navbar';

export const metadata = {
  title: 'Welcome to fe',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-auto">
        <Navbar />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
