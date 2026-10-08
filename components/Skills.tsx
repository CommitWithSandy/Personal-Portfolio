'use client';

import React, { useState } from 'react';
import {
  FileCode,
  Palette,
  Code,
  Atom,
  Layers,
  FileJson,
  Server,
  Cpu,
  Coffee,
  Zap,
  Globe,
  Terminal,
  Database,
  Table,
  HardDrive,
  BarChart,
  FileSpreadsheet,
  GitBranch,
  Send,
  Box,
  Laptop,
  Figma,
  LucideIcon
} from 'lucide-react';
import { SKILLS_DATA } from '@/data/portfolio';

const ICON_MAP: Record<string, LucideIcon> = {
  FileCode,
  Palette,
  Code,
  Atom,
  Layers,
  FileJson,
  Server,
  Cpu,
  Coffee,
  Zap,
  Globe,
  Terminal,
  Database,
  Table,
  HardDrive,
  BarChart,
  FileSpreadsheet,
  GitBranch,
  Send,
  Box,
  Laptop,
  Figma
};

export function Skills() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = ['all', ...SKILLS_DATA.map((cat) => cat.category)];

  const filteredData =
    activeTab === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((cat) => cat.category === activeTab);

  return (
    <section id="skills" className="py-24 relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-code text-xs font-semibold uppercase tracking-wider">
            MY SKILLS
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Technologies I <span className="gradient-text font-display">Master</span>
          </h2>
          <p className="text-muted text-sm sm:text-base">
            Categorized technical stack and engineering competencies across full-stack development, database design, and workflow tools.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-secondary text-muted hover:text-foreground hover:bg-secondary/80 border border-border'
              }`}
            >
              {cat === 'all' ? 'All Skills' : cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 text-left">
          {filteredData.map((group, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/40 transition-all space-y-6 shadow-sm"
            >
              <h3 className="text-lg font-display font-bold text-foreground border-b border-border pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>{group.category}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {group.skills.map((skill, sIdx) => {
                  const Icon = ICON_MAP[skill.icon] || Code;
                  return (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-secondary/50 border border-border hover:border-indigo-500/40 transition-all flex flex-col items-center justify-center gap-2 text-center group"
                    >
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-foreground">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;

