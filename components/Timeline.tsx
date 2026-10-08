'use client';

import React from 'react';
import { GraduationCap, Award, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { TIMELINE_DATA } from '@/data/portfolio';

export function Timeline() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return GraduationCap;
      case 'achievement':
        return Award;
      case 'certification':
        return Sparkles;
      default:
        return GraduationCap;
    }
  };

  return (
    <section id="timeline" className="py-24 relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-center">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-code text-xs font-semibold uppercase tracking-wider">
            EDUCATION & JOURNEY
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Academic History & <span className="gradient-text font-display">Milestones</span>
          </h2>
          <p className="text-muted text-sm sm:text-base">
            Timeline of my formal computer application degree, corporate job simulation achievements, and professional certifications.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative max-w-4xl mx-auto text-left">
          {/* Vertical Center Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-0.5 bg-border -translate-x-1/2 hidden sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {TIMELINE_DATA.map((item, idx) => {
              const Icon = getIcon(item.type);
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Node Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-indigo-600 border-4 border-background text-white flex items-center justify-center z-10 shadow-md">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                    <div className="p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/40 transition-all shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-code text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {item.year}
                        </span>
                        <span className="text-xs text-muted flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-display font-bold text-foreground">{item.title}</h3>
                      <h4 className="text-xs font-semibold text-indigo-400">{item.organization}</h4>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">{item.description}</p>

                      {item.highlights && (
                        <ul className="space-y-1.5 pt-2 border-t border-border/50">
                          {item.highlights.map((h, hIdx) => (
                            <li key={hIdx} className="flex items-center gap-2 text-xs text-muted">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;

