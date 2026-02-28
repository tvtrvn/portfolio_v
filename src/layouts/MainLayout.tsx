import React from 'react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container-page flex-1 py-8 sm:py-10 lg:py-12">{children}</main>
      <Footer />
    </div>
  );
};

