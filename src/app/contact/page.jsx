'use client';

import NavBar from '../../../components/NavBar';
import TechScrollbar from '../../../components/TechScrollbar';
import ContactHero from '../../../components/ContactHero';
import ContactForm from '../../../components/ContactForm';
import OfficeLocation from '../../../components/OfficeLocation';

export default function ContactPage() {
  return (
    <>
      <TechScrollbar />
      <NavBar />
      
      <main className="min-h-screen bg-black text-white md:ml-20 lg:ml-24 transition-all duration-300">
        <ContactHero />
        <ContactForm />
        <OfficeLocation />
      </main>
    </>
  );
}
