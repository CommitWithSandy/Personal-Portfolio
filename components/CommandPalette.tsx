'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, FolderGit2, User, Code, Briefcase, Award, Mail, ExternalLink, FileText } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const actions = [
    { id: 'about', name: 'Go to About Me', icon: User, category: 'Navigation', href: '#about' },
    { id: 'skills', name: 'View Skills', icon: Code, category: 'Navigation', href: '#skills' },
    { id: 'projects', name: 'View Projects', icon: FolderGit2, category: 'Navigation', href: '#projects' },
    { id: 'experience', name: 'Experience & Education', icon: Briefcase, category: 'Navigation', href: '#experience' },
    { id: 'certifications', name: 'Certifications', icon: Award, category: 'Navigation', href: '#certifications' },
    { id: 'contact', name: 'Contact Me', icon: Mail, category: 'Navigation', href: '#contact' },
    { id: 'resume', name: 'Download Resume', icon: FileText, category: 'Actions', action: () => window.open(portfolioData.personalInfo.resumeUrl, '_blank') },
    ...portfolioData.projects.map((p) => ({
      id: p.slug,
      name: `Project: ${p.title}`,
      icon: FolderGit2,
      category: 'Projects',
      href: `/projects/${p.slug}`,
    })),
  ];

  const filteredActions = actions.filter((action) =>
    action.name.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (action: (typeof actions)[0]) => {
    setIsOpen(false);
    setQuery('');
    if (action.action) {
      action.action();
    } else if (action.href) {
      if (action.href.startsWith('#')) {
        const elem = document.querySelector(action.href);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else {
          router.push(`/${action.href}`);
        }
      } else {
        router.push(action.href);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 text-slate-100">
        {/* Search Header */}
        <div className="flex items-center px-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search section..."
            className="w-full py-4 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-sm"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filteredActions.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              No matching commands or projects found.
            </div>
          ) : (
            filteredActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleSelect(action)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-left group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200 group-hover:text-white">
                        {action.name}
                      </div>
                      <div className="text-xs text-slate-500">{action.category}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-300" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with mouse or click item</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
