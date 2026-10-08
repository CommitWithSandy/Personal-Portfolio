'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { PROJECTS, Project } from '@/data/portfolio';

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { label: 'All Projects', id: 'all' },
    { label: 'Java & Spring Boot ', id: 'fullstack' },
    { label: 'Web Application', id: 'webapps' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

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
              onClick={() => setActiveCategory(cat.id)}
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
          {filteredProjects.map((project, idx) => (
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
      </div>
    </section>
  );
}

export default Projects;

