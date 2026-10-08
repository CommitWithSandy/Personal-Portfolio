'use client';

import React from 'react';
import { Code2, Smile, GraduationCap, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolio';

export function About() {
  const statCards = [
    {
      icon: Code2,
      value: PERSONAL_INFO.stats.projectsCompleted,
      label: 'Projects Completed',
      description: 'Full-Stack & Java',
    },
    {
      icon: Smile,
      value: PERSONAL_INFO.stats.clientSatisfaction,
      label: 'Dedication & Quality',
      description: 'Clean Architecture & Code',
    },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30 relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-code text-xs font-semibold uppercase tracking-wider">
              ABOUT ME
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              I&apos;m passionate about creating <span className="gradient-text font-display">digital solutions</span>
            </h2>

            <p className="text-base text-muted leading-relaxed">
               I specialize in full-stack web development. I help businesses and teams build clean, efficient, and user-friendly web applications leveraging MERN stack, Java Spring Boot, and RESTful APIs.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-1">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Education</h4>
                  <p className="text-xs text-muted">{PERSONAL_INFO.education}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Location</h4>
                  <p className="text-xs text-muted">{PERSONAL_INFO.location}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-foreground bg-secondary hover:bg-secondary/80 border border-border transition-all hover:-translate-y-0.5"
              >
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Column: Stat Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-card border border-border hover:border-indigo-500/40 transition-all shadow-sm"
                >
                  <div className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-500 w-fit mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-foreground">{card.value}</h3>
                  <h4 className="text-xs font-semibold text-foreground mt-1">{card.label}</h4>
                  <p className="text-xs text-muted mt-0.5">{card.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
