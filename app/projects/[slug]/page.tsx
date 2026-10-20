import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';
import { ArrowLeft, Github, CheckCircle2, Lightbulb, ShieldAlert, Cpu, ExternalLink, Image as ImageIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return portfolioData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = portfolioData.projects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Case Study | ${portfolioData.personalInfo.name}`,
    description: project.pitch,
    openGraph: {
      title: project.title,
      description: project.pitch,
      images: [{ url: project.image }],
    },
  };
}

export default function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const project = portfolioData.projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const otherProjects = portfolioData.projects.filter((p) => p.slug !== params.slug);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Projects</span>
        </Link>

        {/* Hero Section of Case Study */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {project.category}
            </span>
            <span className="text-xs text-slate-400">• Dynamic Case Study</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
            {project.pitch}
          </p>

          {/* Action Links & Tech Stack */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-b border-slate-800/80 py-6">
            <div className="flex flex-wrap items-center gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Code</span>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 transition-all shadow-md shadow-blue-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Preview</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Image Banner */}
        <div className="my-10 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
          <div className="aspect-[16/9] relative w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* Detailed Sections Grid */}
        <div className="space-y-12 mt-12">
          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <div className="flex items-center gap-3 text-rose-400 font-bold text-lg">
                <ShieldAlert className="w-5 h-5" />
                <h3>The Problem</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.problemSolved}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg">
                <Lightbulb className="w-5 h-5" />
                <h3>The Solution & Architecture</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
            <div className="flex items-center gap-3 text-blue-400 font-bold text-xl">
              <Cpu className="w-6 h-6" />
              <h2>Key Features & Engineering Highlights</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* UI & Feature Showcase */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3 text-cyan-400 font-bold text-xl">
                <ImageIcon className="w-6 h-6" />
                <h2>UI & Feature Showcase</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.screenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    className="group rounded-xl overflow-hidden border border-slate-800 bg-slate-950/70 hover:border-cyan-500/50 transition-all flex flex-col"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <Image
                        src={shot.image}
                        alt={shot.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 space-y-1 bg-slate-900/80 border-t border-slate-800">
                      <h4 className="font-semibold text-slate-200 text-sm group-hover:text-cyan-400 transition-colors">
                        {shot.title}
                      </h4>
                      {shot.caption && (
                        <p className="text-xs text-slate-400 italic leading-relaxed">
                          {shot.caption}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges & What I Learned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <h3 className="text-lg font-bold text-slate-100">Technical Challenges</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.challenges}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <h3 className="text-lg font-bold text-slate-100">What I Learned & Key Takeaways</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.whatILearned}
              </p>
            </div>
          </div>

          {/* Other Projects Section */}
          <div className="pt-12 border-t border-slate-800">
            <h3 className="text-xl font-bold text-slate-100 mb-6">Explore Other Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherProjects.map((other) => (
                <Link
                  key={other.slug}
                  href={`/projects/${other.slug}`}
                  className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group"
                >
                  <span className="text-xs font-semibold text-blue-400 block mb-1">{other.category}</span>
                  <h4 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-1">
                    {other.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2">{other.pitch}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
