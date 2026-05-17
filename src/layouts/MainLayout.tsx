import React from 'react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { NoiseOverlay } from '../components/visual/NoiseOverlay';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-surface text-fg">
      <NoiseOverlay />
      <Navbar />
      <main id="main-content" className="flex-1 pt-24 sm:pt-28">
        {children}
      </main>
      <Footer />
    </div>
  );
};
