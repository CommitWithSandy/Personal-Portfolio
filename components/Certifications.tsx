'use client';

import React from 'react';
import { Award, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';

export function Certifications() {
  const certifications = [
    {
      title: 'Elite Tech Internship — API Integration (Task 1)',
      issuer: 'Elite Tech Intern Program',
      date: '2026',
      badge: 'Internship Project',
      description: 'Engineered PulseSphere — Real-Time Weather & Atmosphere Intelligence Hub utilizing Vanilla ES6+, CSS3 Glassmorphism, and Open-Meteo REST APIs.',
    },
    {
      title: 'Deloitte Australia Data Analytics Job Simulation',
      issuer: 'Forage / Deloitte',
      date: '2026',
      badge: 'Corporate Simulation',
      description: 'Forensic technology analysis, Tableau analytics dashboard creation, and executive Excel data classification modeling.',
    },
    {
      title: 'Game-O-Thon (GOH) 2026',
      issuer: 'Technical Hackathon',
      date: '2026',
      badge: 'Hackathon Participant',
      description: 'Participated in full-day game architecture & web engineering hackathon competition.',
    },
    {
      title: 'Generative AI Professional Certification',
      issuer: 'Simplilearn',
      date: '2026',
      badge: 'AI & Prompt Engineering',
      description: 'Comprehensive coursework on LLM integration, prompt engineering techniques, and generative workflows.',
    },
    {
      title: 'CSS3 & Modern JavaScript Certification',
      issuer: 'Certified Udemy',
      date: '2025',
      badge: 'Web Fundamentals',
      description: 'Advanced responsive design, ES6+ asynchronous JavaScript, DOM manipulation, and modern web APIs.',
    },
    {
      title: 'AWS Cloud Practitioner Essentials',
      issuer: 'AWS Training & Certification',
      date: '2026',
      badge: 'Cloud Computing',
      description: 'This certification validates foundational, high-level understanding of cloud computing concepts, AWS services, security, architecture, pricing, and support.',
    },
    {
      title: 'Introduction to Software Testing',
      issuer: 'Simplilearn',
      date: '2026',
      badge: 'Software Testing',
      description: 'Learn core testing principles and lifecycle phases for quality assurance and validation.',
    }
  ];

  return (
    <section id="certifications" className="py-24 bg-secondary/30 relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-code text-xs font-semibold uppercase tracking-wider">
            RECOGNITION & CERTIFICATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Certifications & <span className="gradient-text font-display">Achievements</span>
          </h2>
          <p className="text-muted text-sm sm:text-base">
            Verified technical certifications, hackathon participation, and industry simulation credentials.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-code font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {cert.badge}
                  </span>
                  <span className="text-xs text-muted font-code">{cert.date}</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-foreground group-hover:text-indigo-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-semibold text-muted mt-0.5">{cert.issuer}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted leading-relaxed pl-11">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/50 flex items-center justify-between pl-11">
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Credential</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;

