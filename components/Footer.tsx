'use me';
'use client';

import React from 'react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import { ArrowUp, Github, Linkedin, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Tagline */}
        <div className="text-center md:text-left space-y-2">
          <Link href="#hero" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            {portfolioData.personalInfo.name}
          </Link>
          <p className="text-sm text-slate-400 max-w-sm">
            {portfolioData.personalInfo.title} — Building high-performance, accessible, and scalable web applications.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={portfolioData.personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-blue-400 hover:bg-slate-800 transition-all border border-slate-700/50"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-blue-400 hover:bg-slate-800 transition-all border border-slate-700/50"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${portfolioData.personalInfo.email}`}
            aria-label="Send Email"
            className="p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-blue-400 hover:bg-slate-800 transition-all border border-slate-700/50"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={`tel:${portfolioData.personalInfo.phone}`}
            aria-label="Call Phone"
            className="p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-blue-400 hover:bg-slate-800 transition-all border border-slate-700/50"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        {/* Back to Top */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 transition-all group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed & Built By <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> Sandesh 
        </p>
      </div>
    </footer>
  );
}
