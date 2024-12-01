import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import CookieConsent from '../CookieConsent';

interface BaseLayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
}

export default function BaseLayout({ children, hideNavbar = false }: BaseLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdf6f0]">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}