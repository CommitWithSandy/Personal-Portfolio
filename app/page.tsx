import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import Certifications from '@/components/Certifications';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden">
      {/* Sticky Blurred Header */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Me Section */}
        <About />

        {/* Tech Skills Section */}
        <Skills />

        {/* Projects Showcase Section */}
        <Projects />

        {/* Education & Experience Timeline Section */}
        <Timeline />

        {/* Certifications & Achievements Section */}
        <Certifications />

        {/* Working Contact Form Section */}
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
