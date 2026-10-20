'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolio';

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = PERSONAL_INFO.roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* Ambient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-code text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>I&apos;M A DEVELOPER</span>
          </div>

          {/* Heading with Typewriter */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1]">
            Hi, I&apos;m <span className="text-indigo-400 font-display">Sandesh</span>
            <br />
            <span className="text-foreground">I build </span>
            <span className="gradient-text font-display">{displayText}</span>
            <span className="animate-pulse text-indigo-500">|</span>
          </h1>

          {/* Short Bio Tagline */}
          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>

          {/* Quick Location & Availability */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{PERSONAL_INFO.availability}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.socialLinks.resumePdf}
              download="Sandesh_Hiremath_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-foreground bg-secondary hover:bg-secondary/80 border border-border transition-all hover:-translate-y-0.5"
            >
              <span>Download CV</span>
              <Download className="w-4 h-4" />
            </a>
            {/* Social Links Icons */}
            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <a
                href={PERSONAL_INFO.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-indigo-500 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-indigo-500 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.email}
                className="p-3 rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-indigo-500 transition-colors"
                aria-label="Email Me"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          
          <div className="pt-6 border-t border-border/50 w-full space-y-2">
            <span className="font-code text-xs font-semibold text-muted tracking-wider uppercase">
              TECHNOLOGIES I WORK WITH
            </span>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {['Java', 'Spring Boot', 'React.js', 'Node.js','JavaScript', 'MySQL', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-semibold rounded-md bg-secondary border border-border text-foreground hover:border-indigo-500/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column Visual (Circle Backdrop + Developer Portrait + Floating Code Card) */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-indigo-600/30 border border-indigo-500/30 shadow-2xl flex items-center justify-center">
            {/* Developer Avatar */}
            <div className="w-full h-full rounded-full overflow-hidden p-2">
              <Image
                src="/avatar.jpg"
                alt={PERSONAL_INFO.name}
                width={400}
                height={400}
                priority
                className="w-full h-full object-cover rounded-full"
              />
            </div>


            {/* Floating Code Card Overlay */}
            <div className="absolute -top-4 -right-4 sm:-right-8 bg-card/95 backdrop-blur-md border border-indigo-500/40 rounded-xl p-4 shadow-2xl max-w-[240px] text-left hidden sm:block">
              <div className="flex items-center justify-between border-b border-border pb-2 mb-2 font-code text-[11px] text-muted">
                <span className="text-indigo-400 font-bold">&lt;/&gt; Code</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <pre className="font-code text-[11px] leading-relaxed text-muted">
                <span className="text-purple-400">const</span> <span className="text-indigo-400">developer</span> = &#123;
                <br />
                &nbsp;&nbsp;<span className="text-sky-400">name</span>: <span className="text-amber-300">&quot;Sandesh&quot;</span>,
                <br />
                &nbsp;&nbsp;<span className="text-sky-400">skills</span>: [<span className="text-amber-300">&quot;Java&quot;</span>, <span className="text-amber-300">&quot;MERN&quot;</span>],
                <br />
                &nbsp;&nbsp;<span className="text-sky-400">passion</span>: <span className="text-amber-300">&quot;Full Stack&quot;</span>
                <br />
                &#125;;
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

