'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github, ExternalLink, ChevronDown, ChevronUp, AlertCircle, X } from 'lucide-react';
import { PROJECTS, Project } from '@/data/portfolio';

export function Projects() {
  const INITIAL_PROJECTS_COUNT = 3;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleNoLiveDemo = (projectName: string) => {
    setToastMessage(`No live demo available yet for "${projectName}". Please inspect the GitHub repository or case study for source code!`);
  };

  const categories = [
    { label: 'All Projects', id: 'all' },
    { label: 'Java & Spring Boot ', id: 'fullstack' },
    { label: 'Web Application', id: 'webapps' },
  ];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setShowAll(false);
  };

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const hasMoreProjects = filteredProjects.length > INITIAL_PROJECTS_COUNT;
  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECTS_COUNT);

  return (
    <section id="projects" className="py-24 bg-secondary/30 relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-code text-xs font-semibold uppercase tracking-wider">
            FEATURED PROJECTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Some of My Recent <span className="gradient-text font-display">Work</span>
          </h2>
          <p className="text-muted text-sm sm:text-base">
            Explore architectural case studies, full-stack implementations, and forensic data dashboards. Click any project card to inspect the full case study.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-secondary text-muted hover:text-foreground hover:bg-secondary/80 border border-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {visibleProjects.map((project, idx) => (
            <div
              key={project.slug}
              className="group rounded-2xl bg-card border border-border hover:border-indigo-500/50 transition-all overflow-hidden shadow-sm flex flex-col hover:-translate-y-1.5"
            >
              {/* Project Image & Number Badge */}
              <div className="relative h-52 w-full overflow-hidden bg-secondary">
                <span className="absolute top-3 left-3 z-10 font-code text-xs font-bold px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-md border border-border">
                  0{idx + 1}
                </span>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <h3 className="text-xl font-display font-bold text-foreground group-hover:text-indigo-400 transition-colors">
                  {project.name}
                </h3>

                <p className="text-xs sm:text-sm text-muted line-clamp-3 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 text-[11px] font-semibold rounded bg-secondary text-muted border border-border/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons & Case Study Link */}
                <div className="pt-4 mt-auto border-t border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-secondary border border-border text-muted hover:text-foreground hover:border-indigo-500 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-colors relative group/live"
                        title="Live Demo Available"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleNoLiveDemo(project.name)}
                        className="p-2 rounded-lg bg-secondary/60 border border-border/60 text-muted/50 hover:text-amber-400 hover:border-amber-500/40 transition-colors cursor-pointer"
                        title="No live demo yet (click for details)"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More / Show Less Projects Toggle Button */}
        {hasMoreProjects && (
          <div className="pt-10 flex flex-col items-center justify-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all group cursor-pointer"
            >
              <span>
                {showAll
                  ? 'Show Less Projects'
                  : `View More Projects (${filteredProjects.length - INITIAL_PROJECTS_COUNT} More)`}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Floating Popup Toast Message for No Live Demo */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-96 p-4 rounded-2xl bg-slate-900/95 border border-amber-500/40 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5 fade-in duration-300 text-left">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
                <span>No Live Demo Available</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {toastMessage}
              </p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;

