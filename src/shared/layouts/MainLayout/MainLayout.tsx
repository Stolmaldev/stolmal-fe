import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import GallerySection from '../../components/GallerySection';
import ProcessSection from '../../components/ProcessSection';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import Footer from '../../components/Footer';
import './MainLayout.css';

/**
 * Every route renders the same Header + GallerySection + ProcessSection +
 * ContactSection + Footer shell, only `Outlet` content differs. Because of
 * that, changing routes alone does not move the viewport. Scroll to the
 * section that matches the current route whenever the pathname changes
 * (nav/footer links, back/forward, direct URL).
 */
const SECTION_ID_BY_PATH: Record<string, string> = {
  '/gallery': 'gallery',
  '/process': 'process',
  '/contact': 'contact',
};

const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionId = SECTION_ID_BY_PATH[pathname];
    if (sectionId) {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <div className="layout">
      <Navbar />
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <GallerySection />
      <ProcessSection />
      <ContactSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default MainLayout;
